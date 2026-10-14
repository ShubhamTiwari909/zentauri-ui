import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  cmdAdd,
  cmdInit,
  cmdTheme,
  defaultConfig,
  importPathFor,
  normalizeHexColor,
  resolveComponentName,
  resolveHookName,
  validateConfig,
} from "./index.mjs";

type TestRegistry = Parameters<typeof resolveComponentName>[1] &
  Parameters<typeof resolveHookName>[1];

function makeTempDir(prefix: string) {
  return mkdtempSync(join(tmpdir(), prefix));
}

function silenceConsole() {
  const logs: string[] = [];
  const errors: string[] = [];

  vi.spyOn(console, "log").mockImplementation((...args) => {
    logs.push(args.join(" "));
  });
  vi.spyOn(console, "error").mockImplementation((...args) => {
    errors.push(args.join(" "));
  });

  return { errors, logs };
}

describe("CLI module commands", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    process.exitCode = undefined;
  });

  it("resolves aliases, hooks, imports, hex colors, and config validation", () => {
    const registry: TestRegistry = {
      components: ["buttons", "card", "charts/line"],
      hooks: ["useWindowSize"],
      nameAliases: { button: "buttons" },
      animatedComponents: ["buttons", "spinner"],
      uiComponents: ["buttons", "card"],
    };

    expect(resolveComponentName("button", registry)).toBe("buttons");
    expect(resolveComponentName("CARD", registry)).toBe("card");
    expect(resolveHookName("usewindowsize", registry)).toBe("useWindowSize");
    expect(importPathFor("useWindowSize", "hook", registry)).toBe(
      "@zentauri-ui/zentauri-components/hooks/useWindowSize",
    );
    expect(importPathFor("charts/line", "component", registry)).toBe(
      "@zentauri-ui/zentauri-components/charts/line",
    );
    expect(importPathFor("spinner", "component", registry)).toBe(
      "@zentauri-ui/zentauri-components/ui/spinner/animated",
    );
    expect(normalizeHexColor("38b")).toBe("#3388bb");
    expect(() => validateConfig(defaultConfig())).not.toThrow();
    expect(() => resolveComponentName("missing", registry)).toThrow(
      /Unknown component/,
    );
    expect(() => normalizeHexColor("not-a-color")).toThrow(
      /Invalid brand color/,
    );
  });

  it("initializes components.json with framework-aware guidance", async () => {
    const dir = makeTempDir("zentauri-cli-module-init-");
    const { errors, logs } = silenceConsole();

    try {
      writeFileSync(
        join(dir, "package.json"),
        JSON.stringify({ dependencies: { next: "16.0.0" } }),
      );

      await cmdInit(dir);

      expect(existsSync(join(dir, "components.json"))).toBe(true);
      expect(
        JSON.parse(readFileSync(join(dir, "components.json"), "utf8")),
      ).toEqual(defaultConfig());
      expect(logs.join("\n")).toContain("Detected framework: Next.js");
      expect(logs.join("\n")).toContain('@source "./src/components/ui";');

      await cmdInit(dir);

      expect(process.exitCode).toBe(1);
      expect(errors.join("\n")).toContain("Refusing to overwrite existing");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("vendors components, animated entries, design tokens, and transitive hooks", async () => {
    const dir = makeTempDir("zentauri-cli-module-add-");
    const { logs } = silenceConsole();

    try {
      await cmdInit(dir);
      await cmdAdd(["button"], dir);
      await cmdAdd(["hook", "usePrefersReducedMotion"], dir);
      await cmdAdd(["button"], dir, { animated: true });

      expect(
        existsSync(join(dir, "src/components/ui/buttons/button.tsx")),
      ).toBe(true);
      expect(
        existsSync(join(dir, "src/components/ui/buttons/animated/index.ts")),
      ).toBe(true);
      expect(
        existsSync(join(dir, "src/components/design-system/button.ts")),
      ).toBe(true);
      expect(
        existsSync(join(dir, "src/components/design-system/tokens.ts")),
      ).toBe(true);
      expect(
        existsSync(
          join(
            dir,
            "src/hooks/usePrefersReducedMotion/usePrefersReducedMotion.ts",
          ),
        ),
      ).toBe(true);
      expect(
        existsSync(join(dir, "src/hooks/useMediaQuery/useMediaQuery.ts")),
      ).toBe(true);
      expect(
        readFileSync(
          join(dir, "src/components/ui/buttons/button-base.tsx"),
          "utf8",
        ),
      ).toContain('from "@/lib/utils"');
      expect(logs.join("\n")).toContain("Including animated entry for buttons");
      expect(logs.join("\n")).toContain("Missing peer dependencies");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("vendors the complete typography foundation with its public exports and token source", async () => {
    const dir = makeTempDir("zentauri-cli-typography-");
    silenceConsole();
    try {
      await cmdInit(dir);
      await cmdAdd(["typography"], dir);
      const entry = readFileSync(
        join(dir, "src/components/ui/typography/index.ts"),
        "utf8",
      );
      for (const name of [
        "Strong",
        "Emphasis",
        "Small",
        "VisuallyHidden",
        "Prose",
        "TextLink",
        "DescriptionList",
        "Mark",
        "HighlightText",
        "TruncateText",
        "ExpandableText",
        "NumberText",
      ]) {
        expect(entry).toMatch(new RegExp(`\\b${name}\\b`));
      }
      expect(
        readFileSync(
          join(dir, "src/components/ui/typography/text-base.tsx"),
          "utf8",
        ),
      ).toContain('from "@/lib/utils"');
      const tokens = readFileSync(
        join(dir, "src/components/design-system/typography.ts"),
        "utf8",
      );
      const overflow = readFileSync(
        join(dir, "src/hooks/useTextOverflow/useTextOverflow.ts"),
        "utf8",
      );
      expect(overflow).toContain("export function useTextOverflow");
      const numbers = readFileSync(
        join(dir, "src/hooks/useNumberFormat/useNumberFormat.ts"),
        "utf8",
      );
      expect(numbers).toContain("export function useNumberFormat");
      const numberText = readFileSync(
        join(dir, "src/components/ui/typography/number-text-base.tsx"),
        "utf8",
      );
      expect(numberText).toContain('from "@/hooks/useNumberFormat"');
      expect(numberText).not.toContain("framer-motion");
      expect(
        existsSync(join(dir, "src/hooks/useControllableState/index.ts")),
      ).toBe(true);
      const disclosure = readFileSync(
        join(dir, "src/components/ui/typography/expandable-text-base.tsx"),
        "utf8",
      );
      expect(disclosure).toContain('from "@/hooks/useTextOverflow"');
      expect(disclosure).not.toContain("../../hooks/");
      expect(tokens).toContain("--zui-typography-font-body");
      expect(tokens).toContain("--zui-typography-font-body-dark");
      expect(
        existsSync(
          join(dir, "src/components/ui/typography/visually-hidden-base.tsx"),
        ),
      ).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("generates theme CSS to stdout or a requested file", async () => {
    const dir = makeTempDir("zentauri-cli-module-theme-");
    const { errors, logs } = silenceConsole();

    try {
      await cmdTheme("#2563eb", { dark: "#60a5fa" }, dir);
      expect(logs.join("\n")).toContain("--zui-brand: #2563eb;");
      expect(logs.join("\n")).toContain("--zui-brand-dark: #60a5fa;");

      await cmdTheme("38bdf8", { out: "src/styles/zentauri-theme.css" }, dir);
      const themePath = join(dir, "src/styles/zentauri-theme.css");
      expect(existsSync(themePath)).toBe(true);
      expect(readFileSync(themePath, "utf8")).toContain(
        "--zui-brand: #38bdf8;",
      );

      await cmdTheme("", {}, dir);
      expect(process.exitCode).toBe(1);
      expect(errors.join("\n")).toContain("Usage: zentauri-components theme");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
