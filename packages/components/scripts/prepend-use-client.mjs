import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const directive = '"use client";\n';

async function prependDirectiveToDistDir(distDir) {
  let files;
  try {
    files = await readdir(distDir);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return;
    }
    throw error;
  }
  for (const name of files) {
    if (name.startsWith("chunk-")) continue;
    if (!name.endsWith(".mjs") && !name.endsWith(".js")) continue;
    if (name.endsWith(".map")) continue;
    if (name === "utils.mjs" || name === "utils.js") continue;

    const filePath = join(distDir, name);
    const source = await readFile(filePath, "utf8");
    if (source.startsWith('"use client"') || source.startsWith("'use client'"))
      continue;
    await writeFile(filePath, directive + source, "utf8");
  }
}

await prependDirectiveToDistDir(join(packageRoot, "dist", "ui"));
await prependDirectiveToDistDir(join(packageRoot, "dist", "hooks"));
