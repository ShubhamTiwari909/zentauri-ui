import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { CssVariableReferenceSection } from "./reference-section";
import { glassCardCssVariables } from "./data/glass-card";

vi.mock("@/components/CodeHighlight", () => ({
  default: ({ codeString }: { codeString: string }) => (
    <pre data-testid="css-code">{codeString}</pre>
  ),
}));

it("reports omitted dark overrides even when the inventory includes every token", () => {
  render(
    <CssVariableReferenceSection canonicalPath="/preview/components/glass-card" />,
  );
  const code = screen.getByTestId("css-code").textContent!;
  expect(glassCardCssVariables.darkVariableCount).toBe(
    glassCardCssVariables.lightVariables.length,
  );
  expect(code.match(/--zui-glass-card-[\w-]+-dark:/g)).toHaveLength(2);
  expect(code).toContain("...same variables with -dark at the end");
  expect(screen.getByText("44 variables")).toBeInTheDocument();
});
