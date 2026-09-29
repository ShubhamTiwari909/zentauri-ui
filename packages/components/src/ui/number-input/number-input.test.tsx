import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NumberInput } from "./index";

describe("NumberInput", () => {
  it("steps, clamps, and exposes spinbutton semantics", () => {
    const onValueChange = vi.fn();
    render(
      <NumberInput
        aria-label="Quantity"
        defaultValue={1}
        min={0}
        max={2}
        step={0.5}
        onValueChange={onValueChange}
      />,
    );
    const control = screen.getByRole("spinbutton", { name: "Quantity" });
    fireEvent.click(screen.getByRole("button", { name: "Increase value" }));
    expect(control).toHaveValue("1.5");
    fireEvent.keyDown(control, { key: "ArrowUp" });
    expect(control).toHaveValue("2");
    expect(
      screen.getByRole("button", { name: "Increase value" }),
    ).toBeDisabled();
    expect(onValueChange).toHaveBeenLastCalledWith(2);
  });
  it("preserves partial decimal input and restores invalid drafts on blur", () => {
    render(<NumberInput aria-label="Amount" defaultValue={2} />);
    const control = screen.getByRole("spinbutton");
    fireEvent.input(control, { target: { value: "3." } });
    expect(control).toHaveValue("3.");
    fireEvent.blur(control);
    expect(control).toHaveValue("3");
    fireEvent.input(control, { target: { value: "-" } });
    fireEvent.blur(control);
    expect(control).toHaveValue("3");
  });
  it("supports controlled empty values and disabling", () => {
    render(<NumberInput aria-label="Amount" value={null} disabled />);
    expect(screen.getByRole("spinbutton")).toHaveValue("");
    expect(
      screen
        .getAllByRole("button")
        .every((button) => button.hasAttribute("disabled")),
    ).toBe(true);
  });
});
