import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import ts from "typescript";
import { expect, it, vi } from "vitest";
import { DesignSystem } from "@zentauri-ui/zentauri-components/design-system/facade";
import { electricBorderCssVariables } from "@/components/css-variables/data/electric-border";
import { appearances } from "./components/electric-border-code-examples.data";
import { electricBorderSnippet } from "./components/electric-border-code-examples.snippets";
import { ElectricBorderPlayground } from "./sections/playground";

vi.mock("@/components/code-showcase/PreviewCodeShowcase", () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

it("documents every appearance and every light/dark token actually shipped", () => {
  const component = DesignSystem.getComponent("electric-border")!;
  expect([...appearances].sort()).toEqual(component.appearances().sort());
  const reference = electricBorderCssVariables;
  const documented = [...reference.lightVariables, ...reference.darkExamples]
    .map(([name]) => `--zui-${name}`)
    .sort();
  expect(documented).toEqual(
    component
      .variables()
      .map(({ name }) => name)
      .sort(),
  );
  expect(reference.darkVariableCount).toBe(reference.darkExamples.length);
  expect(reference.darkVariableCount).toBe(reference.lightVariables.length);
});

it("wires configuration, reset, and keyboard-accessible appearance selectors to the live preview", async () => {
  const user = userEvent.setup();
  render(<ElectricBorderPlayground />);
  const getFrame = () =>
    screen
      .getByTestId("electric-playground-preview")
      .querySelector<HTMLElement>('[data-slot="electric-border"]')!;
  const choose = screen.getByRole("button", {
    name: "Use gradient-blue appearance",
  });
  choose.focus();
  await user.keyboard("{Enter}");
  expect(choose).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByLabelText("Appearance")).toHaveValue("gradient-blue");
  expect(getFrame().className).toContain(
    "--zui-electric-border-gradient-blue-color,",
  );
  fireEvent.change(screen.getByLabelText(/Radius/), {
    target: { value: "48" },
  });
  expect(getFrame().style.getPropertyValue("--_eb-radius")).toBe("48px");
  await user.click(screen.getByRole("button", { name: "Reset controls" }));
  expect(screen.getByLabelText("Appearance")).toHaveValue("default");
  expect(getFrame().style.getPropertyValue("--_eb-radius")).toBe("24px");
  expect(
    screen.getAllByRole("button", { name: /^Use .* appearance$/ }),
  ).toHaveLength(appearances.length);
});

it("emits valid TSX while preserving zero, false, quoted strings, and styles", () => {
  const className = 'before:content-["{current}"]\npath\\name';
  const snippet = electricBorderSnippet({
    speed: 0,
    active: false,
    className,
    style: { opacity: 0 },
  });
  expect(snippet).toContain("speed={0}");
  expect(snippet).toContain("active={false}");
  expect(snippet).toContain(`className={${JSON.stringify(className)}}`);
  expect(snippet).toContain('style={{"opacity":0}}');
  const compiled = ts.transpileModule(snippet, {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
    reportDiagnostics: true,
    fileName: "example.tsx",
  });
  expect(compiled.diagnostics).toEqual([]);
});
