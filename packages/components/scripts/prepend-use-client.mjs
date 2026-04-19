import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const directive = '"use client";\n';

async function maybePrependDirective(filePath, baseName) {
  if (baseName.startsWith("chunk-")) return;
  if (!baseName.endsWith(".mjs") && !baseName.endsWith(".js")) return;
  if (baseName.endsWith(".map")) return;
  if (baseName === "utils.mjs" || baseName === "utils.js") return;

  const source = await readFile(filePath, "utf8");
  if (source.startsWith('"use client"') || source.startsWith("'use client'")) return;
  await writeFile(filePath, directive + source, "utf8");
}

async function prependDirectiveToDistDir(distDir) {
  let entries;
  try {
    entries = await readdir(distDir, { withFileTypes: true });
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
  for (const entry of entries) {
    const childPath = join(distDir, entry.name);
    if (entry.isDirectory()) {
      await prependDirectiveToDistDir(childPath);
      continue;
    }
    if (entry.isFile()) {
      await maybePrependDirective(childPath, entry.name);
    }
  }
}

await prependDirectiveToDistDir(join(packageRoot, "dist", "ui"));
await prependDirectiveToDistDir(join(packageRoot, "dist", "hooks"));
