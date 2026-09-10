import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { buildUpdatedReadme } from "./generate-package-surface.mjs";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const readmePath = join(packageRoot, "README.md");

const expected = buildUpdatedReadme();
const actual = readFileSync(readmePath, "utf8");

if (actual !== expected) {
  console.error(
    "The 'Current package surface' section in packages/components/README.md is stale. Run 'pnpm --filter @zentauri-ui/zentauri-components generate:surface' and commit the result.",
  );
  process.exit(1);
}

console.log("Package surface section is in sync.");
