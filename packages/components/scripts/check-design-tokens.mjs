import { readdirSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

/**
 * Design token contract checker for the publishable component package.
 *
 * This script protects the public `--zui-*` CSS custom property contract by
 * auditing the source files that define and consume component styles. It is a
 * pure CI/prepack guardrail: no generated token catalog is written, which keeps
 * the repository free of a very large Markdown artifact while still enforcing
 * the contract from source.
 */
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const designSystemDir = join(root, "src", "design-system");
const uiDir = join(root, "src", "ui");

/**
 * Tailwind color families that should not appear directly in `variants.ts`.
 *
 * Variant files are supposed to compose design-system constants. If a raw
 * `bg-blue-500`, `text-red-600`, or similar utility appears there, the color
 * is bypassing the token layer and becomes hard to theme consistently.
 */
const colorNames = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "black",
  "white",
];

/**
 * Matches Tailwind color utilities that would hard-code visual color choices.
 *
 * The pattern intentionally accepts common variant prefixes such as `hover:`,
 * `dark:`, arbitrary selector variants, important markers, opacity suffixes,
 * and `file:` input modifiers because all of those are valid places for raw
 * Tailwind colors to leak into a component variant.
 */
const rawTailwindColorPattern = new RegExp(
  `(?:^|\\s)(?:[\\w!.[\\]&()=-]+:)*(?:file:)?(?:bg|text|border|from|to|ring|fill|stroke|outline|decoration|accent|caret)-(${colorNames.join("|")})(?:-\\d{2,3})?(?:\\/\\d+)?!?`,
);

/**
 * Matches direct CSS colors or color functions in strings.
 *
 * Design-system constants may contain fallback values inside `var(...)`, but
 * variant files should not declare standalone hex, rgb, rgba, or oklch colors
 * because those values cannot be overridden through the `--zui-*` contract.
 */
const rawColorFunctionPattern =
  /(?:^|[^a-z-])(?:#[0-9a-fA-F]{3,8}\b|oklch\(|rgba?\()/;

/**
 * Return a stable package-relative path for error messages.
 *
 * @param {string} file Absolute file path inside `packages/components`.
 * @returns {string} Path relative to the component package root.
 */
function relativePath(file) {
  return relative(root, file);
}

/**
 * Check whether a resolved path remains inside an expected parent directory.
 *
 * This is stricter than testing the import string itself. A specifier like
 * `"./../ui/foo"` starts with `"./"` but resolves outside `src/design-system`,
 * so the contract must check the final normalized path.
 *
 * @param {string} parent Absolute directory that should contain the child.
 * @param {string} child Absolute path to validate.
 * @returns {boolean} True when the child path is inside the parent directory.
 */
function isInsideDirectory(parent, child) {
  const childPath = relative(parent, child);
  return (
    childPath === "" || (!childPath.startsWith("..") && !isAbsolute(childPath))
  );
}

/**
 * Resolve a design-system import and confirm it stays inside the token layer.
 *
 * Design-system modules may compose local token constants, but importing from
 * UI implementation files, package helpers, or external modules would weaken
 * the "pure string constants" boundary.
 *
 * @param {string} file File that owns the import declaration.
 * @param {string} specifier Raw module specifier from the import.
 * @returns {boolean} True when the import is relative and resolves internally.
 */
function isDesignSystemImport(file, specifier) {
  if (!specifier.startsWith(".")) {
    return false;
  }
  return isInsideDirectory(designSystemDir, resolve(dirname(file), specifier));
}

/**
 * Read direct TypeScript files from a design-system directory.
 *
 * Design tokens live as one file per component under `src/design-system`, so
 * this intentionally does not recurse. Keeping the scan shallow prevents an
 * unrelated helper folder from silently becoming part of the public contract.
 *
 * @param {string} dir Absolute directory path.
 * @returns {string[]} Sorted absolute paths for `.ts` files.
 */
function readTsFiles(dir) {
  return readdirSync(dir)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => join(dir, file))
    .sort();
}

/**
 * Recursively read package source files that can contain token usage.
 *
 * Design-system files define most of the public contract, but implementation
 * files can still consume local custom properties. Marquee is the important
 * example: the design-system layer defines `--zui-marquee-gap`, while the UI
 * implementation reads it from keyframes and Tailwind variable utilities. A
 * non-recursive design-system-only scan would incorrectly mark that token as
 * unused, so this helper gives unused-token audits visibility across the
 * package source tree without pulling in generated build output.
 *
 * @param {string} dir Absolute directory path to scan recursively.
 * @returns {string[]} Sorted absolute paths for source files.
 */
function readSourceFiles(dir) {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readSourceFiles(fullPath));
    } else if (/\.(mjs|ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

/**
 * Recursively discover every component `variants.ts` file.
 *
 * UI entries can contain nested folders, including optional animated entries,
 * so variants are discovered recursively from `src/ui`. Only files named
 * exactly `variants.ts` are audited because those are the style composition
 * layer where raw colors must not leak.
 *
 * @param {string} dir Absolute directory path.
 * @returns {string[]} Sorted absolute paths for `variants.ts` files.
 */
function readVariantFiles(dir) {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readVariantFiles(fullPath));
    } else if (entry.name === "variants.ts") {
      files.push(fullPath);
    }
  }
  return files.sort();
}

/**
 * Extract literal class text from a TypeScript expression.
 *
 * The checker does not need to evaluate JavaScript. It only needs the raw
 * string fragments that might contain `--zui-*`, `dark:`, Tailwind utilities,
 * or CSS color functions. When a design-system index is supplied, references
 * are followed back to their const declarations so appearance entries cannot
 * hide raw colors behind identifiers or object property access.
 *
 * @param {ts.Expression | undefined} node Initializer or nested expression.
 * @param {ReturnType<typeof createDesignSystemIndex> | undefined} index Parsed design-system index used to resolve references.
 * @param {string | undefined} file File that owns the expression.
 * @param {Set<string>} [seen] Reference keys already visited while resolving.
 * @returns {string} Concatenated literal text found inside the expression.
 */
function flattenExpressionText(node, index, file, seen = new Set()) {
  if (!node) return "";
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isTemplateExpression(node)) {
    return [
      node.head.text,
      ...node.templateSpans.map(
        (span) =>
          `${flattenExpressionText(span.expression, index, file, seen)}${span.literal.text}`,
      ),
    ].join("");
  }
  if (
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node)
  ) {
    return flattenExpressionText(node.expression, index, file, seen);
  }
  if (index && file && isPureReference(node)) {
    return flattenReferenceText(node, index, file, seen);
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements
      .map((element) => flattenExpressionText(element, index, file, seen))
      .join(" ");
  }
  if (ts.isObjectLiteralExpression(node)) {
    return node.properties
      .map((property) => {
        if (ts.isPropertyAssignment(property)) {
          return flattenExpressionText(property.initializer, index, file, seen);
        }
        return "";
      })
      .join(" ");
  }
  return "";
}

/**
 * Check whether a node is only a reference to token data defined elsewhere.
 *
 * References are allowed in design-system files so constants can be composed
 * from other constants without introducing logic. For example, spreading or
 * interpolating a local token object is still pure data from the contract's
 * point of view.
 *
 * @param {ts.Node} node Node to inspect.
 * @returns {boolean} True when the node is a plain identifier/property access.
 */
function isPureReference(node) {
  return (
    ts.isIdentifier(node) ||
    ts.isPropertyAccessExpression(node) ||
    ts.isElementAccessExpression(node)
  );
}

/**
 * Validate that an expression is token data rather than executable logic.
 *
 * Design-system files should be predictable source data: strings, arrays,
 * objects, spreads, and references. Calls, functions, conditionals, classes,
 * and other executable constructs are rejected because they make token docs
 * generation harder to reason about and can hide raw values from static scans.
 *
 * @param {ts.Expression | undefined} node Expression to classify.
 * @returns {boolean} True when the expression is allowed token data.
 */
function isPureTokenExpression(node) {
  if (!node) return true;
  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    isPureReference(node)
  ) {
    return true;
  }
  if (ts.isTemplateExpression(node)) {
    return node.templateSpans.every((span) => isPureReference(span.expression));
  }
  if (
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node)
  ) {
    return isPureTokenExpression(node.expression);
  }
  if (ts.isSpreadElement(node)) {
    return isPureReference(node.expression);
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.every((element) => isPureTokenExpression(element));
  }
  if (ts.isObjectLiteralExpression(node)) {
    return node.properties.every((property) => {
      if (ts.isSpreadAssignment(property)) {
        return isPureReference(property.expression);
      }
      if (ts.isPropertyAssignment(property)) {
        return isPureTokenExpression(property.initializer);
      }
      return false;
    });
  }
  return false;
}

/**
 * Remove TypeScript wrapper expressions that do not affect token data.
 *
 * Appearance values often use `as const`, `satisfies`, or parentheses for type
 * precision. The checker strips those wrappers before inspecting the real data
 * expression underneath.
 *
 * @param {ts.Expression | undefined} node Expression to unwrap.
 * @returns {ts.Expression | undefined} The underlying expression.
 */
function unwrapExpression(node) {
  let current = node;
  while (
    current &&
    (ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isParenthesizedExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

/**
 * Return a simple exported declaration name when the declaration is named.
 *
 * Design-system files are expected to export named constants. Destructured
 * declarations are ignored here because they are not part of the public token
 * constant style and are rejected by the purity audit separately.
 *
 * @param {ts.VariableDeclaration} declaration Variable declaration to inspect.
 * @returns {string | undefined} Identifier name when present.
 */
function variableDeclarationName(declaration) {
  return ts.isIdentifier(declaration.name) ? declaration.name.text : undefined;
}

/**
 * Resolve an import specifier to one of the scanned design-system files.
 *
 * Imports in this folder normally omit the `.ts` extension. The resolver checks
 * the exact path, the `.ts` form, and an `index.ts` form against the known file
 * set instead of touching the filesystem again.
 *
 * @param {Set<string>} fileSet Known design-system files.
 * @param {string} file File that owns the import.
 * @param {string} specifier Raw module specifier.
 * @returns {string | undefined} Matched design-system file, when available.
 */
function resolveImportedFile(fileSet, file, specifier) {
  const importedPath = resolve(dirname(file), specifier);
  const candidates = [
    importedPath,
    `${importedPath}.ts`,
    join(importedPath, "index.ts"),
  ];
  return candidates.find((candidate) => fileSet.has(candidate));
}

/**
 * Build a small static index for resolving design-system token references.
 *
 * The checker does not need full TypeScript type analysis. It only needs enough
 * structure to follow named imports, namespace imports, and const declarations
 * when an appearance entry is written as `base`, `tokens.primary`, or
 * `tokens["gradient-blue"]`.
 *
 * @param {string[]} files Design-system files included in the audit.
 * @returns {{ sourceByFile: Map<string, ts.SourceFile>, declarationsByFile: Map<string, Map<string, ts.Expression>>, importsByFile: Map<string, Map<string, { file: string, importedName: string }>>, namespaceImportsByFile: Map<string, Map<string, string>> }} Reference index for design-system constants.
 */
function createDesignSystemIndex(files) {
  const sourceByFile = new Map();
  const declarationsByFile = new Map();
  const importsByFile = new Map();
  const namespaceImportsByFile = new Map();
  const fileSet = new Set(files);

  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const declarations = new Map();
    const imports = new Map();
    const namespaceImports = new Map();

    for (const statement of source.statements) {
      if (ts.isImportDeclaration(statement)) {
        const specifier = statement.moduleSpecifier;
        const bindings = statement.importClause?.namedBindings;
        if (
          ts.isStringLiteral(specifier) &&
          isDesignSystemImport(file, specifier.text)
        ) {
          const importedFile = resolveImportedFile(
            fileSet,
            file,
            specifier.text,
          );
          if (importedFile && ts.isNamedImports(bindings)) {
            for (const element of bindings.elements) {
              imports.set(element.name.text, {
                file: importedFile,
                importedName: element.propertyName?.text ?? element.name.text,
              });
            }
          }
          if (importedFile && ts.isNamespaceImport(bindings)) {
            namespaceImports.set(bindings.name.text, importedFile);
          }
        }
      }

      if (!ts.isVariableStatement(statement)) {
        continue;
      }

      for (const declaration of statement.declarationList.declarations) {
        const name = variableDeclarationName(declaration);
        if (name && declaration.initializer) {
          declarations.set(name, declaration.initializer);
        }
      }
    }

    sourceByFile.set(file, source);
    declarationsByFile.set(file, declarations);
    importsByFile.set(file, imports);
    namespaceImportsByFile.set(file, namespaceImports);
  }

  return {
    sourceByFile,
    declarationsByFile,
    importsByFile,
    namespaceImportsByFile,
  };
}

/**
 * Resolve a referenced identifier to the const initializer it points at.
 *
 * Local declarations win first. If the identifier is imported, the named import
 * map points to the source file and original export name.
 *
 * @param {string} name Identifier name to resolve.
 * @param {ReturnType<typeof createDesignSystemIndex>} index Parsed design-system index.
 * @param {string} file File that owns the reference.
 * @returns {{ file: string, initializer: ts.Expression } | undefined} Resolved initializer and owning file.
 */
function resolveIdentifier(name, index, file) {
  const localInitializer = index.declarationsByFile.get(file)?.get(name);
  if (localInitializer) {
    return { file, initializer: localInitializer };
  }

  const imported = index.importsByFile.get(file)?.get(name);
  const importedInitializer = imported
    ? index.declarationsByFile.get(imported.file)?.get(imported.importedName)
    : undefined;
  if (imported && importedInitializer) {
    return { file: imported.file, initializer: importedInitializer };
  }

  return undefined;
}

/**
 * Read a property initializer from an object literal by identifier/string key.
 *
 * This powers reference resolution for values such as
 * `zuiDropdownItemVariants.ghost` and
 * `zuiDropdownItemVariants["gradient-blue"]`.
 *
 * @param {ts.Expression | undefined} objectExpression Expression expected to unwrap to an object literal.
 * @param {string} name Property name to find.
 * @param {ts.SourceFile} source Source file used to read computed property text.
 * @returns {ts.Expression | undefined} Property initializer when found.
 */
function objectPropertyInitializer(objectExpression, name, source) {
  if (!source) {
    return undefined;
  }

  const object = unwrapExpression(objectExpression);
  if (!object || !ts.isObjectLiteralExpression(object)) {
    return undefined;
  }

  for (const property of object.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }
    if (propertyName(property, source) === name) {
      return property.initializer;
    }
  }

  return undefined;
}

/**
 * Read the final property name from property or string element access.
 *
 * @param {ts.PropertyAccessExpression | ts.ElementAccessExpression} node Access expression to inspect.
 * @returns {string | undefined} Property name when the checker can resolve it statically.
 */
function accessPropertyName(node) {
  if (ts.isPropertyAccessExpression(node)) {
    return node.name.text;
  }
  if (
    ts.isStringLiteral(node.argumentExpression) ||
    ts.isNoSubstitutionTemplateLiteral(node.argumentExpression)
  ) {
    return node.argumentExpression.text;
  }
  return undefined;
}

/**
 * Resolve an identifier, chained property access, or namespace member access.
 *
 * This handles all pure reference shapes allowed by `isPureReference`, including
 * nested forms such as `tokens.button.primary` and namespace forms such as
 * `import * as tokens from "./button"; tokens.zuiButtonAppearances.primary`.
 *
 * @param {ts.Node} node Reference node to resolve.
 * @param {ReturnType<typeof createDesignSystemIndex>} index Parsed design-system index.
 * @param {string} file File that owns the reference.
 * @returns {{ file: string, initializer: ts.Expression } | undefined} Resolved initializer and owning file.
 */
function resolveReferenceNode(node, index, file) {
  if (ts.isIdentifier(node)) {
    return resolveIdentifier(node.text, index, file);
  }

  if (
    !ts.isPropertyAccessExpression(node) &&
    !ts.isElementAccessExpression(node)
  ) {
    return undefined;
  }

  const property = accessPropertyName(node);
  if (!property) {
    return undefined;
  }

  const base = node.expression;
  if (ts.isIdentifier(base)) {
    const namespaceFile = index.namespaceImportsByFile
      .get(file)
      ?.get(base.text);
    const namespaceInitializer = namespaceFile
      ? index.declarationsByFile.get(namespaceFile)?.get(property)
      : undefined;
    if (namespaceFile && namespaceInitializer) {
      return { file: namespaceFile, initializer: namespaceInitializer };
    }
  }

  const resolvedBase = resolveReferenceNode(base, index, file);
  if (!resolvedBase) {
    return undefined;
  }

  const source = index.sourceByFile.get(resolvedBase.file);
  const initializer = objectPropertyInitializer(
    resolvedBase.initializer,
    property,
    source,
  );
  if (!initializer) {
    return undefined;
  }

  return { file: resolvedBase.file, initializer };
}

/**
 * Follow a pure reference and return the literal text behind it.
 *
 * The `seen` set prevents cycles from recursing forever if two constants point
 * at each other. Cycles are not expected in design-system data, but defensive
 * resolution keeps this script predictable.
 *
 * @param {ts.Node} node Identifier, property access, or element access node.
 * @param {ReturnType<typeof createDesignSystemIndex>} index Parsed design-system index.
 * @param {string} file File that owns the reference.
 * @param {Set<string>} seen Reference keys already visited.
 * @returns {string} Literal text found behind the reference, or an empty string.
 */
function flattenReferenceText(node, index, file, seen) {
  const source = index.sourceByFile.get(file);
  const key = `${file}:${node.getText(source)}`;
  if (seen.has(key)) {
    return "";
  }

  const resolved = resolveReferenceNode(node, index, file);
  if (!resolved) {
    return "";
  }

  seen.add(key);
  return flattenExpressionText(
    resolved.initializer,
    index,
    resolved.file,
    seen,
  );
}

/**
 * Ensure design-system files stay pure token-definition modules.
 *
 * Allowed top-level statements are deliberately narrow:
 * - relative imports from the same design-system folder
 * - export declarations
 * - TypeScript-only type/interface declarations
 * - `const` declarations whose initializers are pure token expressions
 *
 * Anything else fails the check so the design-system layer remains easy to
 * scan, document, and treat as a public data contract.
 *
 * @param {string[]} files Design-system `.ts` files to audit.
 * @returns {string[]} Human-readable contract violations.
 */
function auditPureDesignSystemFiles(files) {
  const errors = [];

  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );

    for (const statement of source.statements) {
      if (ts.isImportDeclaration(statement)) {
        const specifier = statement.moduleSpecifier;
        if (
          !ts.isStringLiteral(specifier) ||
          !isDesignSystemImport(file, specifier.text)
        ) {
          errors.push(
            `${relativePath(file)} imports from outside the design-system folder`,
          );
        }
        continue;
      }

      if (ts.isExportDeclaration(statement)) {
        continue;
      }

      if (
        ts.isTypeAliasDeclaration(statement) ||
        ts.isInterfaceDeclaration(statement)
      ) {
        continue;
      }

      if (ts.isVariableStatement(statement)) {
        const isConst =
          (statement.declarationList.flags & ts.NodeFlags.Const) ===
          ts.NodeFlags.Const;
        if (!isConst) {
          errors.push(
            `${relativePath(file)} has a non-const token declaration`,
          );
        }
        for (const declaration of statement.declarationList.declarations) {
          if (!isPureTokenExpression(declaration.initializer)) {
            const name = declaration.name.getText(source);
            errors.push(
              `${relativePath(file)} export ${name} is not pure token data`,
            );
          }
        }
        continue;
      }

      errors.push(
        `${relativePath(file)} contains unsupported top-level code: ${statement
          .getText(source)
          .slice(0, 80)}`,
      );
    }
  }

  return errors;
}

/**
 * Find the comma that separates a custom-property name from its fallback.
 *
 * CSS variables can have fallbacks that contain commas, such as
 * `var(--zui-color, oklch(60% 0.2 250))` or gradients. A plain `indexOf(",")`
 * would split nested functions incorrectly, so this walks the value and only
 * returns commas found at the top parenthesis level.
 *
 * @param {string} value Contents inside a `var(...)` call.
 * @returns {number} Index of the separating comma, or `-1` when absent.
 */
function topLevelCommaIndex(value) {
  let depth = 0;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (char === "," && depth === 0) return index;
  }
  return -1;
}

/**
 * Extract balanced `var(...)` calls from raw source text.
 *
 * A regular expression alone is brittle here because fallback values can
 * contain nested parentheses. This scanner starts at each `var(` occurrence
 * and advances until the matching closing parenthesis is found.
 *
 * @param {string} text Source text to scan.
 * @returns {string[]} The inner contents of each complete `var(...)` call.
 */
function extractVarCalls(text) {
  const calls = [];
  let cursor = 0;

  while (cursor < text.length) {
    const start = text.indexOf("var(", cursor);
    if (start === -1) break;

    let depth = 0;
    let end = start;
    for (; end < text.length; end += 1) {
      const char = text[end];
      if (char === "(") depth += 1;
      if (char === ")") {
        depth -= 1;
        if (depth === 0) break;
      }
    }

    if (depth === 0) {
      calls.push(text.slice(start + 4, end));
      cursor = start + 4;
    } else {
      cursor = start + 4;
    }
  }

  return calls;
}

/**
 * Require every `--zui-*` CSS variable read to include a fallback value.
 *
 * A fallback keeps vendored components usable before a consumer defines custom
 * theme variables. This audit only cares about Zentauri variables and ignores
 * unrelated CSS custom properties that may be present in source comments or
 * non-public implementation details.
 *
 * @param {string[]} files Design-system `.ts` files to scan.
 * @returns {string[]} Human-readable contract violations.
 */
function auditFallbacks(files) {
  const errors = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const call of extractVarCalls(text)) {
      if (!call.trim().startsWith("--zui-")) continue;
      const comma = topLevelCommaIndex(call);
      if (comma === -1) {
        errors.push(
          `${relativePath(file)} uses var(${call}) without a fallback`,
        );
        continue;
      }
      const fallback = call.slice(comma + 1).trim();
      if (!fallback) {
        errors.push(
          `${relativePath(file)} uses var(${call}) with an empty fallback`,
        );
      }
    }
  }
  return errors;
}

/**
 * Collect custom properties that the library defines for its own internal use.
 *
 * This intentionally focuses on assignment forms, not every public token read.
 * A class such as `bg-[var(--zui-button-bg,#fff)]` is already a real use of a
 * public override point. The values this helper tracks are definitions such as
 * `[--zui-scroll-area-thumb:#94a3b8]` or style-object entries like
 * `{ "--zui-marquee-gap": "1rem" }`; those definitions should have a matching
 * read somewhere in the package.
 *
 * @param {string[]} files Files that may define local custom properties.
 * @returns {Map<string, Set<string>>} Token names mapped to defining files.
 */
function collectLocalTokenDefinitions(files) {
  const definitions = new Map();

  function addDefinition(name, file) {
    const existing = definitions.get(name) ?? new Set();
    existing.add(file);
    definitions.set(name, existing);
  }

  for (const file of files) {
    const text = readFileSync(file, "utf8");

    for (const match of text.matchAll(/\[(--zui-[a-z0-9-]+):/g)) {
      addDefinition(match[1], file);
    }

    for (const match of text.matchAll(/["'](--zui-[a-z0-9-]+)["']\s*:/g)) {
      addDefinition(match[1], file);
    }
  }

  return definitions;
}

/**
 * Collect custom-property names that are read by package source code.
 *
 * The scanner recognizes the read forms used in this codebase:
 * - CSS `var(--zui-token, fallback)` reads
 * - Tailwind v4 variable utilities such as `gap-(--zui-marquee-gap)`
 *
 * Style-object assignments are not counted as reads here because they define a
 * token value. This distinction lets the checker catch local variables that
 * are assigned but never consumed by a component.
 *
 * @param {string[]} files Package source files to scan.
 * @returns {Set<string>} Custom-property names read by source code.
 */
function collectTokenReads(files) {
  const reads = new Set();

  for (const file of files) {
    const text = readFileSync(file, "utf8");

    for (const call of extractVarCalls(text)) {
      const name = call.trim().match(/^(--zui-[a-z0-9-]+)/)?.[1];
      if (name) {
        reads.add(name);
      }
    }

    for (const match of text.matchAll(/\b[a-z-]+-\((--zui-[a-z0-9-]+)\)/g)) {
      reads.add(match[1]);
    }
  }

  return reads;
}

/**
 * Ensure locally defined custom properties are consumed by package source.
 *
 * Public component tokens are allowed to exist only as `var(--zui-...,fallback)`
 * reads because consumers may override them from outside the package. Local
 * definitions are different: when the library sets `[--zui-x:value]`, some
 * component code should read `--zui-x`; otherwise the definition is likely a
 * stale token that bloats the contract and docs without affecting behavior.
 *
 * @param {string[]} designFiles Design-system files that can contain Tailwind custom-property definitions.
 * @param {string[]} sourceFiles Package source files that can consume those definitions.
 * @returns {string[]} Human-readable contract violations.
 */
function auditUnusedLocalTokenDefinitions(designFiles, sourceFiles) {
  const errors = [];
  const definitions = collectLocalTokenDefinitions(designFiles);
  const reads = collectTokenReads(sourceFiles);

  for (const [name, files] of [...definitions.entries()].sort()) {
    if (reads.has(name)) {
      continue;
    }

    errors.push(
      `${[...files].map(relativePath).join(", ")} defines ${name} but package source never reads it`,
    );
  }

  return errors;
}

/**
 * Read a stable display name for an object literal property.
 *
 * Appearance maps usually use identifier keys, but string keys are also valid.
 * This helper normalizes those names so error messages can point at
 * `zuiButtonAppearances.primary` instead of dumping AST internals.
 *
 * @param {ts.ObjectLiteralElementLike} property Object property node.
 * @param {ts.SourceFile} source Source file that owns the property.
 * @returns {string} Human-readable property name.
 */
function propertyName(property, source) {
  if (!property.name) return "<unknown>";
  if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) {
    return property.name.text;
  }
  return property.name.getText(source);
}

/**
 * Ensure appearance-like maps use tokenized light and dark color coverage.
 *
 * Variables ending in `Appearances`, `Tones`, or `Colors` are treated as public
 * color-bearing variant maps. If a map entry contains color data, it must route
 * through `--zui-*` variables and must include dark-mode coverage either through
 * a `dark:` class branch or a `-dark` token reference.
 *
 * @param {string[]} files Design-system `.ts` files to audit.
 * @param {ReturnType<typeof createDesignSystemIndex>} index Parsed design-system index used to resolve referenced constants.
 * @returns {string[]} Human-readable contract violations.
 */
function auditAppearances(files, index) {
  const errors = [];

  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );

    for (const statement of source.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        const name = declaration.name.getText(source);
        if (!/(Appearances|Tones|Colors)$/.test(name)) continue;

        const initializer = unwrapExpression(declaration.initializer);

        if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
          continue;
        }

        for (const property of initializer.properties) {
          if (!ts.isPropertyAssignment(property)) continue;
          const entryName = propertyName(property, source);
          const text = flattenExpressionText(property.initializer, index, file);
          const colorBearing =
            text.includes("--zui-") ||
            rawTailwindColorPattern.test(text) ||
            rawColorFunctionPattern.test(text);
          if (!colorBearing) {
            continue;
          }
          if (!text.includes("--zui-")) {
            errors.push(
              `${relativePath(file)} ${name}.${entryName} does not use --zui-* variables`,
            );
          }
          if (!text.includes("dark:") && !text.includes("-dark")) {
            errors.push(
              `${relativePath(file)} ${name}.${entryName} does not include dark-mode token coverage`,
            );
          }
        }
      }
    }
  }

  return errors;
}

/**
 * Prevent raw color values from appearing in component variant files.
 *
 * `variants.ts` is the bridge from component props to design-system constants.
 * It may contain layout, spacing, typography, and state utilities, but color
 * choices should come from imported token constants. Catching raw Tailwind
 * color utilities and direct CSS color functions here keeps the theming API
 * centralized in `src/design-system`.
 *
 * @param {string[]} files Discovered `variants.ts` files.
 * @returns {string[]} Human-readable contract violations.
 */
function auditVariantFiles(files) {
  const errors = [];

  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );

    function visit(node) {
      if (
        ts.isStringLiteral(node) ||
        ts.isNoSubstitutionTemplateLiteral(node)
      ) {
        const value = node.text;
        if (rawTailwindColorPattern.test(value)) {
          errors.push(
            `${relativePath(file)} contains raw Tailwind color utility "${value.slice(
              0,
              120,
            )}"`,
          );
        }
        if (rawColorFunctionPattern.test(value)) {
          errors.push(
            `${relativePath(file)} contains raw color fallback/function "${value.slice(
              0,
              120,
            )}"`,
          );
        }
      }
      ts.forEachChild(node, visit);
    }

    visit(source);
  }

  return errors;
}

/**
 * Run the complete contract check.
 *
 * Each audit contributes human-readable errors. The process exits with a
 * non-zero status when any rule fails, which lets CI and `prepack` block
 * releases that weaken the design-token contract.
 */
const designFiles = readTsFiles(designSystemDir);
const designIndex = createDesignSystemIndex(designFiles);
const variantFiles = readVariantFiles(uiDir);
const sourceFiles = readSourceFiles(join(root, "src"));
const errors = [
  ...auditPureDesignSystemFiles(designFiles),
  ...auditFallbacks(designFiles),
  ...auditUnusedLocalTokenDefinitions(designFiles, sourceFiles),
  ...auditAppearances(designFiles, designIndex),
  ...auditVariantFiles(variantFiles),
];

if (errors.length > 0) {
  console.error("Design token contract check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Design token contract is valid.");
