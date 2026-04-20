import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const cliEntry = join(packageRoot, "cli", "index.mjs");

function runCli(cwd: string, args: string[]) {
  execFileSync(process.execPath, [cliEntry, ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
}

describe("zentauri-ui CLI", () => {
  it("should init, add accordion, and rewrite internal imports", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-int-"));
    try {
      runCli(dir, ["init"]);
      runCli(dir, ["add", "accordion"]);
      const indexPath = join(dir, "src/components/ui/accordion/index.ts");
      expect(existsSync(indexPath)).toBe(true);
      const base = readFileSync(
        join(dir, "src/components/ui/accordion/accordion-base.tsx"),
        "utf8",
      );
      expect(base).toContain('from "@/lib/utils"');
      expect(base).not.toContain("../../lib/utils");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should resolve button alias to buttons", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-alias-"));
    try {
      runCli(dir, ["init"]);
      runCli(dir, ["add", "button"]);
      expect(
        existsSync(join(dir, "src/components/ui/buttons/button.tsx")),
      ).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
