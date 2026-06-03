import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup", () => {
  it("should expose displayName", () => {
    expect(RadioGroup.displayName).toBe("RadioGroup");
    expect(RadioGroupItem.displayName).toBe("RadioGroupItem");
  });

  it("should stamp data-slot", () => {
    render(
      <RadioGroup defaultValue="a" aria-label="Plans">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    );
    expect(document.querySelector('[data-slot="radio-group"]')).toBeTruthy();
    expect(
      document.querySelector('[data-slot="radio-group-item"]'),
    ).toBeTruthy();
  });

  it("should select one value at a time", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup defaultValue="starter" onValueChange={onValueChange}>
        <RadioGroupItem value="starter">Starter</RadioGroupItem>
        <RadioGroupItem value="pro">Pro</RadioGroupItem>
      </RadioGroup>,
    );

    await user.click(screen.getByRole("radio", { name: "Pro" }));

    expect(onValueChange).toHaveBeenLastCalledWith("pro");
    expect(screen.getByRole("radio", { name: "Starter" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
  });

  it("should support controlled value", () => {
    render(
      <RadioGroup value="pro">
        <RadioGroupItem value="starter">Starter</RadioGroupItem>
        <RadioGroupItem value="pro">Pro</RadioGroupItem>
      </RadioGroup>,
    );

    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
  });

  it("should forward ref to the root", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <RadioGroup ref={ref} defaultValue="a">
        <RadioGroupItem value="a">A</RadioGroupItem>
      </RadioGroup>,
    );
    expect(ref.current?.getAttribute("data-slot")).toBe("radio-group");
  });
});
