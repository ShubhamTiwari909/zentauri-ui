import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Marquee } from "./marquee";

describe("Marquee", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("exposes a display name", () => {
    expect(Marquee.displayName).toBe("Marquee");
  });

  it("renders children into duplicated marquee groups", () => {
    render(
      <Marquee>
        <span>Acme</span>
      </Marquee>,
    );

    expect(document.querySelector('[data-slot="marquee"]')).toBeTruthy();
    expect(document.querySelector('[data-slot="marquee-track"]')).toBeTruthy();
    const groups = document.querySelectorAll(
      '[data-slot="marquee-item-group"]',
    );
    expect(groups).toHaveLength(2);
    expect(groups[0]?.textContent).toContain("Acme");
    expect(groups[1]).toHaveAttribute("aria-hidden", "true");
    expect(groups[1]).toHaveAttribute("inert");
    expect(groups[1]?.textContent).toContain("Acme");
  });

  it("applies horizontal metadata by default", () => {
    render(
      <Marquee data-testid="marquee">
        <span>Default direction</span>
      </Marquee>,
    );

    const marquee = screen.getByTestId("marquee");
    expect(marquee).toHaveAttribute("data-orientation", "horizontal");
    expect(marquee).toHaveAttribute("data-direction", "left");
    expect(marquee.className).toContain("w-full");
  });

  it("applies vertical metadata and down direction", () => {
    render(
      <Marquee orientation="vertical" direction="down" data-testid="marquee">
        <span>Vertical direction</span>
      </Marquee>,
    );

    const marquee = screen.getByTestId("marquee");
    const track = document.querySelector('[data-slot="marquee-track"]');
    expect(marquee).toHaveAttribute("data-orientation", "vertical");
    expect(marquee).toHaveAttribute("data-direction", "down");
    expect(track?.className).toContain("[animation-direction:reverse]");
  });

  it("infers vertical orientation from up or down directions", () => {
    render(
      <Marquee direction="up" data-testid="marquee">
        <span>Inferred vertical</span>
      </Marquee>,
    );

    expect(screen.getByTestId("marquee")).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
  });

  it("maps speed to track animation styles and gap to a CSS custom property", () => {
    render(
      <Marquee speed={42} gap={24} data-testid="marquee">
        <span>Timing</span>
      </Marquee>,
    );

    const marquee = screen.getByTestId("marquee");
    expect(marquee).toHaveStyle({
      "--zui-marquee-gap": "24px",
    });

    expect(document.querySelector('[data-slot="marquee-track"]')).toHaveStyle({
      animationDuration: "42s",
      animationName: "zui-marquee-x",
    });
  });

  it("hides filler copies from assistive technology", async () => {
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(
      function (this: HTMLElement) {
        return this.getAttribute("data-slot") === "marquee" ? 300 : 0;
      },
    );
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
      function (this: HTMLElement) {
        return this.getAttribute("data-slot") === "marquee-measure" ? 100 : 0;
      },
    );

    render(
      <Marquee>
        <button type="button">Focusable item</button>
      </Marquee>,
    );

    const firstGroup = document.querySelector(
      '[data-slot="marquee-item-group"]',
    );

    await waitFor(() => {
      expect(firstGroup?.textContent).toBe(
        "Focusable itemFocusable itemFocusable item",
      );
    });

    expect(
      screen.getAllByRole("button", { name: "Focusable item" }),
    ).toHaveLength(1);
    expect(
      firstGroup?.querySelectorAll('[aria-hidden="true"][inert]'),
    ).toHaveLength(2);
  });

  it("accepts string gap values", () => {
    render(
      <Marquee gap="2rem" data-testid="marquee">
        <span>String gap</span>
      </Marquee>,
    );

    expect(screen.getByTestId("marquee")).toHaveStyle({
      "--zui-marquee-gap": "2rem",
    });
  });

  it("adds pause-on-hover animation control when requested", () => {
    render(
      <Marquee pauseOnHover>
        <span>Pause</span>
      </Marquee>,
    );

    expect(
      document.querySelector('[data-slot="marquee-track"]')?.className,
    ).toContain("group-hover/marquee:[animation-play-state:paused]");
  });

  it("applies appearance, size, fade, and custom classes", () => {
    render(
      <Marquee
        appearance="sky"
        className="rounded-2xl"
        fade={false}
        itemClassName="min-w-max"
        size="lg"
        trackClassName="tracking-wide"
        data-testid="marquee"
      >
        <span>Variants</span>
      </Marquee>,
    );

    const marquee = screen.getByTestId("marquee");
    expect(marquee.className).toContain("rounded-2xl");
    expect(marquee.className).toContain("p-4");
    expect(marquee.className).toContain("--zui-marquee-sky-border");
    expect(marquee.className).not.toContain("mask-image");
    expect(
      document.querySelector('[data-slot="marquee-track"]')?.className,
    ).toContain("tracking-wide");
    expect(
      document.querySelector('[data-slot="marquee-item-group"]')?.className,
    ).toContain("min-w-max");
  });
});
