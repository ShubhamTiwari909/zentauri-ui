import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("should expose displayName", () => {
    expect(Toggle.displayName).toBe("Toggle");
  });

  it("should stamp data-slot", () => {
    render(<Toggle defaultChecked={false} />);
    expect(document.querySelector('[data-slot="toggle"]')).toBeTruthy();
  });

  it("should use role switch", () => {
    render(<Toggle aria-label="Notifications" />);
    expect(
      screen.getByRole("switch", { name: "Notifications" }),
    ).toBeInTheDocument();
  });

  it("should call onCheckedChange when toggled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Toggle
        defaultChecked={false}
        onCheckedChange={onCheckedChange}
        aria-label="Airplane mode"
      />,
    );
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });

  it("should forward ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Toggle ref={ref} defaultChecked aria-label="On" />);
    expect(ref.current?.getAttribute("data-slot")).toBe("toggle");
  });
});
