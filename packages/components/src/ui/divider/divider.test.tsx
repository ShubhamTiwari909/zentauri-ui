import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Divider } from "./divider";

const DIVIDER_SLOT = '[data-slot="divider"]';

function getDividerRoot(container: HTMLElement = document.body) {
  const elements = container.querySelectorAll(DIVIDER_SLOT);
  expect(elements.length).toBe(1);
  return elements[0] as HTMLElement;
}

describe("Divider", () => {
  it("should expose a stable displayName", () => {
    expect(Divider.displayName).toBe("Divider");
  });

  it("should render a horizontal separator by default", () => {
    render(<Divider />);
    const root = screen.getByRole("separator");
    expect(root).toHaveAttribute("data-slot", "divider");
    expect(root).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("should render a vertical separator when requested", () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("should render label content between two divider lines", () => {
    render(<Divider label="Or continue with" />);
    expect(screen.getByText("Or continue with")).toHaveAttribute(
      "data-slot",
      "divider-label",
    );
    expect(document.querySelectorAll("[aria-hidden]").length).toBe(2);
  });

  it("should apply appearance token classes", () => {
    render(<Divider appearance="emerald" />);
    expect(getDividerRoot().className).toMatch(/--zui-divider-emerald-fg/);
  });

  it("should forward refs to the separator element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("divider");
  });
});
