import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
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
 * or CSS color functions. References inside template expressions are skipped
 * because imported constants are audited at their source, while the surrounding
 * literal pieces still tell us whether an appearance entry carries color data.
 *
 * @param {ts.Expression | undefined} node Initializer or nested expression.
 * @returns {string} Concatenated literal text found inside the expression.
 */
function flattenExpressionText(node) {
  if (!node) return "";
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isTemplateExpression(node)) {
    return [
      node.head.text,
      ...node.templateSpans.map((span) => span.literal.text),
    ].join("");
  }
  if (
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node)
  ) {
    return flattenExpressionText(node.expression);
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements
      .map((element) => flattenExpressionText(element))
      .join(" ");
  }
  if (ts.isObjectLiteralExpression(node)) {
    return node.properties
      .map((property) => {
        if (ts.isPropertyAssignment(property)) {
          return flattenExpressionText(property.initializer);
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
          !specifier.text.startsWith("./")
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
      cursor = end + 1;
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
 * @returns {string[]} Human-readable contract violations.
 */
function auditAppearances(files) {
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

        let initializer = declaration.initializer;
        while (
          initializer &&
          (ts.isAsExpression(initializer) ||
            ts.isSatisfiesExpression(initializer) ||
            ts.isParenthesizedExpression(initializer))
        ) {
          initializer = initializer.expression;
        }

        if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
          continue;
        }

        for (const property of initializer.properties) {
          if (!ts.isPropertyAssignment(property)) continue;
          const entryName = propertyName(property, source);
          const text = flattenExpressionText(property.initializer);
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
const variantFiles = readVariantFiles(uiDir);
const errors = [
  ...auditPureDesignSystemFiles(designFiles),
  ...auditFallbacks(designFiles),
  ...auditAppearances(designFiles),
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
