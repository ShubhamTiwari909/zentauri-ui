import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const tsupPath = join(packageRoot, "tsup.config.ts");

/**
 * Extract string literal entries from a TypeScript array initializer body.
 *
 * Intentionally tiny: `tsup.config.ts` owns simple `as const` string arrays, so
 * a full AST parse would add ceremony without improving correctness here.
 *
 * @param {string} block Text between `[` and `]` for one tsup list.
 * @returns {string[]} String literal values in source order.
 */
export function extractQuotedNames(block) {
  const names = [];
  const re = /["']([^"']+)["']/g;
  let match;
  while ((match = re.exec(block)) !== null) {
    names.push(match[1]);
  }
  return names;
}

/**
 * Read one canonical entry list from `packages/components/tsup.config.ts`.
 *
 * That file is the single source of truth for the package's entry universe —
 * it drives both the build entries and the generated CLI registry — so every
 * generator reads it rather than keeping a second hand-written list.
 *
 * @param {string} name Variable name to parse from `tsup.config.ts`.
 * @returns {string[]} Sorted entry names from the requested list.
 * @throws {Error} When the expected `const <name> = [...] as const` block is missing.
 */
export function readTsupList(name) {
  const text = readFileSync(tsupPath, "utf8");
  const match = text.match(
    new RegExp(`const ${name} = \\[([\\s\\S]*?)\\] as const`),
  );
  if (!match) {
    throw new Error(`Could not parse ${name} from tsup.config.ts`);
  }
  return extractQuotedNames(match[1]).sort();
}
