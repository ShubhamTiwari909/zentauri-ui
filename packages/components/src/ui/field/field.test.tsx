import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field, Fieldset } from "./index";

describe("Field", () => {
  it("associates label, description, error, and required state with a native control", () => {
    render(
      <Field label="Amount" description="In USD" error="Too low" required>
        {(props) => <input {...props} />}
      </Field>,
    );
    const input = screen.getByRole("textbox", { name: /Amount/ });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toHaveLength(2);
    expect(screen.getByText("In USD")).toHaveAttribute("id");
    expect(screen.getByText("Too low")).toHaveAttribute("id");
  });
  it("retains valid zero content and supports appearances", () => {
    render(
      <Field label={0} description={0} appearance="glass" className="custom">
        {(props) => <input {...props} />}
      </Field>,
    );
    expect(screen.getAllByText("0")).toHaveLength(2);
    expect(screen.getByRole("textbox")).toHaveAttribute("id");
    expect(
      screen.getByText("0", { selector: "label" }).parentElement,
    ).toHaveClass("custom");
  });
  it("groups controls under a legend", () => {
    render(
      <Fieldset legend="Preferences" description="Choose one">
        <input aria-label="Email" />
      </Fieldset>,
    );
    expect(screen.getByRole("group", { name: "Preferences" })).toContainElement(
      screen.getByRole("textbox"),
    );
  });
});
