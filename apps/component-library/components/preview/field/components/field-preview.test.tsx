import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import * as reactDom from "react-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ts from "typescript";
import * as fields from "@zentauri-ui/zentauri-components/ui/field";
import * as inputs from "@zentauri-ui/zentauri-components/ui/inputs";
import * as checkbox from "@zentauri-ui/zentauri-components/ui/checkbox";
import * as grid from "@zentauri-ui/zentauri-components/ui/grid";
import * as select from "@zentauri-ui/zentauri-components/ui/select";
import { FieldPlayground } from "./field-playground";
import { FieldFormDemo, FieldSelectDemo } from "./field-code-examples-demo";
import {
  FIELD_APPEARANCES,
  FIELD_DEFAULT_OPTIONS,
} from "./field-code-examples.data";
import * as snippets from "./field-code-examples.snippets";
import { fieldCssVariables } from "@/components/css-variables/data/field";

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
    "react-dom": reactDom,
    "@zentauri-ui/zentauri-components/ui/field": fields,
    "@zentauri-ui/zentauri-components/ui/inputs": inputs,
    "@zentauri-ui/zentauri-components/ui/checkbox": checkbox,
    "@zentauri-ui/zentauri-components/ui/grid": grid,
    "@zentauri-ui/zentauri-components/ui/select": select,
  };
  new Function("require", "exports", result.outputText)((name: string) => {
    if (!(name in dependencies))
      throw new Error(`Unexpected dependency ${name}`);
    return dependencies[name];
  }, exports);
  return Object.values(exports)[0]!;
}

describe("Field preview", () => {
  it("submits only valid email and focuses the failed control", async () => {
    const user = userEvent.setup();
    render(<FieldFormDemo />);
    const input = screen.getByRole("textbox", { name: "Contact email" });
    const focusDescriptions: string[] = [];
    input.addEventListener("focus", () => {
      focusDescriptions.push(
        (input.getAttribute("aria-describedby") ?? "")
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent ?? "")
          .join(" "),
      );
    });
    await user.click(screen.getByRole("button", { name: "Save contact" }));
    expect(focusDescriptions[0]).toContain("Enter your email address.");
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Enter your email address.")).toBeVisible();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(input).toHaveAccessibleDescription(
      "Try submitting an empty or invalid address. Enter your email address.",
    );
    await user.type(input, "invalid");
    await user.click(screen.getByRole("button", { name: "Save contact" }));
    expect(screen.getByText("Enter a valid email address.")).toBeVisible();
    await user.clear(input);
    await user.type(input, "ada@example.com");
    await user.click(screen.getByRole("button", { name: "Save contact" }));
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Saved contact for ada@example.com.",
    );
  });
  it.each(["live", "copied"] as const)(
    "submits only the selected team in the %s recipe",
    async (kind) => {
      const Recipe =
        kind === "live"
          ? FieldSelectDemo
          : loadRecipe(snippets.fieldSelectDemoSnippet);
      const user = userEvent.setup();
      render(
        <form aria-label="Team selection">
          <Recipe />
        </form>,
      );
      const trigger = screen.getByRole("combobox", { name: "Team" });
      await user.click(trigger);
      expect(screen.getByRole("listbox")).toHaveAttribute(
        "aria-multiselectable",
        "false",
      );
      await user.click(screen.getByRole("option", { name: "Design" }));
      await user.click(trigger);
      await user.click(screen.getByRole("option", { name: "Engineering" }));
      const form = screen.getByRole("form", {
        name: "Team selection",
      }) as HTMLFormElement;
      expect(new FormData(form).getAll("team")).toEqual(["engineering"]);
      expect(trigger).toHaveTextContent("Engineering");
      expect(trigger).not.toHaveTextContent("Design");
    },
  );

  it("changes states, selects appearances and resets the live field", async () => {
    const user = userEvent.setup();
    const { container } = render(<FieldPlayground />);
    const demo = within(
      container.querySelector("[data-field-playground]")! as HTMLElement,
    );
    const control = demo.getByRole("textbox", { name: "Project name" });
    await user.click(screen.getByRole("checkbox", { name: "Invalid" }));
    expect(control).toHaveAttribute("aria-invalid", "true");
    await user.click(screen.getByRole("checkbox", { name: "Disabled" }));
    expect(control).toBeDisabled();
    const button = screen.getByRole("button", {
      name: "Select contrast appearance",
    });
    button.focus();
    await user.keyboard(" ");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(control.closest('[data-slot="field"]')!.className).toContain(
      "--zui-field-contrast-bg",
    );
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(control).not.toBeDisabled();
    expect(control).not.toHaveAttribute("aria-invalid");
    expect(control).toBeRequired();
    expect(
      screen.getAllByRole("button", { name: /^Select .* appearance$/ }),
    ).toHaveLength(FIELD_APPEARANCES.length);
    expect(
      container.querySelector("button input, button select, button button"),
    ).toBeNull();
  });
  it("uses the existing Select UI to change orientation and control type", async () => {
    render(<FieldPlayground />);
    fireEvent.click(screen.getByRole("combobox", { name: "Orientation" }));
    fireEvent.click(screen.getByRole("option", { name: "responsive" }));
    expect(
      screen
        .getByRole("textbox", { name: "Project name" })
        .closest('[data-slot="field"]'),
    ).toHaveAttribute("data-orientation", "responsive");
    fireEvent.click(screen.getByRole("combobox", { name: "Control" }));
    fireEvent.click(screen.getByRole("option", { name: "select" }));
    expect(screen.getByRole("combobox", { name: "Project name" })).toHaveValue(
      "",
    );
  });
  it("documents every light/dark token and every shipped appearance", () => {
    const source = readFileSync(
      resolve(
        process.cwd(),
        "../../packages/components/src/design-system/field.ts",
      ),
      "utf8",
    );
    const names = [
      ...new Set(
        [...source.matchAll(/--zui-(field-[\w-]+)/g)].map((m) => m[1]),
      ),
    ];
    const light = names.filter((name) => !name.endsWith("-dark")).sort();
    const dark = names.filter((name) => name.endsWith("-dark")).sort();
    expect(
      fieldCssVariables.lightVariables.map(([name]) => name).sort(),
    ).toEqual(light);
    expect(fieldCssVariables.darkExamples.map(([name]) => name).sort()).toEqual(
      dark,
    );
    expect(fieldCssVariables.darkVariableCount).toBe(dark.length);
    const appearance = fields.fieldVariants({ appearance: "glass" });
    expect(appearance).toContain("--zui-field-glass-blur-dark");
  });
  it("keeps default description contrast readable on solid appearance surfaces", () => {
    const tokens = Object.fromEntries([
      ...fieldCssVariables.lightVariables,
      ...fieldCssVariables.darkExamples,
    ]);
    const rgb = (value: string) =>
      [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
    const luminance = (values: number[]) =>
      values
        .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
        .reduce(
          (sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i]!,
          0,
        );
    for (const appearance of FIELD_APPEARANCES) {
      for (const suffix of ["", "-dark"]) {
        const foreground = tokens[`field-${appearance}-fg${suffix}`];
        const background = tokens[`field-${appearance}-bg${suffix}`];
        // Transparent and gradient materials depend on their enclosing surface.
        if (
          !background?.match(/^#[0-9a-f]{6}$/i) ||
          !foreground?.match(/^#[0-9a-f]{6}$/i)
        )
          continue;
        const opacity = Number(tokens[`field-description-opacity${suffix}`]);
        const bg = rgb(background);
        const description = rgb(foreground).map(
          (value, i) => opacity * value + (1 - opacity) * bg[i]!,
        );
        const levels = [luminance(description), luminance(bg)].sort(
          (a, b) => a - b,
        );
        expect(
          (levels[1]! + 0.05) / (levels[0]! + 0.05),
          `${appearance}${suffix} description`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("keeps copied recipes runnable with unique ids across repeated instances", () => {
    const recipes = [
      snippets.fieldBasicDemoSnippet,
      snippets.fieldFormDemoSnippet,
      snippets.fieldGridDemoSnippet,
      snippets.fieldChoicesDemoSnippet,
      snippets.fieldSelectDemoSnippet,
      snippets.fieldPlaygroundSnippet(FIELD_DEFAULT_OPTIONS),
      snippets.fieldPlaygroundSnippet({
        ...FIELD_DEFAULT_OPTIONS,
        control: "select",
        invalid: true,
        orientation: "responsive",
      }),
      snippets.fieldPlaygroundSnippet({
        ...FIELD_DEFAULT_OPTIONS,
        control: "textarea",
        disabled: true,
      }),
    ];
    const components = recipes.map(loadRecipe);
    const { container } = render(
      <>
        {components.map((Recipe, index) => (
          <React.Fragment key={index}>
            <Recipe />
            <Recipe />
          </React.Fragment>
        ))}
      </>,
    );
    const nodes = [...container.querySelectorAll("[id]")];
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    for (const label of container.querySelectorAll("label[for]"))
      expect(
        document.getElementById(label.getAttribute("for")!),
      ).not.toBeNull();
    for (const control of container.querySelectorAll("[aria-describedby]"))
      for (const id of control.getAttribute("aria-describedby")!.split(" "))
        expect(document.getElementById(id)).not.toBeNull();
  });
});
