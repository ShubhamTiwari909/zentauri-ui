import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("should expose displayName", () => {
    expect(Checkbox.displayName).toBe("Checkbox");
  });

  it("should stamp data-slot", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(document.querySelector('[data-slot="checkbox"]')).toBeTruthy();
  });

  it("should use accessible label content", () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(
      screen.getByRole("checkbox", { name: "Accept terms" }),
    ).toBeInTheDocument();
  });

  it("should call onCheckedChange when toggled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox defaultChecked={false} onCheckedChange={onCheckedChange}>
        Marketing emails
      </Checkbox>,
    );

    await user.click(
      screen.getByRole("checkbox", { name: "Marketing emails" }),
    );
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });

  it("should expose mixed state when indeterminate", () => {
    render(<Checkbox indeterminate aria-label="Select partial group" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "mixed",
    );
  });

  it("should forward ref to the input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Remember me" />);
    expect(ref.current?.getAttribute("data-slot")).toBe("checkbox");
  });
});
