import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BentoGridAnimated } from "./animated/bento-grid-animated";

// The global vitest setup mocks matchMedia with matches: true for every query,
// so framer-motion's useReducedMotion() reports reduced motion here. Kept in
// its own file because framer caches that result per module.
describe("BentoGridAnimated — prefers-reduced-motion", () => {
  it("should flag the grid root when reduced motion is preferred", () => {
    const { container } = render(
      <BentoGridAnimated animation="reflow">
        <BentoGridAnimated.Item key="a" id="a">
          A
        </BentoGridAnimated.Item>
      </BentoGridAnimated>,
    );
    const root = container.querySelector('[data-slot="bento-grid"]');
    expect(root?.hasAttribute("data-reduced-motion")).toBe(true);
  });

  it("should drop the shared-element layoutId so the detail snaps instead of morphing", () => {
    const { container } = render(
      <BentoGridAnimated animation="morph">
        <BentoGridAnimated.Item key="a" id="a" detail={<p>Detail body</p>}>
          A
        </BentoGridAnimated.Item>
      </BentoGridAnimated>,
    );
    const content = container.querySelector(
      '[data-slot="bento-grid-item-content"]',
    );
    expect(content?.getAttribute("data-layout-id")).toBeNull();

    const item = container.querySelector<HTMLElement>(
      '[data-slot="bento-grid-item"]',
    );
    fireEvent.click(item!);
    const dialog = document.body.querySelector<HTMLElement>(
      '[data-slot="bento-grid-detail"]',
    );
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("data-layout-id")).toBeNull();
  });
});
