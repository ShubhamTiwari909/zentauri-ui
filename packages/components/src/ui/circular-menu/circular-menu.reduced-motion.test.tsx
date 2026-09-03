import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

// motion-dom's frame loop reads `requestAnimationFrame` once, at module
// evaluation time, so the mock has to be in place before framer-motion (a
// transitive import of the animated entry below) is first imported —
// `vi.hoisted` runs this ahead of every import in the file, not just this one.
const { rafCallbacks } = vi.hoisted(() => {
  const callbacks: FrameRequestCallback[] = [];
  let nextId = 1;
  Object.defineProperty(globalThis, "requestAnimationFrame", {
    writable: true,
    configurable: true,
    value: (callback: FrameRequestCallback) => {
      callbacks.push(callback);
      return nextId++;
    },
  });
  Object.defineProperty(globalThis, "cancelAnimationFrame", {
    writable: true,
    configurable: true,
    value: () => {},
  });
  return { rafCallbacks: callbacks };
});

import { CircularMenu } from "./animated/circular-menu-animated";
import type { CircularMenuItemData } from "./types";

// Isolated from circular-menu.test.tsx: framer-motion resolves the reduced
// motion query once per module, so the "reduce" preference has to be installed
// before this file's first animated render.
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      media: query,
      matches: query.includes("prefers-reduced-motion"),
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const items: CircularMenuItemData[] = [
  { id: "copy", label: "Copy", icon: "C" },
  { id: "share", label: "Share", icon: "S" },
];

describe("CircularMenu (animated, reduced motion)", () => {
  it("should still render the ring without motion", () => {
    const { container } = render(
      <CircularMenu items={items} defaultOpen spin />,
    );
    const root = container.querySelector('[data-slot="circular-menu"]');
    expect(root).toHaveAttribute("data-state", "open");
    expect(container.querySelectorAll('[role="menuitem"]')).toHaveLength(
      items.length,
    );
  });

  it("should leave the ring unrotated when reduced motion is preferred", () => {
    const { container } = render(
      <CircularMenu items={items} trigger="always" spin />,
    );

    // Drive framer-motion's frame loop by hand: `useAnimationFrame` never
    // advances `rotation` on its own inside a synchronous render, so without
    // pumping frames this assertion would pass whether or not the
    // `prefersReducedMotion` bail actually exists.
    expect(rafCallbacks.length).toBeGreaterThan(0);
    let time = 0;
    for (let frame = 0; frame < 5; frame += 1) {
      time += 16;
      const callback = rafCallbacks.shift();
      callback?.(time);
    }

    const list = container.querySelector('[data-slot="circular-menu-list"]');
    // The frame loop bails out before touching the rotation motion value.
    // Reject anything that ISN'T a zero-equivalent angle (`0`, `-0`, `0.00`,
    // `0deg`, ...) rather than enumerating non-zero shapes: the previous
    // enumeration missed non-zero values with an integer part, like `1.92deg`.
    expect(list?.getAttribute("style") ?? "").not.toMatch(
      /rotate\((?!-?0(?:\.0*)?(?:\.?deg)?\))/,
    );
  });
});
