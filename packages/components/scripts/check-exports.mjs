/**
 * Export smoke test. Verifies that every entry declared in tsup.config.ts has a
 * matching built artifact under dist/ for each `exports` condition (ESM `.mjs`,
 * CJS `.js`, and types `.d.ts`). Run after `build` and before publish so a broken
 * or stale build cannot ship with unresolvable subpaths.
 *
 * Exits 1 (and lists every missing file) if anything is absent.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const tsupText = readFileSync(join(root, "tsup.config.ts"), "utf8");

function parseNames(constName) {
  const match = tsupText.match(
    new RegExp(`const ${constName} = \\[([\\s\\S]*?)\\] as const`),
  );
  if (!match) {
    throw new Error(`Could not parse ${constName} from tsup.config.ts`);
  }
  return [...match[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
}

const ui = parseNames("uiComponentNames");
const charts = parseNames("chartEntryNames");
const animations = parseNames("animationEntryNames");
const animated = parseNames("uiAnimatedComponentNames");
const hooks = parseNames("hooksEntryNames");

/** Each expected output: an ESM bundle, a CJS bundle, and a declaration file. */
const expected = [];
const add = (mjs, cjs, dts) => expected.push({ mjs, cjs, dts });

for (const name of ui) {
  add(`ui/${name}.mjs`, `ui/${name}.js`, `ui/${name}/index.d.ts`);
}
for (const name of animated) {
  add(
    `ui/${name}/animated.mjs`,
    `ui/${name}/animated.js`,
    `ui/${name}/animated/index.d.ts`,
  );
}
for (const name of charts) {
  add(`charts/${name}.mjs`, `charts/${name}.js`, `charts/${name}/index.d.ts`);
}
for (const name of animations) {
  add(
    `animations/${name}.mjs`,
    `animations/${name}.js`,
    `animations/${name}/index.d.ts`,
  );
}
for (const name of hooks) {
  add(`hooks/${name}.mjs`, `hooks/${name}.js`, `hooks/${name}/index.d.ts`);
}
// Special-cased entries from package.json exports.
add("hooks/utils.mjs", "hooks/utils.js", "lib/utils.d.ts");
add(
  "design-system/tokens.mjs",
  "design-system/tokens.js",
  "design-system/tokens.d.ts",
);
add("permission.mjs", "permission.js", "permission/index.d.ts");

if (!existsSync(dist)) {
  console.error(
    "dist/ does not exist. Run `npm run build` before checking exports.",
  );
  process.exit(1);
}

const missing = [];
for (const entry of expected) {
  for (const rel of [entry.mjs, entry.cjs, entry.dts]) {
    if (!existsSync(join(dist, rel))) {
      missing.push(rel);
    }
  }
}

if (missing.length > 0) {
  console.error(`Missing ${missing.length} built artifact(s):`);
  for (const rel of missing) {
    console.error(`  - dist/${rel}`);
  }
  process.exit(1);
}

console.log(
  `Export smoke test passed: ${expected.length} entries × 3 conditions resolved under dist/.`,
);
