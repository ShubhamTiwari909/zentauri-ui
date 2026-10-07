import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ts from "typescript";
import * as toolbar from "@zentauri-ui/zentauri-components/ui/toolbar";
import * as buttons from "@zentauri-ui/zentauri-components/ui/buttons";
import { ToolbarPlayground } from "./toolbar-playground";
import { ToolbarFormattingDemo } from "./toolbar-code-examples-demo";
import {
  TOOLBAR_APPEARANCES,
  TOOLBAR_DEFAULT_OPTIONS,
} from "./toolbar-code-examples.data";
import * as snippets from "./toolbar-code-examples.snippets";
import { toolbarCssVariables } from "@/components/css-variables/data/toolbar";
vi.mock("@/components/code-showcase/PreviewCodeShowcase", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

function loadRecipe(snippet: string): React.ComponentType {
  const result = ts.transpileModule(snippet, {
    fileName: "recipe.tsx",
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  expect(result.diagnostics).toEqual([]);
  const exports: Record<string, React.ComponentType> = {};
  const dependencies: Record<string, unknown> = {
    react: React,
    "react/jsx-runtime": jsxRuntime,
    "@zentauri-ui/zentauri-components/ui/toolbar": toolbar,
    "@zentauri-ui/zentauri-components/ui/buttons": buttons,
  };
  new Function("require", "exports", result.outputText)((name: string) => {
    if (!(name in dependencies))
      throw new Error(`Unexpected dependency ${name}`);
    return dependencies[name];
  }, exports);
  return Object.values(exports)[0]!;
}

describe("Toolbar preview", () => {
  it("changes orientation and direction through the library Select UI", async () => {
    render(<ToolbarPlayground />);
    fireEvent.click(screen.getByRole("combobox", { name: "Orientation" }));
    fireEvent.click(screen.getByRole("option", { name: "vertical" }));
    const root = screen.getByRole("toolbar", { name: "Playground commands" });
    expect(root).toHaveAttribute("aria-orientation", "vertical");
    fireEvent.click(screen.getByRole("combobox", { name: "Direction" }));
    fireEvent.click(screen.getByRole("option", { name: "rtl" }));
    expect(root).toHaveAttribute("dir", "rtl");
    expect(root).not.toHaveAttribute("disableExport");
  });
  it("changes states and appearances, then resets both controls and local demo state", async () => {
    const user = userEvent.setup();
    const { container } = render(<ToolbarPlayground />);
    const commands = within(
      screen.getByRole("toolbar", { name: "Playground commands" }),
    );
    await user.click(commands.getByRole("button", { name: "Bold" }));
    expect(commands.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(screen.getByRole("checkbox", { name: "Disable Export" }));
    expect(commands.getByRole("button", { name: "Export" })).toBeDisabled();
    await user.click(screen.getByRole("checkbox", { name: "Disable toolbar" }));
    expect(commands.getByRole("button", { name: "Save" })).toBeDisabled();
    const contrast = screen.getByRole("button", {
      name: "Select contrast appearance",
    });
    contrast.focus();
    await user.keyboard(" ");
    expect(contrast).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("toolbar", { name: "Playground commands" }).className,
    ).toContain("--zui-toolbar-contrast-bg");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    const reset = within(
      screen.getByRole("toolbar", { name: "Playground commands" }),
    );
    expect(reset.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(reset.getByRole("button", { name: "Export" })).not.toBeDisabled();
    expect(
      screen.getAllByRole("button", { name: /^Select .* appearance$/ }),
    ).toHaveLength(TOOLBAR_APPEARANCES.length);
    expect(
      container.querySelector("button button, button a, button select"),
    ).toBeNull();
  });
  it("applies formatting without activating toggles during arrow navigation", async () => {
    const user = userEvent.setup();
    render(<ToolbarFormattingDemo />);
    await user.tab();
    await user.keyboard("{ArrowRight}");
    const italic = screen.getByRole("button", { name: "Italic" });
    expect(italic).toHaveFocus();
    expect(italic).toHaveAttribute("aria-pressed", "false");
    await user.keyboard(" ");
    expect(italic).toHaveAttribute("aria-pressed", "true");
    const root = screen.getByRole("toolbar");
    const content = document.getElementById(
      root.getAttribute("aria-controls")!,
    );
    expect(content).toHaveStyle({ fontStyle: "italic" });
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("status")).toHaveTextContent("Formatting saved.");
  });
  it("inventories every light/dark token and appearance", () => {
    const source = readFileSync(
      resolve(
        process.cwd(),
        "../../packages/components/src/design-system/toolbar.ts",
      ),
      "utf8",
    );
    const names = new Set(source.match(/--zui-toolbar-[\w-]+/g));
    const documented = new Set(
      [
        ...toolbarCssVariables.lightVariables,
        ...toolbarCssVariables.darkExamples,
      ].map(([name]) => `--zui-${name}`),
    );
    expect(documented).toEqual(names);
    expect(toolbarCssVariables.darkVariableCount).toBe(
      toolbarCssVariables.darkExamples.length,
    );
    expect(TOOLBAR_APPEARANCES).toEqual(
      Object.keys(readToolbarAppearances(source)),
    );
  });
  it.each([
    ["actions", snippets.toolbarActionsDemoSnippet],
    ["formatting", snippets.toolbarFormattingDemoSnippet],
    ["vertical", snippets.toolbarVerticalDemoSnippet],
    ["composition", snippets.toolbarCompositionDemoSnippet],
    ["playground", snippets.toolbarPlaygroundSnippet(TOOLBAR_DEFAULT_OPTIONS)],
  ])(
    "renders the copied %s recipe and moves focus through its managed items",
    async (_name, code) => {
      const Recipe = loadRecipe(code);
      const user = userEvent.setup();
      const { container } = render(
        <>
          <Recipe />
          <Recipe />
        </>,
      );
      const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
      expect(new Set(ids).size).toBe(ids.length);
      const roots = screen.getAllByRole("toolbar");
      for (const root of roots) {
        const items = [
          ...root.querySelectorAll<HTMLElement>("[data-toolbar-item]"),
        ].filter(
          (el) =>
            !el.matches(":disabled") &&
            el.getAttribute("aria-disabled") !== "true",
        );
        expect(items.filter((el) => el.tabIndex === 0)).toHaveLength(1);
        items[0]!.focus();
        await user.keyboard(
          root.getAttribute("aria-orientation") === "vertical"
            ? "{ArrowDown}"
            : "{ArrowRight}",
        );
        expect(items[1]).toHaveFocus();
      }
    },
  );
});
function readToolbarAppearances(source: string) {
  const declaration = source.slice(
    source.indexOf("export const zuiToolbarAppearances"),
  );
  const keys = [...declaration.matchAll(/^\s{2}(?:"([^"]+)"|(\w+)):/gm)].map(
    (match) => match[1] ?? match[2],
  );
  return Object.fromEntries(keys.map((key) => [key, true]));
}
