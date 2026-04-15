import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Badge } from "./badge";

describe("Badge", () => {
  it("should expose displayName", () => {
    expect(Badge.displayName).toBe("Badge");
  });

  it("should stamp data-slot", () => {
    render(<Badge>Tag</Badge>);
    const root = document.querySelector('[data-slot="badge"]');
    expect(root).toBeTruthy();
    expect(root?.getAttribute("data-slot")).toBe("badge");
  });

  it("should apply secondary appearance", () => {
    render(<Badge appearance="secondary">S</Badge>);
    const root = document.querySelector('[data-slot="badge"]') as HTMLElement;
    expect(root.className).toMatch(/bg-slate-800/);
  });

  it("should call onClose when closable", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Badge closable onClose={onClose}>
        X
      </Badge>,
    );
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should forward ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>R</Badge>);
    expect(ref.current?.getAttribute("data-slot")).toBe("badge");
  });

  it("should set aria-label for dot variant by default", () => {
    render(<Badge shape="dot" appearance="emerald" />);
    expect(screen.getByLabelText("Status indicator")).toBeInTheDocument();
  });
});
