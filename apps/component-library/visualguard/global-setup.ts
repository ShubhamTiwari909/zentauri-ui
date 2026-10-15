import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export default function checkEnvironment() {
  if (process.platform !== "linux" || process.arch !== "arm64") {
    throw new Error(
      "Use bash scripts/visualguard/run-container.sh compare (or update) from the repository root for canonical Linux ARM64 captures.",
    );
  }
  // Playwright has already started the production server and checked readiness.
  execFileSync("pnpm", ["visual:doctor"], {
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    stdio: "inherit",
  });
}
