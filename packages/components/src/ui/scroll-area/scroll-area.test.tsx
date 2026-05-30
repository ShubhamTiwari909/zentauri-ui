import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("exposes a display name", () => {
    expect(ScrollArea.displayName).toBe("ScrollArea");
  });

  it("renders children in the viewport slot", () => {
    render(
      <ScrollArea>
        <p>Scrollable content</p>
      </ScrollArea>,
    );

    expect(document.querySelector('[data-slot="scroll-area"]')).toBeTruthy();
    expect(
      document.querySelector('[data-slot="scroll-area-viewport"]'),
    ).toBeTruthy();
    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
  });

  it("applies horizontal orientation metadata and overflow classes", () => {
    render(
      <ScrollArea orientation="horizontal" data-testid="scroll-area">
        Wide content
      </ScrollArea>,
    );

    const area = screen.getByTestId("scroll-area");
    expect(area).toHaveAttribute("data-orientation", "horizontal");
    expect(area.className).toContain("overflow-x-auto");
    expect(area.className).toContain("overflow-y-hidden");
  });

  it("applies both-axis orientation metadata and overflow classes", () => {
    render(
      <ScrollArea orientation="both" data-testid="scroll-area">
        Wide and tall content
      </ScrollArea>,
    );

    const area = screen.getByTestId("scroll-area");
    expect(area).toHaveAttribute("data-orientation", "both");
    expect(area.className).toContain("overflow-auto");
  });

  it("uses named regions as keyboard-focusable scroll containers", () => {
    render(
      <ScrollArea aria-label="Notifications" data-testid="scroll-area">
        Notifications
      </ScrollArea>,
    );

    const area = screen.getByTestId("scroll-area");
    expect(area).toHaveAttribute("role", "region");
    expect(area).toHaveAttribute("tabindex", "0");
  });

  it("respects explicit role and tabIndex values", () => {
    render(
      <ScrollArea
        aria-label="Activity"
        data-testid="scroll-area"
        role="group"
        tabIndex={-1}
      >
        Activity
      </ScrollArea>,
    );

    const area = screen.getByTestId("scroll-area");
    expect(area).toHaveAttribute("role", "group");
    expect(area).toHaveAttribute("tabindex", "-1");
  });

  it("applies viewport class names", () => {
    render(
      <ScrollArea viewportClassName="min-w-max" data-testid="scroll-area">
        Content
      </ScrollArea>,
    );

    expect(
      document.querySelector('[data-slot="scroll-area-viewport"]'),
    ).toHaveClass("min-w-max");
  });

  it("applies appearance, size, scrollbar, shadow, and className variants", () => {
    render(
      <ScrollArea
        appearance="sky"
        className="h-32"
        data-testid="scroll-area"
        scrollbar="hover"
        shadow
        size="lg"
      >
        Content
      </ScrollArea>,
    );

    const area = screen.getByTestId("scroll-area");
    expect(area).toHaveAttribute("data-scrollbar", "hover");
    expect(area.className).toContain("h-32");
    expect(area.className).toContain("[--zui-scroll-area-size:0.875rem]");
    expect(area.className).toContain(
      "[box-shadow:inset_0_2px_12px_rgb(15_23_42_/_0.08)]",
    );
    expect(area.className).toContain(
      "[--zui-scroll-area-thumb:oklch(54.6%_0.245_262.881)]",
    );
  });
});
