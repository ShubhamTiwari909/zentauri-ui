import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  InputGroup,
  InputGroupAction,
  InputGroupAddon,
  InputGroupInput,
} from "./index";

describe("InputGroup", () => {
  it("composes an input, addon, and action", () => {
    const action = vi.fn();
    render(
      <InputGroup appearance="glass" size="lg" className="custom">
        <InputGroupAddon>$</InputGroupAddon>
        <InputGroupInput aria-label="Price" />
        <InputGroupAction onClick={action}>Clear</InputGroupAction>
      </InputGroup>,
    );
    expect(screen.getByRole("textbox", { name: "Price" })).toBeInTheDocument();
    expect(screen.getByText("$")).toHaveAttribute(
      "data-slot",
      "input-group-addon",
    );
    expect(screen.getByRole("textbox").parentElement).toHaveClass("custom");
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(action).toHaveBeenCalledOnce();
  });
  it("disables nested controls", () => {
    render(
      <InputGroup disabled>
        <InputGroupInput aria-label="Price" />
        <InputGroupAction>Clear</InputGroupAction>
      </InputGroup>,
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
