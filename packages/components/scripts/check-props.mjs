import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildPropsManifest,
  serializePropsManifest,
} from "./generate-props.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const propsPath = join(root, "cli", "props.json");

const expected = serializePropsManifest(buildPropsManifest());
const actual = readFileSync(propsPath, "utf8");

if (actual !== expected) {
  console.error(
    "cli/props.json is stale. Run 'pnpm --filter @zentauri-ui/zentauri-components generate:props' and commit the result.",
  );
  process.exit(1);
}

console.log("cli/props.json is in sync.");
