import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import ts from "typescript";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tsupPath = join(root, "tsup.config.ts");
const outPath = join(root, "cli", "props.json");
const srcDir = join(root, "src");

const domAllowlist = new Set([
  "children",
  "className",
  "id",
  "style",
  "title",
  "onClick",
]);

const typeFormatFlags =
  ts.TypeFormatFlags.NoTruncation |
  ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType;

/**
 * Extract string literal entries from a TypeScript array initializer body.
 *
 * This is intentionally tiny and matches the established registry generator
 * approach: `tsup.config.ts` owns simple `as const` string arrays, so a full AST
 * parse would add ceremony without improving correctness for this file shape.
 *
 * @param {string} block Text between `[` and `]` for one tsup list.
 * @returns {string[]} String literal values in source order.
 */
function extractQuotedNames(block) {
  const names = [];
  const re = /["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    names.push(m[1]);
  }
  return names;
}

/**
 * Read one canonical entry list from `packages/components/tsup.config.ts`.
 *
 * The props manifest must follow the same component universe as the package
 * build, so this function reads `uiComponentNames` and
 * `uiAnimatedComponentNames` from the build config instead of maintaining a
 * second hand-written list.
 *
 * @param {string} name Variable name to parse from `tsup.config.ts`.
 * @returns {string[]} Sorted component or entry names from the requested list.
 * @throws {Error} When the expected `const <name> = [...] as const` block is missing.
 */
function readTsupList(name) {
  const text = readFileSync(tsupPath, "utf8");
  const match = text.match(
    new RegExp(`const ${name} = \\[([\\s\\S]*?)\\] as const`),
  );
  if (!match) {
    throw new Error(`Could not parse ${name} from tsup.config.ts`);
  }
  return extractQuotedNames(match[1]).sort();
}

/**
 * Load package TypeScript compiler options and source file names.
 *
 * The generator uses the compiler type checker to resolve aliases,
 * intersections, `VariantProps<typeof ...>`, and inherited React props. It
 * reuses the package `tsconfig.json` so path resolution and JSX settings match
 * normal package development, while forcing `noEmit` because this script only
 * inspects types.
 *
 * @returns {{ options: ts.CompilerOptions, fileNames: string[] }} Compiler
 * options and source files for `ts.createProgram`.
 * @throws {Error} When `tsconfig.json` cannot be found or parsed.
 */
function readCompilerOptions() {
  const configPath = ts.findConfigFile(
    root,
    ts.sys.fileExists,
    "tsconfig.json",
  );
  if (!configPath) {
    throw new Error("Could not find packages/components/tsconfig.json");
  }

  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) {
    throw new Error(
      ts.flattenDiagnosticMessageText(config.error.messageText, "\n"),
    );
  }

  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    dirname(configPath),
  );

  return {
    options: {
      ...parsed.options,
      noEmit: true,
      skipLibCheck: true,
    },
    fileNames: parsed.fileNames,
  };
}

/**
 * Convert a cva variant export name into the corresponding component stem.
 *
 * Examples:
 * - `accordionVariants` -> `Accordion`
 * - `accordionContentVariants` -> `AccordionContent`
 *
 * The stem is later compared with exported `*Props` type names so variant
 * options/defaults can be attached to the right subcomponent.
 *
 * @param {string} value Variant export identifier.
 * @returns {string} PascalCase subcomponent stem.
 */
function pascalCaseIdentifier(value) {
  return value
    .replace(/Variants$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Prefix internal manifest keys with the source entry kind.
 *
 * Static and animated entries can export similarly named prop types. The prefix
 * keeps generated `subcomponents[].name` values deterministic and distinct
 * while `displayName` remains clean for docs UI.
 *
 * @param {"static" | "animated"} sourceKind Entry type being processed.
 * @returns {string} Stable manifest prefix.
 */
function sourceKindPrefix(sourceKind) {
  return sourceKind === "animated" ? "animated:" : "static:";
}

/**
 * Check whether a resolved file path is inside an expected directory.
 *
 * Used to decide whether a prop declaration came from package source or from an
 * external dependency such as `@types/react`. That distinction drives DOM prop
 * filtering.
 *
 * @param {string} parent Absolute parent directory.
 * @param {string} child Absolute child path to test.
 * @returns {boolean} True when `child` is within `parent`.
 */
function isInside(parent, child) {
  const rel = relative(parent, child);
  return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

/**
 * Detect whether a TypeScript declaration is explicitly exported.
 *
 * Only exported `*Props` types are part of the public API docs. Internal helper
 * types in `types.ts` should not appear in the manifest unless they are
 * intentionally exported and pass later filters.
 *
 * @param {ts.Node} node TypeScript declaration node.
 * @returns {boolean} True when the declaration has an `export` modifier.
 */
function isExported(node) {
  return Boolean(
    node.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    ),
  );
}

/**
 * Normalize property names from object literal members.
 *
 * The variant parser only needs simple identifier/string/numeric keys from cva
 * config objects. Computed property names are ignored because the design-system
 * variant maps should be statically discoverable.
 *
 * @param {ts.PropertyName} name Object property name node.
 * @returns {string | undefined} Readable property name when supported.
 */
function getPropertyName(name) {
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isNumericLiteral(name)
  ) {
    return name.text;
  }
  return undefined;
}

/**
 * Read a string literal initializer from an AST node.
 *
 * @param {ts.Node} node Candidate initializer node.
 * @returns {string | undefined} Literal text for string-like nodes.
 */
function readStringValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  return undefined;
}

/**
 * Convert a simple object literal into a string map.
 *
 * This is used for `defaultVariants` where values are expected to be string
 * literals such as `{ appearance: "default", size: "md" }`. Non-string values
 * are skipped deliberately so the manifest only records defaults it can display
 * safely.
 *
 * @param {ts.Node | undefined} node Candidate object literal node.
 * @returns {Record<string, string>} Property name to string literal value map.
 */
function readObjectLiteral(node) {
  if (!node || !ts.isObjectLiteralExpression(node)) {
    return {};
  }

  const values = {};
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = getPropertyName(prop.name);
    const value = readStringValue(prop.initializer);
    if (name && value) {
      values[name] = value;
    }
  }
  return values;
}

/**
 * Find a named property assignment in an object literal.
 *
 * @param {ts.ObjectLiteralExpression} objectLiteral Object literal to inspect.
 * @param {string} propertyName Property name to find.
 * @returns {ts.PropertyAssignment | undefined} Matching property assignment.
 */
function findObjectProperty(objectLiteral, propertyName) {
  return objectLiteral.properties.find(
    (prop) =>
      ts.isPropertyAssignment(prop) &&
      getPropertyName(prop.name) === propertyName,
  );
}

/**
 * Resolve option keys from a cva variant map expression.
 *
 * cva configs often point at imported design-system constants such as
 * `zuiAccordionAppearances` rather than inline object literals. When the map is
 * inline, this reads object keys directly. Otherwise it asks the type checker
 * for the expression's properties so imported `as const` objects still produce
 * concrete option lists.
 *
 * @param {ts.TypeChecker} checker Active compiler type checker.
 * @param {ts.Expression} expression Variant map expression.
 * @returns {string[]} Sorted variant option keys.
 */
function getObjectKeysFromExpression(checker, expression) {
  if (ts.isObjectLiteralExpression(expression)) {
    return expression.properties
      .map((prop) =>
        ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop)
          ? getPropertyName(prop.name)
          : undefined,
      )
      .filter(Boolean)
      .sort();
  }

  const type = checker.getTypeAtLocation(expression);
  return type
    .getProperties()
    .map((symbol) => symbol.getName())
    .filter((name) => name !== "__index")
    .sort();
}

/**
 * Extract cva variant groups, option keys, and default variants for a component.
 *
 * The prop type checker can tell us a prop named `appearance` exists, but the
 * cva config is the best source for display-friendly option lists and defaults.
 * This function walks `src/ui/<component>/variants.ts`, finds exported
 * `*Variants` variables, and records the `variants` and `defaultVariants`
 * config blocks for later merging into prop rows.
 *
 * @param {ts.Program} program TypeScript program containing package sources.
 * @param {ts.TypeChecker} checker Active compiler type checker.
 * @param {string} componentName UI component slug.
 * @returns {Array<{ name: string, subcomponentName: string, variants: Record<string, string[]>, defaults: Record<string, string> }>} Variant metadata.
 */
function readVariantDefinitions(program, checker, componentName) {
  const variantsPath = join(srcDir, "ui", componentName, "variants.ts");
  const source = program.getSourceFile(variantsPath);
  if (!source) return [];

  const definitions = [];

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text.endsWith("Variants") &&
      node.initializer &&
      ts.isCallExpression(node.initializer)
    ) {
      const config = node.initializer.arguments[1];
      if (!config || !ts.isObjectLiteralExpression(config)) {
        return;
      }

      const variantsProp = findObjectProperty(config, "variants");
      const defaultsProp = findObjectProperty(config, "defaultVariants");
      const variants = {};

      if (
        variantsProp &&
        ts.isObjectLiteralExpression(variantsProp.initializer)
      ) {
        for (const prop of variantsProp.initializer.properties) {
          if (!ts.isPropertyAssignment(prop)) continue;
          const group = getPropertyName(prop.name);
          if (!group) continue;
          variants[group] = getObjectKeysFromExpression(
            checker,
            prop.initializer,
          );
        }
      }

      definitions.push({
        name: node.name.text,
        subcomponentName: pascalCaseIdentifier(node.name.text),
        variants,
        defaults: readObjectLiteral(defaultsProp?.initializer),
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(source);
  return definitions.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Read human-authored JSDoc metadata from a resolved prop symbol.
 *
 * The compiler API resolves documentation through aliases and intersections, so
 * using symbol documentation here keeps descriptions attached to props even
 * when they come through `AccordionBaseProps`, `VariantProps`, or other helper
 * types.
 *
 * @param {ts.TypeChecker} checker Active compiler type checker.
 * @param {ts.Symbol} symbol Prop symbol from the resolved props type.
 * @returns {{ description: string, tags: ts.JSDocTagInfo[] }} Plain
 * description text and parsed JSDoc tags.
 */
function getPropDocs(checker, symbol) {
  return {
    description: ts.displayPartsToString(
      symbol.getDocumentationComment(checker),
    ),
    tags: symbol.getJsDocTags(checker),
  };
}

/**
 * Extract a display default from JSDoc tags.
 *
 * Destructured runtime defaults are difficult to recover reliably from React
 * implementation files. For non-variant props, the docs convention is to use
 * `@default` or `@defaultValue` in `types.ts`; variant defaults are handled
 * separately from cva `defaultVariants`.
 *
 * @param {ts.JSDocTagInfo[]} tags JSDoc tags returned by the compiler.
 * @returns {string | undefined} Default value text from documentation tags.
 */
function getDefaultFromTags(tags) {
  const tag = tags.find(
    (item) => item.name === "default" || item.name === "defaultValue",
  );
  if (!tag?.text) return undefined;
  return (
    tag.text
      .map((part) => part.text)
      .join("")
      .trim() || undefined
  );
}

/**
 * Detect whether a prop is marked deprecated in JSDoc.
 *
 * @param {ts.JSDocTagInfo[]} tags JSDoc tags returned by the compiler.
 * @returns {boolean} True when a `@deprecated` tag is present.
 */
function hasDeprecatedTag(tags) {
  return tags.some((tag) => tag.name === "deprecated");
}

/**
 * Assign a non-variant prop to a docs table group.
 *
 * These groups are intentionally heuristic: they are presentation buckets for
 * the generated table, not a formal type-system classification. Locally
 * declared controlled-state names are promoted above generic behavior props,
 * common content/DOM props get their own groups, and external inherited props
 * are hidden behind the "Inherited HTML props" disclosure in the docs UI.
 *
 * @param {string} name Prop name.
 * @param {boolean} isDom Whether every declaration came from outside package source.
 * @returns {"controlled" | "content" | "dom" | "behavior"} Display group.
 */
function classifyProp(name, isDom) {
  if (isDom) return "dom";
  if (
    name === "value" ||
    name === "values" ||
    name === "defaultValue" ||
    name === "defaultValues" ||
    name === "checked" ||
    name === "defaultChecked" ||
    name === "open" ||
    name === "defaultOpen" ||
    name.startsWith("onValue") ||
    name.startsWith("onOpen") ||
    name.startsWith("onChecked")
  ) {
    return "controlled";
  }
  if (name === "children") return "content";
  if (name === "className" || name === "style" || name === "id") return "dom";
  return "behavior";
}

/**
 * Determine whether a prop is optional in the public API table.
 *
 * Optionality can appear either as a question token on the declaration or as
 * `undefined` in the resolved type string after intersections/unions are
 * expanded. Checking both keeps aliases and inherited props represented
 * accurately enough for documentation.
 *
 * @param {ts.Symbol} symbol Prop symbol.
 * @param {string} typeString Resolved prop type string.
 * @returns {boolean} True when the prop should be displayed as optional.
 */
function isOptionalProperty(symbol, typeString) {
  const declarations = symbol.getDeclarations() ?? [];
  return (
    declarations.some((declaration) => Boolean(declaration.questionToken)) ||
    /\bundefined\b/.test(typeString)
  );
}

/**
 * Describe whether prop declarations are local to this package or inherited.
 *
 * A prop may have one or more declarations. If any declaration lives under
 * `src/`, we treat it as part of Zentauri's authored API and keep it. Props
 * declared only in external files, typically React DOM attribute types, are
 * considered inherited DOM props and are filtered or collapsed.
 *
 * @param {ts.Declaration[]} declarations Declaration nodes for a prop symbol.
 * @returns {{ local: boolean, external: boolean }} Declaration source flags.
 */
function getDeclarationScope(declarations) {
  const files = declarations.map((declaration) =>
    resolve(declaration.getSourceFile().fileName),
  );
  const local = files.some((file) => isInside(srcDir, file));
  const external = !local;
  return { local, external };
}

/**
 * Decide whether an individual prop should be written to the manifest.
 *
 * The main goal is to avoid dumping the entire React DOM attribute surface into
 * every component table. Locally declared props are kept, noisy `aria-*` and
 * `data-*` index-style props are skipped, undocumented `ref` props are hidden,
 * and inherited DOM props are reduced to a small allowlist that users commonly
 * override.
 *
 * @param {string} name Prop name.
 * @param {ts.Declaration[]} declarations Declaration nodes for the prop.
 * @param {string} description Resolved JSDoc description, if any.
 * @returns {boolean} True when the prop should be included in `props.json`.
 */
function shouldIncludeProp(name, declarations, description) {
  if (name === "ref" && !description) return false;
  if (name.startsWith("aria-") || name.startsWith("data-")) return false;

  const scope = getDeclarationScope(declarations);
  if (scope.local) return true;

  return domAllowlist.has(name);
}

/**
 * Decide whether an exported `*Props` type represents a public component API.
 *
 * Some exported types are implementation helpers (`BaseProps`,
 * `SectionProps`, motion preset helper props) rather than components users
 * import directly. Filtering those here keeps one table per actual subcomponent
 * while still allowing real compound exports such as `AccordionItemProps`.
 *
 * @param {string} name Exported type or interface name.
 * @returns {boolean} True when this props type should become a subcomponent table.
 */
function shouldIncludePropsType(name) {
  return !(
    name.endsWith("BaseProps") ||
    name.endsWith("SectionProps") ||
    name.endsWith("PresetMotionProps") ||
    name.endsWith("DomDragProps")
  );
}

/**
 * Normalize verbose compiler type strings for display.
 *
 * The TypeScript checker sometimes prefixes resolved aliases with
 * `import("...").`. That is technically precise but noisy for docs users, so
 * this strips those module qualifiers and collapses whitespace.
 *
 * @param {string} typeString Raw `checker.typeToString(...)` output.
 * @returns {string} Display-friendly type text.
 */
function cleanType(typeString) {
  return typeString
    .replace(/import\("[^"]+"\)\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Match a props type to the closest cva variant definition.
 *
 * Root props usually map exactly (`AccordionProps` ->
 * `accordionVariants`). Compound components use stems such as
 * `AccordionContentProps` -> `accordionContentVariants`. The prefix fallback
 * handles cases where the cva export stem is slightly longer than the prop
 * type stem.
 *
 * @param {string} propsType Exported props type name.
 * @param {Array<{ subcomponentName: string }>} variantDefinitions Parsed variant definitions.
 * @returns {{ variants: Record<string, string[]>, defaults: Record<string, string> } | undefined} Matching variant metadata.
 */
function findVariantDefinition(propsType, variantDefinitions) {
  const stem = propsType.replace(/Props$/, "");
  const exact = variantDefinitions.find(
    (definition) => definition.subcomponentName === stem,
  );
  if (exact) return exact;

  const lowerStem = stem.toLowerCase();
  return variantDefinitions.find((definition) =>
    definition.subcomponentName.toLowerCase().startsWith(lowerStem),
  );
}

/**
 * Build a stable sort key for prop rows.
 *
 * Sorting by group first makes generated diffs readable and keeps the docs
 * table predictable: variants first, then state, behavior, content, and
 * inherited DOM props.
 *
 * @param {{ group: string, name: string }} prop Manifest prop row.
 * @returns {string} Stable sort key.
 */
function propSortValue(prop) {
  const groups = ["variant", "controlled", "behavior", "content", "dom"];
  return `${groups.indexOf(prop.group)}:${prop.name}`;
}

/**
 * Convert one exported props type/interface declaration into manifest rows.
 *
 * This is the core docgen pass. It asks the compiler for the fully resolved
 * type of the props declaration, iterates the resulting property symbols,
 * filters inherited noise, formats type strings, merges JSDoc metadata, and
 * upgrades cva-backed props into variant rows with options/defaults.
 *
 * @param {ts.TypeAliasDeclaration | ts.InterfaceDeclaration} node Exported `*Props` declaration.
 * @param {ts.TypeChecker} checker Active compiler type checker.
 * @param {{ variants: Record<string, string[]>, defaults: Record<string, string> } | undefined} variantDefinition Matching cva metadata.
 * @param {string} componentName UI component slug.
 * @returns {Array<Record<string, unknown>>} Sorted prop manifest rows.
 */
function readPropsForNode(node, checker, variantDefinition, componentName) {
  const type = checker.getTypeAtLocation(node.name);
  const props = [];

  for (const symbol of type.getProperties()) {
    const name = symbol.getName();
    const declarations = symbol.getDeclarations() ?? [];
    const { description, tags } = getPropDocs(checker, symbol);

    if (!shouldIncludeProp(name, declarations, description)) {
      continue;
    }

    const valueDeclaration = declarations[0] ?? node;
    const propType = checker.getTypeOfSymbolAtLocation(
      symbol,
      valueDeclaration,
    );
    const typeString = cleanType(
      checker.typeToString(propType, valueDeclaration, typeFormatFlags),
    );
    const scope = getDeclarationScope(declarations);
    const variantOptions = variantDefinition?.variants[name];
    const jsDocDefault = getDefaultFromTags(tags);

    props.push({
      name,
      type: variantOptions ? "enum" : typeString,
      required: !isOptionalProperty(symbol, typeString),
      ...(variantOptions
        ? {
            default: variantDefinition.defaults[name],
            group: "variant",
            isVariant: true,
            options: variantOptions,
            tokenRef: `--zui-${componentName}-${name}-*`,
            variantGroup: name,
          }
        : {
            ...(jsDocDefault ? { default: jsDocDefault } : {}),
            group: classifyProp(name, scope.external),
          }),
      ...(description ? { description } : {}),
      deprecated: hasDeprecatedTag(tags),
    });
  }

  return props.sort((a, b) => propSortValue(a).localeCompare(propSortValue(b)));
}

/**
 * Read all public props declarations for one static or animated component entry.
 *
 * Static entries inspect `src/ui/<name>/types.ts` and merge cva metadata from
 * `variants.ts`. Animated entries inspect `src/ui/<name>/animated/types.ts`;
 * they intentionally do not merge static cva definitions because animated prop
 * types usually extend static props and add motion-specific behavior.
 *
 * @param {{ program: ts.Program, checker: ts.TypeChecker, componentName: string, sourceKind: "static" | "animated" }} params Extraction inputs.
 * @returns {Array<{ name: string, displayName: string, propsType: string, source: string, props: Array<Record<string, unknown>> }>} Subcomponent manifest entries.
 */
function readPropsFile({ program, checker, componentName, sourceKind }) {
  const typeFile = join(
    srcDir,
    "ui",
    componentName,
    sourceKind === "animated" ? "animated/types.ts" : "types.ts",
  );

  if (!existsSync(typeFile)) {
    return [];
  }

  const source = program.getSourceFile(typeFile);
  if (!source) {
    return [];
  }

  const variantDefinitions =
    sourceKind === "static"
      ? readVariantDefinitions(program, checker, componentName)
      : [];

  const subcomponents = [];

  for (const statement of source.statements) {
    const isPropsDeclaration =
      (ts.isTypeAliasDeclaration(statement) ||
        ts.isInterfaceDeclaration(statement)) &&
      isExported(statement) &&
      statement.name.text.endsWith("Props") &&
      shouldIncludePropsType(statement.name.text);

    if (!isPropsDeclaration) {
      continue;
    }

    const propsType = statement.name.text;
    const props = readPropsForNode(
      statement,
      checker,
      findVariantDefinition(propsType, variantDefinitions),
      componentName,
    );

    if (props.length === 0) {
      continue;
    }

    const name = propsType.replace(/Props$/, "");
    subcomponents.push({
      name: `${sourceKindPrefix(sourceKind)}${name}`,
      displayName: name,
      propsType,
      source: sourceKind,
      props,
    });
  }

  return subcomponents.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Build the complete props documentation manifest in memory.
 *
 * This is exported so `check-props.mjs` can regenerate the expected manifest
 * without writing to disk. The component universe is the union of static UI
 * entries and animated UI entries from `tsup.config.ts`, which includes
 * animated-only components such as `spinner`.
 *
 * @returns {{
 *   $schema: string,
 *   version: number,
 *   generatedFrom: string,
 *   components: Record<string, { slug: string, subcomponents: Array<Record<string, unknown>> }>
 * }} Fully generated props manifest.
 */
export function buildPropsManifest() {
  const uiComponentNames = readTsupList("uiComponentNames");
  const uiAnimatedComponentNames = new Set(
    readTsupList("uiAnimatedComponentNames"),
  );
  const componentNames = [
    ...new Set([...uiComponentNames, ...uiAnimatedComponentNames]),
  ].sort();
  const { options, fileNames } = readCompilerOptions();
  const program = ts.createProgram(fileNames, options);
  const checker = program.getTypeChecker();
  const components = {};

  for (const componentName of componentNames) {
    const subcomponents = [
      ...readPropsFile({
        program,
        checker,
        componentName,
        sourceKind: "static",
      }),
      ...(uiAnimatedComponentNames.has(componentName)
        ? readPropsFile({
            program,
            checker,
            componentName,
            sourceKind: "animated",
          })
        : []),
    ];

    if (subcomponents.length === 0) {
      continue;
    }

    components[componentName] = {
      slug: componentName,
      subcomponents,
    };
  }

  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    version: 1,
    generatedFrom:
      "packages/components/tsup.config.ts uiComponentNames + uiAnimatedComponentNames",
    components,
  };
}

/**
 * Serialize the manifest with deterministic formatting.
 *
 * Keeping the exact `JSON.stringify(..., null, 2) + "\n"` format in one helper
 * means the writer and freshness checker compare identical bytes.
 *
 * @param {Record<string, unknown>} manifest Manifest returned by `buildPropsManifest`.
 * @returns {string} Pretty JSON with a trailing newline.
 */
export function serializePropsManifest(manifest) {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

/**
 * CLI entrypoint for `pnpm --filter @zentauri-ui/zentauri-components generate:props`.
 *
 * Generates `packages/components/cli/props.json`, which is checked into the
 * repository and consumed by the docs app through the package export
 * `@zentauri-ui/zentauri-components/props.json`.
 *
 * @returns {void}
 */
function main() {
  const manifest = buildPropsManifest();
  writeFileSync(outPath, serializePropsManifest(manifest), "utf8");
  console.log(
    `Wrote ${outPath} (${Object.keys(manifest.components).length} components)`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
