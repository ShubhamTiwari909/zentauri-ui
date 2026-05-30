import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Rating } from "./rating";

describe("Rating", () => {
  it("should expose displayName", () => {
    expect(Rating.displayName).toBe("Rating");
  });

  it("should stamp data slots and render the requested number of controls", () => {
    render(<Rating label="Product score" max={4} />);

    expect(document.querySelector('[data-slot="rating"]')).toBeTruthy();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
  });

  it("should render half-step radio options when allowHalf is enabled", () => {
    render(<Rating allowHalf label="Product score" max={3} />);

    expect(screen.getAllByRole("radio")).toHaveLength(6);
    expect(screen.getByLabelText("2.5 of 3")).toBeInTheDocument();
  });

  it("should support uncontrolled value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Rating label="Product score" onValueChange={onValueChange} />);

    await user.click(screen.getByLabelText("4 of 5"));

    expect(screen.getByLabelText("4 of 5")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(onValueChange).toHaveBeenLastCalledWith(4);
  });

  it("should support controlled state", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Rating label="Product score" value={2} onValueChange={onValueChange} />,
    );

    await user.click(screen.getByLabelText("5 of 5"));

    expect(screen.getByLabelText("2 of 5")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(onValueChange).toHaveBeenLastCalledWith(5);
  });

  it("should clear the current value when allowClear is enabled", async () => {
    const user = userEvent.setup();
    render(<Rating allowClear defaultValue={3} label="Product score" />);

    await user.click(screen.getByLabelText("3 of 5"));

    expect(screen.getByLabelText("1 of 5")).toHaveAttribute("tabindex", "0");
    expect(screen.getByLabelText("3 of 5")).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("should step with arrow keys", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Rating
        allowHalf
        defaultValue={2}
        label="Product score"
        onValueChange={onValueChange}
      />,
    );

    screen.getByLabelText("2 of 5").focus();
    await user.keyboard("{ArrowRight}");

    expect(onValueChange).toHaveBeenLastCalledWith(2.5);
    expect(screen.getByLabelText("2.5 of 5")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("should not change when disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Rating
        disabled
        defaultValue={2}
        label="Product score"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByLabelText("4 of 5"));

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByLabelText("2 of 5")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("should render a hidden input when name is provided", () => {
    render(<Rating defaultValue={3.5} allowHalf label="Score" name="score" />);

    expect(document.querySelector('input[name="score"]')).toHaveValue("3.5");
  });

  it("should forward ref to the root", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Rating ref={ref} label="Product score" />);

    expect(ref.current?.getAttribute("data-slot")).toBe("rating");
  });
});
