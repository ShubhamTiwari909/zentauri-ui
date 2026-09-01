import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

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
    const list = container.querySelector('[data-slot="circular-menu-list"]');
    // The frame loop bails out before touching the rotation motion value.
    expect(list?.getAttribute("style") ?? "").not.toMatch(/rotate\((?!0)/);
  });
});
