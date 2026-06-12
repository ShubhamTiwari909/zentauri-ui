import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const cliEntry = join(packageRoot, "cli", "index.mjs");

function runCli(cwd: string, args: string[]): string {
  return execFileSync(process.execPath, [cliEntry, ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
}

function runCliError(cwd: string, args: string[]): string {
  try {
    runCli(cwd, args);
    throw new Error("Expected CLI command to fail");
  } catch (error) {
    if (error && typeof error === "object" && "stderr" in error) {
      return Buffer.isBuffer(error.stderr)
        ? error.stderr.toString("utf8")
        : String(error.stderr);
    }
    throw error;
  }
}

describe("zentauri-ui CLI", () => {
  it("should init with framework-aware Tailwind source guidance", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-init-next-"));
    try {
      const packageJsonPath = join(dir, "package.json");
      execFileSync(
        process.execPath,
        [
          "-e",
          `require("node:fs").writeFileSync(${JSON.stringify(
            packageJsonPath,
          )}, JSON.stringify({ dependencies: { next: "16.0.0" } }))`,
        ],
        { cwd: dir },
      );
      const out = runCli(dir, ["init"]);
      expect(out).toContain("Detected framework: Next.js");
      expect(out).toContain('@source "./src/components/ui";');
      expect(out).toContain("pnpm add react react-dom");
      expect(existsSync(join(dir, "components.json"))).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should detect Remix over Vite when both dependencies are present", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-init-remix-"));
    try {
      const packageJsonPath = join(dir, "package.json");
      execFileSync(
        process.execPath,
        [
          "-e",
          `require("node:fs").writeFileSync(${JSON.stringify(
            packageJsonPath,
          )}, JSON.stringify({ dependencies: { "@remix-run/react": "2.0.0" }, devDependencies: { vite: "5.0.0" } }))`,
        ],
        { cwd: dir },
      );
      const out = runCli(dir, ["init"]);
      expect(out).toContain("Detected framework: Remix");
      expect(out).toContain('@source "./app/components/ui";');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should list addable UI, chart, animation, and hook entries", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-list-"));
    try {
      const out = runCli(dir, ["list"]);
      expect(out).toContain("UI components");
      expect(out).toContain("buttons");
      expect(out).toContain("charts/line");
      expect(out).toContain("animations/fade-in");
      expect(out).toContain("Hooks");
      expect(out).toContain("useWindowSize");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should print component info with install and import commands", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-info-"));
    try {
      const out = runCli(dir, ["info", "button"]);
      expect(out).toContain("Name: buttons");
      expect(out).toContain("npx zentauri-ui add button");
      expect(out).toContain("@zentauri-ui/zentauri-components/ui/buttons");
      expect(out).toContain("--animated");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should add an animated component explicitly and report missing peers", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-add-animated-"));
    try {
      runCli(dir, ["init"]);
      const out = runCli(dir, ["add", "--animated", "button"]);
      expect(
        existsSync(join(dir, "src/components/ui/buttons/animated/index.ts")),
      ).toBe(true);
      expect(out).toContain("Including animated entry for buttons");
      expect(out).toContain("Missing peer dependencies in this project");
      expect(out).toContain("framer-motion");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should reject --animated for components without an animated entry", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-add-static-only-"));
    try {
      runCli(dir, ["init"]);
      const stderr = runCliError(dir, ["add", "--animated", "pagination"]);
      expect(stderr).toContain('Component "pagination" has no animated entry');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

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
      expect(
        existsSync(join(dir, "src/components/design-system/button.ts")),
      ).toBe(true);
      const variants = readFileSync(
        join(dir, "src/components/ui/buttons/variants.ts"),
        "utf8",
      );
      expect(variants).toContain("../../design-system");
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

  it("should add a chart entry under charts/ and hint recharts", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-chart-"));
    try {
      runCli(dir, ["init"]);
      const out = runCli(dir, ["add", "charts/line"]);
      expect(
        existsSync(join(dir, "src/components/ui/charts/line/index.ts")),
      ).toBe(true);
      // chart-line alias resolves to charts/line as well
      expect(out).toContain("recharts");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should add an animation entry under animations/ and hint framer-motion", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-animation-"));
    try {
      runCli(dir, ["init"]);
      const out = runCli(dir, ["add", "animations/fade-in"]);
      expect(
        existsSync(join(dir, "src/components/animations/fade-in/index.ts")),
      ).toBe(true);
      expect(
        existsSync(join(dir, "src/components/animations/shared/index.ts")),
      ).toBe(true);
      expect(out).toContain("framer-motion");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should add multiple components in one run", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-multi-"));
    try {
      runCli(dir, ["init"]);
      const out = runCli(dir, ["add", "buttons", "card", "badge"]);
      expect(
        existsSync(join(dir, "src/components/ui/buttons/button.tsx")),
      ).toBe(true);
      expect(existsSync(join(dir, "src/components/ui/card/card.tsx"))).toBe(
        true,
      );
      expect(existsSync(join(dir, "src/components/ui/badge/badge.tsx"))).toBe(
        true,
      );
      expect(out).toContain("Adding buttons…");
      expect(out).toContain("Adding badge…");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should print react-icons peer hint for components that use icons", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-peer-"));
    try {
      runCli(dir, ["init"]);
      const out = runCli(dir, ["add", "rating"]);
      expect(out).toContain("Optional peer dependencies");
      expect(out).toContain("react-icons");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should print Tailwind v4 source guidance after adding", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-tw-"));
    try {
      runCli(dir, ["init"]);
      const out = runCli(dir, ["add", "buttons"]);
      expect(out).toContain("Tailwind v4");
      expect(out).toContain("@source");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should generate compact global theme CSS", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-theme-"));
    try {
      const out = runCli(dir, ["theme", "#2563eb", "--dark", "#60a5fa"]);
      const tokenCount = (out.match(/^\s*--zui-/gm) ?? []).length;
      expect(out).toContain("Generated by zentauri-ui theme #2563eb");
      expect(out).toContain("--zui-brand: #2563eb;");
      expect(out).toContain("--zui-brand-dark: #60a5fa;");
      expect(out).toContain("--zui-color-blue: var(--zui-brand);");
      expect(out).toContain("--zui-color-blue-dark: var(--zui-brand-dark);");
      expect(out).not.toContain("--zui-button-default-bg:");
      expect(tokenCount).toBeLessThan(100);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should keep readable dark foreground when default dark brand stays dark", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-theme-dark-"));
    try {
      const out = runCli(dir, ["theme", "#020617"]);
      expect(out).toContain(
        "--zui-brand-dark: color-mix(in oklch, #020617 72%, #ffffff);",
      );
      expect(out).toContain("--zui-brand-fg-dark: #ffffff;");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should write compact theme CSS with a custom selector", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-theme-out-"));
    try {
      const out = runCli(dir, [
        "theme",
        "38bdf8",
        "--selector",
        "[data-theme='zentauri']",
        "--out",
        "src/styles/zentauri-theme.css",
      ]);
      const themePath = join(dir, "src/styles/zentauri-theme.css");
      expect(out).toContain("Wrote ");
      expect(out).toContain("zentauri-theme.css");
      const css = readFileSync(themePath, "utf8");
      expect(css).toContain("[data-theme='zentauri'] {");
      expect(css).toContain("--zui-brand: #38bdf8;");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("should not error when re-adding a component (existing files)", () => {
    const dir = mkdtempSync(join(tmpdir(), "zentauri-cli-reAdd-"));
    try {
      runCli(dir, ["init"]);
      runCli(dir, ["add", "buttons"]);
      // Second add over existing files must succeed and keep the design-system.
      expect(() => runCli(dir, ["add", "buttons"])).not.toThrow();
      expect(
        existsSync(join(dir, "src/components/design-system/button.ts")),
      ).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
