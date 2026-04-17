import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const distUi = join(packageRoot, "dist", "ui");
const directive = '"use client";\n';

const files = await readdir(distUi);
for (const name of files) {
  if (name.startsWith("chunk-")) continue;
  if (!name.endsWith(".mjs") && !name.endsWith(".js")) continue;
  if (name.endsWith(".map")) continue;

  const filePath = join(distUi, name);
  const source = await readFile(filePath, "utf8");
  if (source.startsWith('"use client"') || source.startsWith("'use client'")) continue;
  await writeFile(filePath, directive + source, "utf8");
}
