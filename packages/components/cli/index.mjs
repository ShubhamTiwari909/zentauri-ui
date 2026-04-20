#!/usr/bin/env node
/**
 * @file Zentauri UI Components CLI — `zentauri-components` / `zentauri-ui`
 *
 * ## Purpose
 *
 * This executable copies **selected** UI component source from the
 * `@zentauri-ui/zentauri-components` package into a consumer app’s tree, so you own the files, paths are configurable, and
 * imports are rewritten to match your `components.json` aliases.
 *
 * ## How it fits together
 *
 * ```
 *   [Your app repo]
 *        │
 *        ├── components.json    ← `init` creates this; `add` reads it
 *        └── src/...
 *
 *   [This package @ packages/components]
 *        ├── cli/index.mjs      ← this file (entry when run via bin)
 *        ├── cli/registry.json  ← list of installable component folder names
 *        └── src/ui/<name>/     ← source copied by `add`
 *        └── src/hooks/<name>/  ← hooks pulled in as dependencies
 *        └── src/lib/utils.ts   ← template for `cn()` etc. if missing in app
 * ```
 *
 * - **packageRoot**: directory of the published `components` package (parent of
 *   `cli/`). Used to read `registry.json`, `src/ui`, `src/hooks`, `src/lib`.
 * - **configDir**: directory containing `components.json` (may differ from
 *   `--cwd` when the config is found by walking up from `cwd`).
 *
 * ## Commands (see also `printHelp()`)
 *
 * | Command   | Role |
 * |-----------|------|
 * | `init`    | Writes `components.json` with default `aliases` + `resolvedPaths` if none exists. |
 * | `add` …   | Resolves names via registry, copies UI folders, discovers hooks, copies hook transitive closure, ensures `utils` file. |
 * | `--help`  | Prints usage text. |
 * | `--version` | Prints `version` from this package’s `package.json`. |
 *
 * ## Example sessions (terminal)
 *
 * ```bash
 * # From your Next.js app root (after init once):
 * npx zentauri-components init
 * ```
 *
 * Example stdout:
 * ```
 * Wrote /path/to/your-app/components.json
 * ```
 *
 * ```bash
 * npx zentauri-components add button
 * ```
 *
 * Example stdout (paths depend on your `resolvedPaths`):
 * ```
 * Created src/lib/utils.ts
 * Adding button…
 * Adding hook useMediaQuery…
 * Done.
 * ```
 *
 * ```bash
 * npx zentauri-components add accordion buttons inputs
 * ```
 *
 * Multiple components in one run: each line `Adding <name>…`, then hooks, then `Done.`
 *
 * ## Import rewriting
 *
 * TypeScript/JSX files are passed through `rewrite-imports.mjs` so internal
 * package paths become the consumer’s `@/…` (or whatever you set in
 * `components.json`). Non-code assets are copied byte-for-byte.
 *
 * ## Exit codes
 *
 * - Sets `process.exitCode = 1` on validation errors, missing config, unknown
 *   command, or refused `init` overwrite. Successful runs leave default exit 0.
 */

import { existsSync, readFileSync } from "node:fs";
import {
  readFile,
  writeFile,
  mkdir,
  copyFile,
  readdir,
} from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import {
  extractSiblingHookImports,
  rewriteImports,
} from "./rewrite-imports.mjs";

/** Directory containing this script (`…/packages/components/cli`). */
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Root of the components package (`…/packages/components`), i.e. parent of `cli/`.
 * All reads from `src/ui`, `src/hooks`, `registry.json`, and `package.json` are
 * relative to this path — not the consumer’s project root.
 */
const packageRoot = join(__dirname, "..");

/**
 * Loads the static registry of component folder names and optional aliases.
 *
 * @returns {object} Parsed `cli/registry.json` — expect at least
 *   `{ components: string[], nameAliases?: Record<string, string> }`.
 *
 * @example
 * // registry.json (conceptual)
 * // { "components": ["buttons", "inputs"], "nameAliases": { "btn": "buttons" } }
 */
function loadRegistry() {
  const path = join(packageRoot, "cli", "registry.json");
  return JSON.parse(readFileSync(path, "utf8"));
}

/**
 * Prints human-readable help to **stdout** (not stderr), for `-h` / `--help`.
 * Side effect only; no return value.
 *
 * @example
 * // User runs: zentauri-components --help
 * // Terminal shows multi-line Usage / Options / examples (see string below).
 */
function printHelp() {
  console.log(`Zentauri UI — copy component source into your app (shadcn-style)

Usage:
  zentauri-components init [options]   Create components.json with defaults
  zentauri-components add <names...>   Copy one or more components (and deps)

  (The zentauri-ui binary name works the same if your PATH exposes it.)

Options:
  --cwd <dir>    Working directory (default: process.cwd())
  -h, --help     Show help
  -v, --version  Show package version

Local (no npm publish): cd to your app root, then run Node with a path to this CLI (yours may differ):
  node ../../packages/components/cli/index.mjs init
  node ../../packages/components/cli/index.mjs add button
  Only copies that component’s folder (here: ui/buttons) and creates lib/utils.ts if missing—not the whole monorepo.

Published package:
  npx @zentauri-ui/zentauri-components init
  npx @zentauri-ui/zentauri-components add accordion buttons inputs

If npx does not pick the right binary:
  npx --yes --package=@zentauri-ui/zentauri-components zentauri-components init
  npx --yes --package=@zentauri-ui/zentauri-components zentauri-ui init
`);
}

/**
 * Whether a path segment should be skipped when copying into a consumer app.
 * Test files are not shipped so apps do not inherit package test suites.
 *
 * @param {string} name — file name or relative path (e.g. `Button.test.tsx`)
 * @returns {boolean}
 *
 * @example
 * isTestFile("Button.spec.tsx");  // true
 * @example
 * isTestFile("index.ts");         // false
 * @example
 * isTestFile("foo.test.utils.ts"); // true (substring ".test.")
 */
function isTestFile(name) {
  return /\.(?:test|spec)\.(?:tsx?|jsx?)$/.test(name) || name.includes(".test.");
}

/**
 * Recursively lists every **file** path under `dir` (directories are traversed,
 * not included in the result).
 *
 * @param {string} dir — absolute path to a directory under the package
 * @returns {Promise<string[]>} — flat list of absolute file paths
 *
 * @example
 * // Given src/ui/buttons/index.ts and src/ui/buttons/Button.tsx
 * // await walkFiles("/pkg/src/ui/buttons")
 * // => ["/pkg/src/ui/buttons/Button.tsx", "/pkg/src/ui/buttons/index.ts"]
 * // (order depends on filesystem; not sorted)
 */
async function walkFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walkFiles(p)));
    } else {
      out.push(p);
    }
  }
  return out;
}

/**
 * Walks upward from `startDir` toward the filesystem root until `components.json`
 * exists, or returns `undefined` if none found (e.g. user forgot `init`).
 *
 * @param {string} startDir — typically `process.cwd()` or `--cwd` resolved path
 * @returns {string | undefined} — absolute path to `components.json` if found
 *
 * @example
 * // startDir = "/app/apps/web", file at "/app/components.json"
 * // => "/app/components.json"
 * @example
 * // No components.json in startDir or any parent
 * // => undefined
 */
async function findComponentsJson(startDir) {
  let d = startDir;
  for (;;) {
    const p = join(d, "components.json");
    if (existsSync(p)) {
      return p;
    }
    const parent = dirname(d);
    if (parent === d) {
      return undefined;
    }
    d = parent;
  }
}

/**
 * Default shape written by `init`. Consumers may edit paths to match their
 * bundler/tsconfig path aliases (`@/…`).
 *
 * @returns {{ aliases: Record<string, string>, resolvedPaths: Record<string, string> }}
 *
 * @example
 * // JSON written to disk (pretty-printed):
 * // {
 * //   "aliases": {
 * //     "ui": "@/components/ui",
 * //     "utils": "@/lib/utils",
 * //     "hooks": "@/hooks"
 * //   },
 * //   "resolvedPaths": {
 * //     "ui": "src/components/ui",
 * //     "utils": "src/lib/utils.ts",
 * //     "hooks": "src/hooks"
 * //   }
 * // }
 */
function defaultConfig() {
  return {
    aliases: {
      ui: "@/components/ui",
      utils: "@/lib/utils",
      hooks: "@/hooks",
    },
    resolvedPaths: {
      ui: "src/components/ui",
      utils: "src/lib/utils.ts",
      hooks: "src/hooks",
    },
  };
}

/**
 * Ensures `add` has everything it needs to compute destination paths and rewrite
 * imports. Throws a single clear error if the config is incomplete.
 *
 * @param {object} cfg — parsed `components.json`
 * @throws {Error} if any of `aliases.{utils,hooks,ui}` or
 *   `resolvedPaths.{ui,utils,hooks}` is missing
 *
 * @example
 * // validateConfig({ aliases: {}, resolvedPaths: {} });
 * // throws:
 * // Error: components.json must define aliases.utils, aliases.hooks, and aliases.ui
 */
function validateConfig(cfg) {
  if (!cfg.aliases?.utils || !cfg.aliases?.hooks || !cfg.aliases?.ui) {
    throw new Error(
      "components.json must define aliases.utils, aliases.hooks, and aliases.ui",
    );
  }
  if (!cfg.resolvedPaths?.ui || !cfg.resolvedPaths?.utils || !cfg.resolvedPaths?.hooks) {
    throw new Error(
      "components.json must define resolvedPaths.ui, resolvedPaths.utils, and resolvedPaths.hooks",
    );
  }
}

/**
 * Maps CLI input (any casing, optional registry alias) to a canonical folder name
 * under `src/ui/<name>` in the package.
 *
 * Resolution order:
 * 1. Exact key in `registry.nameAliases`
 * 2. Case-insensitive key match in `nameAliases`
 * 3. Exact match in `registry.components`
 * 4. Case-insensitive match in `registry.components`
 * 5. Otherwise throws
 *
 * @param {string} input — argv token from user, e.g. `"Btn"` or `"buttons"`
 * @param {object} registry — from `loadRegistry()`
 * @returns {string} — canonical component directory name
 * @throws {Error} when the name is unknown
 *
 * @example
 * // registry.components = ["buttons"], nameAliases = { "btn": "buttons" }
 * resolveComponentName("btn", registry);    // "buttons"
 * resolveComponentName("BUTTONS", registry); // "buttons"
 * @example
 * // resolveComponentName("typo", registry);
 * // throws: Unknown component "typo". Valid names include: ...
 */
function resolveComponentName(input, registry) {
  const aliases = registry.nameAliases ?? {};
  if (aliases[input]) {
    return aliases[input];
  }
  const lower = input.toLowerCase();
  const aliasKey = Object.keys(aliases).find((k) => k.toLowerCase() === lower);
  if (aliasKey) {
    return aliases[aliasKey];
  }
  if (registry.components.includes(input)) {
    return input;
  }
  const found = registry.components.find((c) => c.toLowerCase() === lower);
  if (found) {
    return found;
  }
  throw new Error(
    `Unknown component "${input}". Valid names include: ${registry.components.join(", ")}`,
  );
}

/**
 * Starting from hook folder names discovered in UI code, expands the set to
 * include every hook that those hooks import from **sibling** hook packages
 * (parsed via `extractSiblingHookImports`). Ensures `add` copies a consistent
 * dependency graph, not only direct imports.
 *
 * @param {string} packageRoot — components package root
 * @param {string[]} seedHooks — e.g. `["useToggle", "useMediaQuery"]`
 * @returns {Promise<string[]>} — deduplicated list of hook folder names
 *
 * @example
 * // seedHooks = ["useA"]; useA imports useB; useB imports useC
 * // => ["useA", "useB", "useC"]  (order depends on BFS/stack pop order)
 */
async function collectHookTransitiveClosure(packageRoot, seedHooks) {
  const closure = new Set(seedHooks);
  const queue = [...seedHooks];
  while (queue.length > 0) {
    const h = queue.pop();
    const hookDir = join(packageRoot, "src", "hooks", h);
    if (!existsSync(hookDir)) {
      continue;
    }
    const files = await walkFiles(hookDir);
    for (const file of files) {
      if (!/\.(tsx?|jsx?)$/.test(file)) {
        continue;
      }
      const source = await readFile(file, "utf8");
      for (const dep of extractSiblingHookImports(source)) {
        if (!closure.has(dep)) {
          closure.add(dep);
          queue.push(dep);
        }
      }
    }
  }
  return [...closure];
}

/**
 * Copies `packageRoot/src/ui/<componentName>` into
 * `<configDir>/<resolvedPaths.ui>/<componentName>`, skipping tests, rewriting
 * imports in TS/JS files, and collecting hook folder names referenced by those
 * files for later copying.
 *
 * @param {string} componentName — resolved registry name (directory under `src/ui`)
 * @param {object} config — validated `components.json`
 * @param {string} configDir — dirname(components.json)
 * @param {string} packageRoot — package containing source
 * @returns {Promise<string[]>} — hook names used by copied UI files (not yet transitive)
 * @throws {Error} if source folder is missing in the package
 *
 * @example
 * // After copy, consumer might have:
 * // src/components/ui/buttons/Button.tsx
 * // with imports pointing at @/lib/utils, @/hooks/useX, etc.
 */
async function copyUiComponent(
  componentName,
  config,
  configDir,
  packageRoot,
) {
  const srcRoot = join(packageRoot, "src", "ui", componentName);
  if (!existsSync(srcRoot)) {
    throw new Error(`Missing package source: ${relative(packageRoot, srcRoot)}`);
  }
  const destRoot = join(configDir, config.resolvedPaths.ui, componentName);
  const files = await walkFiles(srcRoot);
  const usedHooks = new Set();

  for (const absSrc of files) {
    const rel = relative(srcRoot, absSrc);
    if (isTestFile(rel)) {
      continue;
    }
    const absDest = join(destRoot, rel);
    await mkdir(dirname(absDest), { recursive: true });
    if (/\.(tsx?|jsx?)$/.test(absSrc)) {
      const raw = await readFile(absSrc, "utf8");
      const { code, usedHooks: uh } = rewriteImports(raw, {
        utilsAlias: config.aliases.utils,
        hooksAlias: config.aliases.hooks,
        uiAlias: config.aliases.ui,
      });
      for (const h of uh) {
        usedHooks.add(h);
      }
      await writeFile(absDest, code, "utf8");
    } else {
      await copyFile(absSrc, absDest);
    }
  }
  return [...usedHooks];
}

/**
 * Same traversal rules as {@link copyUiComponent}, but for `src/hooks/<hookName>`.
 * Used after UI copy so shared hooks land under the consumer’s `resolvedPaths.hooks`.
 *
 * @param {string} hookName — folder name under `src/hooks`
 *
 * @example
 * // Source: package src/hooks/useToggle/useToggle.ts
 * // Dest:   <configDir>/src/hooks/useToggle/useToggle.ts
 */
async function copyHookFolder(hookName, config, configDir, packageRoot) {
  const srcRoot = join(packageRoot, "src", "hooks", hookName);
  if (!existsSync(srcRoot)) {
    throw new Error(`Missing hook source: hooks/${hookName}`);
  }
  const destRoot = join(configDir, config.resolvedPaths.hooks, hookName);
  const files = await walkFiles(srcRoot);
  for (const absSrc of files) {
    const rel = relative(srcRoot, absSrc);
    if (isTestFile(rel)) {
      continue;
    }
    const absDest = join(destRoot, rel);
    await mkdir(dirname(absDest), { recursive: true });
    if (/\.(tsx?|jsx?)$/.test(absSrc)) {
      const raw = await readFile(absSrc, "utf8");
      const { code } = rewriteImports(raw, {
        utilsAlias: config.aliases.utils,
        hooksAlias: config.aliases.hooks,
        uiAlias: config.aliases.ui,
      });
      await writeFile(absDest, code, "utf8");
    } else {
      await copyFile(absSrc, absDest);
    }
  }
}

/**
 * If the target utils file from config does not exist, copies the package default
 * `src/lib/utils.ts` (with import paths rewritten) and logs creation.
 *
 * @example
 * // First `add` in a fresh app prints:
 * // Created src/lib/utils.ts
 * // Second `add` prints nothing here (file already exists).
 */
async function ensureUtilsFile(config, configDir, packageRoot) {
  const dest = join(configDir, config.resolvedPaths.utils);
  if (existsSync(dest)) {
    return;
  }
  await mkdir(dirname(dest), { recursive: true });
  const src = join(packageRoot, "src", "lib", "utils.ts");
  const raw = await readFile(src, "utf8");
  const { code } = rewriteImports(raw, {
    utilsAlias: config.aliases.utils,
    hooksAlias: config.aliases.hooks,
    uiAlias: config.aliases.ui,
  });
  await writeFile(dest, code, "utf8");
  console.log(`Created ${relative(configDir, dest)}`);
}

/**
 * `zentauri-components init` — writes default `components.json` next to `--cwd`.
 *
 * @param {string} cwd — resolved working directory
 *
 * @example
 * // Success stdout:
 * // Wrote /Users/me/my-app/components.json
 *
 * @example
 * // If file exists — stderr + exitCode 1, no overwrite:
 * // Refusing to overwrite existing /Users/me/my-app/components.json
 */
async function cmdInit(cwd) {
  const target = join(cwd, "components.json");
  if (existsSync(target)) {
    console.error(`Refusing to overwrite existing ${target}`);
    process.exitCode = 1;
    return;
  }
  const body = `${JSON.stringify(defaultConfig(), null, 2)}\n`;
  await writeFile(target, body, "utf8");
  console.log(`Wrote ${target}`);
}

/**
 * `zentauri-components add a b c` — full pipeline: find config, validate, utils,
 * copy each UI component, compute hook closure, copy each hook, finish.
 *
 * @param {string[]} names — positional args after `add`
 * @param {string} cwd — resolved working directory (starting point for config search)
 *
 * @example
 * // Typical stdout:
 * // Created src/lib/utils.ts
 * // Adding buttons…
 * // Adding inputs…
 * // Adding hook useMediaQuery…
 * // Done.
 *
 * @example
 * // No components.json in cwd or parents — stderr:
 * // No components.json found. Run: zentauri-components init  (or: zentauri-ui init)
 */
async function cmdAdd(names, cwd) {
  const configPath = await findComponentsJson(cwd);
  if (!configPath) {
    console.error(
      "No components.json found. Run: zentauri-components init  (or: zentauri-ui init)",
    );
    process.exitCode = 1;
    return;
  }
  const configDir = dirname(configPath);
  const config = JSON.parse(await readFile(configPath, "utf8"));
  validateConfig(config);

  const registry = loadRegistry();
  const resolvedNames = names.map((n) => resolveComponentName(n, registry));

  await ensureUtilsFile(config, configDir, packageRoot);

  const allHooks = new Set();
  for (const name of resolvedNames) {
    console.log(`Adding ${name}…`);
    const uh = await copyUiComponent(name, config, configDir, packageRoot);
    for (const h of uh) {
      allHooks.add(h);
    }
  }

  const finalHooks = await collectHookTransitiveClosure(
    packageRoot,
    [...allHooks],
  );

  for (const h of finalHooks) {
    console.log(`Adding hook ${h}…`);
    await copyHookFolder(h, config, configDir, packageRoot);
  }

  console.log("Done.");
}

/**
 * Parses `process.argv` with `node:util.parseArgs`, dispatches `init` / `add`,
 * or prints help / version. Sets `process.exitCode` for recoverable CLI errors
 * instead of always calling `process.exit()` (except unhandled rejections
 * caught in the outer `.catch`).
 *
 * @example
 * // argv: ["node", "index.mjs", "add", "button"]
 * // => cmdAdd(["button"], cwd)
 *
 * @example
 * // argv: ["node", "index.mjs"]
 * // => printHelp(), exitCode 1
 *
 * @example
 * // argv: ["node", "index.mjs", "-v"]
 * // => "1.2.3" (whatever version is in package.json)
 */
async function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      help: { type: "boolean", short: "h" },
      version: { type: "boolean", short: "v" },
      cwd: { type: "string" },
    },
  });

  if (values.help) {
    printHelp();
    return;
  }
  if (values.version) {
    const pkg = JSON.parse(
      readFileSync(join(packageRoot, "package.json"), "utf8"),
    );
    console.log(pkg.version);
    return;
  }

  const cwd = values.cwd ? join(process.cwd(), values.cwd) : process.cwd();
  const cmd = positionals[0];
  const rest = positionals.slice(1);

  if (!cmd) {
    printHelp();
    process.exitCode = 1;
    return;
  }

  if (cmd === "init") {
    await cmdInit(cwd);
    return;
  }
  if (cmd === "add") {
    if (rest.length === 0) {
      console.error(
        "Usage: zentauri-components add <component> [more...]  (or: zentauri-ui add …)",
      );
      process.exitCode = 1;
      return;
    }
    await cmdAdd(rest, cwd);
    return;
  }

  console.error(`Unknown command: ${cmd}`);
  printHelp();
  process.exitCode = 1;
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
