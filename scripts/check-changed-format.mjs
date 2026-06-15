import { execFileSync } from "node:child_process";

const prettierExtensions = new Set([
  ".cjs",
  ".css",
  ".cts",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".mts",
  ".scss",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
]);

let baseRef = "HEAD";
try {
  execFileSync("git", ["rev-parse", "--verify", "origin/main"], {
    stdio: "ignore",
  });
  baseRef = "origin/main...HEAD";
} catch {
  try {
    execFileSync("git", ["rev-parse", "--verify", "main"], { stdio: "ignore" });
    baseRef = "main...HEAD";
  } catch {
    baseRef = "HEAD";
  }
}

const diffOutput = execFileSync(
  "git",
  ["diff", "--name-only", "--diff-filter=ACMR", baseRef],
  { encoding: "utf8" },
);

const changedFiles = diffOutput
  .split("\n")
  .map((filePath) => filePath.trim())
  .filter(Boolean)
  .filter((filePath) => filePath !== "pnpm-lock.yaml")
  .filter((filePath) =>
    [...prettierExtensions].some((extension) => filePath.endsWith(extension)),
  );

if (changedFiles.length === 0) {
  console.log("No changed Prettier-supported files.");
  process.exit(0);
}

execFileSync("pnpm", ["exec", "prettier", "--check", ...changedFiles], {
  stdio: "inherit",
});
