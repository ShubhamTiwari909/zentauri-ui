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

  it("should add hook-only mode for useWindowSize", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-hook-"));
    try {
      runCli(dir, ["init"]);
      runCli(dir, ["add", "hook", "useWindowSize"]);
      const hookFile = join(dir, "src/hooks/useWindowSize/useWindowSize.ts");
      expect(existsSync(hookFile)).toBe(true);
      const src = readFileSync(hookFile, "utf8");
      expect(src).toContain("useWindowSize");
      expect(src).toContain('"use client"');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should pull transitive hook deps for usePrefersReducedMotion", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-hook-trans-"));
    try {
      runCli(dir, ["init"]);
      runCli(dir, ["add", "hook", "usePrefersReducedMotion"]);
      expect(
        existsSync(join(dir, "src/hooks/useMediaQuery/useMediaQuery.ts")),
      ).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
