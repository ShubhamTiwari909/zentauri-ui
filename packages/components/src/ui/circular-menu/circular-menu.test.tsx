import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { zuiCircularMenuSizes } from "../../design-system/circular-menu";
import { CircularMenu } from "./circular-menu";
import { CircularMenu as CircularMenuAnimated } from "./animated/circular-menu-animated";
import {
  CIRCULAR_MENU_SIZE_METRICS,
  getCircularMenuBoxSize,
  getCircularMenuPositions,
} from "./geometry";
import type { CircularMenuItemData } from "./types";

// framer-motion's useReducedMotion caches the matchMedia result once per
// module, so the override must run before the first animated render in this
// file. The reduced-motion path is covered in
// circular-menu.reduced-motion.test.tsx.
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      media: query,
      matches: false,
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
  { id: "edit", label: "Edit", icon: "E" },
  { id: "delete", label: "Delete", icon: "D" },
];

function getRoot(container: HTMLElement) {
  return container.querySelector('[data-slot="circular-menu"]');
}

/** Indexed access that fails loudly instead of widening to `undefined`. */
function at<T>(list: readonly T[], index: number): T {
  const value = list[index];
  if (value === undefined) {
    throw new Error(`Expected an entry at index ${index}`);
  }
  return value;
}

describe("CircularMenu", () => {
  it("should set displayName", () => {
    expect(CircularMenu.displayName).toBe("CircularMenu");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<CircularMenu items={items} />);
    expect(getRoot(container)).toBeTruthy();
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CircularMenu ref={ref} items={items} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("circular-menu");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <CircularMenu className="custom-class" items={items} />,
    );
    expect(getRoot(container)?.className).toMatch(/custom-class/);
  });

  it("should render closed by default with an inert list", () => {
    const { container } = render(<CircularMenu items={items} />);
    const trigger = screen.getByRole("button", { name: "Menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    const list = container.querySelector('[data-slot="circular-menu-list"]');
    expect(list).toHaveAttribute("inert");
    expect(list).toHaveAttribute("data-state", "closed");
  });

  it("should open on trigger click", () => {
    const { container } = render(<CircularMenu items={items} />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(getRoot(container)).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("should render one menuitem per item", () => {
    render(<CircularMenu items={items} defaultOpen />);
    expect(screen.getAllByRole("menuitem")).toHaveLength(items.length);
  });

  it("should write solved offsets onto each positioner", () => {
    const { container } = render(
      <CircularMenu items={items} radius={100} defaultOpen />,
    );
    const positioners = container.querySelectorAll(
      '[data-slot="circular-menu-item-positioner"]',
    );
    expect(positioners).toHaveLength(items.length);
    // First slot sits at 12 o'clock: no horizontal offset, full negative rise.
    expect(positioners[0]).toHaveStyle({
      "--zui-circular-menu-item-x": "0px",
      "--zui-circular-menu-item-y": "-100px",
    });
    expect(positioners[0]).toHaveAttribute("data-angle", "0");
    // Four items on a closed ring step by 90deg, clockwise.
    expect(positioners[1]).toHaveAttribute("data-angle", "90");
  });

  it("should auto-derive the box size from radius and item size", () => {
    const { container } = render(
      <CircularMenu items={items} radius={100} itemSize={40} />,
    );
    expect(getRoot(container)).toHaveStyle({
      "--zui-circular-menu-size": "240px",
    });
  });

  it("should move roving focus with arrow keys and wrap", () => {
    render(<CircularMenu items={items} defaultOpen />);
    const menuItems = screen.getAllByRole("menuitem");
    const first = at(menuItems, 0);
    const second = at(menuItems, 1);
    const last = at(menuItems, items.length - 1);
    first.focus();

    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(second).toHaveFocus();
    expect(second).toHaveAttribute("tabindex", "0");
    expect(first).toHaveAttribute("tabindex", "-1");

    fireEvent.keyDown(second, { key: "ArrowLeft" });
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(last).toHaveFocus();

    fireEvent.keyDown(last, { key: "Home" });
    expect(first).toHaveFocus();
  });

  it("should close on Escape and return focus to the trigger", () => {
    const { container } = render(<CircularMenu items={items} defaultOpen />);
    const firstItem = at(screen.getAllByRole("menuitem"), 0);
    firstItem.focus();
    fireEvent.keyDown(firstItem, { key: "Escape" });
    expect(getRoot(container)).toHaveAttribute("data-state", "closed");
    expect(screen.getByRole("button", { name: "Menu" })).toHaveFocus();
  });

  it("should run item and root select handlers, then close", () => {
    const onItemSelect = vi.fn();
    const onSelect = vi.fn();
    const { container } = render(
      <CircularMenu
        defaultOpen
        onSelect={onSelect}
        items={[{ id: "copy", label: "Copy", onSelect: onItemSelect }]}
      />,
    );

    fireEvent.click(screen.getByRole("menuitem"));
    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "copy" }),
      0,
    );
    expect(getRoot(container)).toHaveAttribute("data-state", "closed");
  });

  it("should not select a disabled item", () => {
    const onSelect = vi.fn();
    render(
      <CircularMenu
        defaultOpen
        onSelect={onSelect}
        items={[{ id: "trash", label: "Delete", disabled: true }]}
      />,
    );
    const item = screen.getByRole("menuitem");
    expect(item).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(item);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("should keep the ring open and spinning in always mode", () => {
    const { container } = render(
      <CircularMenu items={items} trigger="always" spin />,
    );
    const root = getRoot(container);
    expect(root).toHaveAttribute("data-state", "open");
    expect(root).toHaveAttribute("data-spin", "true");
    const list = container.querySelector('[data-slot="circular-menu-list"]');
    expect(list).toHaveAttribute("data-spin", "true");
    expect(list?.className).toMatch(/data-\[spin=true\]:animate-spin/);
    expect(list?.className).toMatch(/motion-reduce:animate-none/);
    // Icons counter-rotate so glyphs stay upright while the ring turns.
    const icon = container.querySelector(
      '[data-slot="circular-menu-item-icon"]',
    );
    expect(icon).toHaveAttribute("data-counter-spin", "true");
  });

  it("should render spokes when asked", () => {
    const { container } = render(
      <CircularMenu items={items} showSpokes defaultOpen />,
    );
    expect(
      container.querySelectorAll('[data-slot="circular-menu-spoke"]'),
    ).toHaveLength(items.length);
  });

  it("should render an anchor for items with href", () => {
    render(
      <CircularMenu defaultOpen items={[{ id: "docs", href: "/docs" }]} />,
    );
    const item = screen.getByRole("menuitem");
    expect(item.tagName).toBe("A");
    expect(item).toHaveAttribute("href", "/docs");
  });

  it("should expose compound primitives", () => {
    const { container } = render(
      <CircularMenu.Root defaultOpen radius={80}>
        <CircularMenu.Trigger>Open</CircularMenu.Trigger>
        <CircularMenu.List>
          <CircularMenu.Item>
            <CircularMenu.ItemIcon>A</CircularMenu.ItemIcon>
            <CircularMenu.ItemLabel>Alpha</CircularMenu.ItemLabel>
          </CircularMenu.Item>
          <CircularMenu.Item>
            <CircularMenu.ItemIcon>B</CircularMenu.ItemIcon>
            <CircularMenu.ItemLabel>Beta</CircularMenu.ItemLabel>
          </CircularMenu.Item>
        </CircularMenu.List>
      </CircularMenu.Root>,
    );
    expect(getRoot(container)).toBeTruthy();
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    expect(screen.getByText("Alpha")).toBeTruthy();
    // Composed items report a synthesized id to the root callback.
    expect(
      container.querySelectorAll('[data-slot="circular-menu-item-positioner"]'),
    ).toHaveLength(2);
  });

  it("should keep the trigger token metrics in step with the geometry table", () => {
    for (const [size, tokens] of Object.entries(zuiCircularMenuSizes)) {
      const match = tokens.match(/--zui-circular-menu-trigger-size:(\d+)px/);
      expect(match).toBeTruthy();
      expect(Number(match?.[1])).toBe(
        CIRCULAR_MENU_SIZE_METRICS[
          size as keyof typeof CIRCULAR_MENU_SIZE_METRICS
        ].triggerSize,
      );
    }
  });

  it("should render the animated entry with the same slots", () => {
    const { container } = render(
      <CircularMenuAnimated items={items} defaultOpen />,
    );
    expect(getRoot(container)).toBeTruthy();
    expect(screen.getAllByRole("menuitem")).toHaveLength(items.length);
    expect(CircularMenuAnimated.displayName).toBe("CircularMenu");
  });
});

describe("getCircularMenuPositions", () => {
  it("should place the first item at 12 o'clock", () => {
    const first = at(getCircularMenuPositions({ count: 4, radius: 100 }), 0);
    expect(first.angle).toBe(0);
    expect(first.x).toBeCloseTo(0);
    expect(first.y).toBeCloseTo(-100);
  });

  it("should step clockwise around a closed ring", () => {
    const positions = getCircularMenuPositions({ count: 4, radius: 100 });
    expect(positions.map((position) => position.angle)).toEqual([
      0, 90, 180, 270,
    ]);
    expect(at(positions, 1).x).toBeCloseTo(100);
    expect(at(positions, 1).y).toBeCloseTo(0);
  });

  it("should reverse for counterclockwise rings", () => {
    const positions = getCircularMenuPositions({
      count: 4,
      radius: 100,
      direction: "counterclockwise",
    });
    expect(positions.map((position) => position.angle)).toEqual([
      0, -90, -180, -270,
    ]);
  });

  it("should land both endpoints on an open arc", () => {
    const positions = getCircularMenuPositions({
      count: 3,
      radius: 50,
      startAngle: -90,
      sweep: 180,
    });
    expect(positions.map((position) => position.angle)).toEqual([-90, 0, 90]);
  });

  it("should handle degenerate counts", () => {
    expect(getCircularMenuPositions({ count: 0, radius: 100 })).toEqual([]);
    const only = at(
      getCircularMenuPositions({ count: 1, radius: 100, startAngle: 45 }),
      0,
    );
    expect(only.angle).toBe(45);
  });

  it("should size the box for the ring plus one disc of overhang", () => {
    expect(getCircularMenuBoxSize(100, 40)).toBe(240);
    expect(getCircularMenuBoxSize(96, 33)).toBe(225);
  });
});
