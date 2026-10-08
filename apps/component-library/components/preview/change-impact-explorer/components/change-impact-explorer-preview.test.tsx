import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ts from "typescript";
import * as impact from "@zentauri-ui/zentauri-components/ui/change-impact-explorer";
import { ImpactPlayground } from "./change-impact-explorer-playground";
import {
  IMPACT_APPEARANCES,
  IMPACT_DEFAULT_OPTIONS,
} from "./change-impact-explorer-code-examples.data";
import * as snippets from "./change-impact-explorer-code-examples.snippets";
import { changeImpactExplorerCssVariables } from "@/components/css-variables/data/change-impact-explorer";
vi.mock("@/components/code-showcase/PreviewCodeShowcase", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
function loadRecipe(source: string) {
  const result = ts.transpileModule(source, {
    fileName: "recipe.tsx",
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  expect(result.diagnostics).toEqual([]);
  const dependencies: Record<string, unknown> = {
    react: React,
    "react/jsx-runtime": jsxRuntime,
    "@zentauri-ui/zentauri-components/ui/change-impact-explorer": impact,
  };
  const exports: Record<string, React.ComponentType> = {};
  new Function("require", "exports", result.outputText)((name: string) => {
    if (!(name in dependencies)) throw new Error(`Unknown dependency ${name}`);
    return dependencies[name];
  }, exports);
  return Object.values(exports)[0]!;
}
describe("Change Impact Explorer preview", () => {
  it("updates appearance, dataset, direction, states, and resets the playground", async () => {
    render(<ImpactPlayground />);
    const user = userEvent.setup();
    fireEvent.click(screen.getByRole("combobox", { name: "Direction" }));
    fireEvent.click(screen.getByRole("option", { name: "upstream" }));
    const main = within(
      screen.getAllByRole("region", { name: "Change impact explorer" })[0]!,
    );
    expect(
      main.getByRole("heading", { name: "Dependencies" }),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Select contrast appearance" }),
    );
    expect(
      screen.getAllByRole("region", { name: "Change impact explorer" })[0]!
        .className,
    ).toContain("contrast-bg");
    fireEvent.click(screen.getByRole("combobox", { name: "Direction" }));
    fireEvent.click(screen.getByRole("option", { name: "downstream" }));
    fireEvent.click(screen.getByRole("combobox", { name: "Dataset" }));
    fireEvent.click(screen.getByRole("option", { name: "10000" }));
    expect(main.getByText("10000 results")).toBeInTheDocument();
    expect(main.getByRole("listbox")).toHaveAttribute(
      "data-virtualized",
      "true",
    );
    fireEvent.click(screen.getByRole("combobox", { name: "State" }));
    fireEvent.click(screen.getByRole("option", { name: "error" }));
    expect(main.getByRole("alert")).toHaveTextContent("could not be loaded");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      screen.getByRole("combobox", { name: "Direction" }),
    ).toHaveTextContent("downstream");
    expect(
      within(
        screen.getAllByRole("region", { name: "Change impact explorer" })[0]!,
      ).queryByRole("alert"),
    ).not.toBeInTheDocument();
  });
  it("keeps all gallery samples inert and every appearance selector keyboard accessible", () => {
    const { container } = render(<ImpactPlayground />);
    const selectors = screen.getAllByRole("button", {
      name: /^Select .* appearance$/,
    });
    expect(selectors).toHaveLength(IMPACT_APPEARANCES.length);
    expect(
      container.querySelectorAll("[data-impact-gallery] [inert]"),
    ).toHaveLength(IMPACT_APPEARANCES.length);
    expect(
      container.querySelector("button button, button select, button input"),
    ).toBeNull();
  });
  it("documents the complete light/dark token inventory and supported palettes", () => {
    const source = readFileSync(
      resolve(
        process.cwd(),
        "../../packages/components/src/design-system/change-impact-explorer.ts",
      ),
      "utf8",
    );
    const names = new Set(source.match(/--zui-change-impact-explorer-[\w-]+/g));
    const documented = new Set(
      [
        ...changeImpactExplorerCssVariables.lightVariables,
        ...changeImpactExplorerCssVariables.darkExamples,
      ].map(([name]) => `--zui-${name}`),
    );
    expect(documented).toEqual(names);
    expect(changeImpactExplorerCssVariables.darkVariableCount).toBe(
      changeImpactExplorerCssVariables.lightVariables.length,
    );
    expect(IMPACT_APPEARANCES).toHaveLength(26);
  });
  it.each([
    ["basic", snippets.impactBasicSnippet],
    ["controlled", snippets.impactControlledSnippet],
    ["upstream", snippets.impactUpstreamSnippet],
    ["large", snippets.impactLargeSnippet],
    ["playground", snippets.impactPlaygroundSnippet(IMPACT_DEFAULT_OPTIONS)],
    [
      "empty playground",
      snippets.impactPlaygroundSnippet({
        ...IMPACT_DEFAULT_OPTIONS,
        dataset: "10000",
        state: "empty",
      }),
    ],
  ])(
    "renders the copied %s recipe without missing imports or duplicate IDs",
    (_name, source) => {
      const Recipe = loadRecipe(source);
      const { container } = render(
        <>
          <Recipe />
          <Recipe />
        </>,
      );
      const ids = [...container.querySelectorAll("[id]")].map(
        (item) => item.id,
      );
      expect(new Set(ids).size).toBe(ids.length);
      if (_name !== "empty playground")
        expect(screen.getAllByRole("listbox")).toHaveLength(2);
      else expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      if (_name === "basic" || _name === "controlled" || _name === "playground")
        expect(
          within(screen.getAllByRole("listbox")[0]!).getAllByRole("option"),
        ).toHaveLength(6);
      if (_name === "controlled") {
        fireEvent.change(
          screen.getAllByRole("combobox", { name: "Proposed change" })[0]!,
          { target: { value: "docs" } },
        );
        expect(
          within(
            screen.getAllByRole("region", { name: "Item details" })[0]!,
          ).getByRole("heading", { name: "Integration guide" }),
        ).toBeInTheDocument();
      }
      if (_name === "large")
        expect(
          container.querySelectorAll(
            '[data-slot="change-impact-explorer-item"]',
          ).length,
        ).toBeLessThan(60);
    },
  );
});
