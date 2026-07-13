import { createRef } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { BentoGrid, BentoGridItem } from "./bento-grid";
import { BentoGridAnimated } from "./animated/bento-grid-animated";
import type { BentoGridSpan } from "./types";

// framer-motion's useReducedMotion caches the matchMedia result once per module,
// so this override must run before the first animated render in this file. The
// reduced-motion path is covered in bento-grid.reduced-motion.test.tsx.
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

const SPAN_CLASSES: Record<BentoGridSpan, string[]> = {
  "1x1": ["col-span-1", "row-span-1"],
  "2x1": ["col-span-2", "row-span-1"],
  "1x2": ["col-span-1", "row-span-2"],
  "2x2": ["col-span-2", "row-span-2"],
  featured: ["col-span-3", "row-span-2"],
};

describe("BentoGrid", () => {
  it("should set displayName on both components", () => {
    expect(BentoGrid.displayName).toBe("BentoGrid");
    expect(BentoGridItem.displayName).toBe("BentoGridItem");
  });

  it("should stamp data-slot on the grid root and items", () => {
    const { container } = render(
      <BentoGrid>
        <BentoGrid.Item id="a">A</BentoGrid.Item>
      </BentoGrid>,
    );
    expect(container.querySelector('[data-slot="bento-grid"]')).toBeTruthy();
    expect(
      container.querySelector('[data-slot="bento-grid-item"]'),
    ).toBeTruthy();
  });

  it("should render default grid classes and 4 explicit columns", () => {
    const { container } = render(
      <BentoGrid>
        <BentoGrid.Item id="a">A</BentoGrid.Item>
      </BentoGrid>,
    );
    const root = container.querySelector<HTMLElement>(
      '[data-slot="bento-grid"]',
    );
    expect(root?.className).toMatch(/grid/);
    expect(root?.className).toMatch(/grid-flow-row-dense/);
    expect(root?.className).toMatch(/--zui-bento-grid-gap-md/);
    expect(root?.style.gridTemplateColumns).toBe("repeat(4, minmax(0, 1fr))");
  });

  it("should honor cols and minItemWidth", () => {
    const { container, rerender } = render(<BentoGrid cols={3} />);
    let root = container.querySelector<HTMLElement>('[data-slot="bento-grid"]');
    expect(root?.style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");

    rerender(<BentoGrid cols={3} minItemWidth={240} />);
    root = container.querySelector<HTMLElement>('[data-slot="bento-grid"]');
    expect(root?.style.gridTemplateColumns).toBe(
      "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
    );
  });

  it.each(Object.entries(SPAN_CLASSES))(
    "should render span %s with the right col/row classes",
    (span, classes) => {
      const { container } = render(
        <BentoGrid>
          <BentoGrid.Item id="a" span={span as BentoGridSpan}>
            A
          </BentoGrid.Item>
        </BentoGrid>,
      );
      const item = container.querySelector('[data-slot="bento-grid-item"]');
      for (const cls of classes) {
        expect(item?.className).toContain(cls);
      }
    },
  );

  it.each(["blue", "glass", "gradient-purple"] as const)(
    "should render the %s appearance tokens",
    (appearance) => {
      const { container } = render(
        <BentoGrid>
          <BentoGrid.Item id="a" appearance={appearance}>
            A
          </BentoGrid.Item>
        </BentoGrid>,
      );
      const item = container.querySelector('[data-slot="bento-grid-item"]');
      expect(item?.className).toContain(`--zui-bento-grid-${appearance}-`);
    },
  );

  it("should forward refs on both components", () => {
    const gridRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    render(
      <BentoGrid ref={gridRef}>
        <BentoGrid.Item id="a" ref={itemRef}>
          A
        </BentoGrid.Item>
      </BentoGrid>,
    );
    expect(gridRef.current?.getAttribute("data-slot")).toBe("bento-grid");
    expect(itemRef.current?.getAttribute("data-slot")).toBe("bento-grid-item");
  });

  it("should merge custom className without overwriting variants", () => {
    const { container } = render(
      <BentoGrid className="custom-grid">
        <BentoGrid.Item id="a" className="custom-item">
          A
        </BentoGrid.Item>
      </BentoGrid>,
    );
    const root = container.querySelector('[data-slot="bento-grid"]');
    const item = container.querySelector('[data-slot="bento-grid-item"]');
    expect(root?.className).toMatch(/custom-grid/);
    expect(root?.className).toMatch(/grid/);
    expect(item?.className).toMatch(/custom-item/);
    expect(item?.className).toMatch(/col-span-1/);
  });

  it("should add CSS hover/focus expand classes only when expandable and animation >= bento", () => {
    const { container, rerender } = render(
      <BentoGrid animation="bento">
        <BentoGrid.Item id="a" expandable expandedSpan="2x2">
          A
        </BentoGrid.Item>
      </BentoGrid>,
    );
    let item = container.querySelector('[data-slot="bento-grid-item"]');
    expect(item?.hasAttribute("data-expandable")).toBe(true);
    expect(item?.className).toContain("hover:col-span-2");
    expect(item?.className).toContain("focus-within:row-span-2");

    rerender(
      <BentoGrid animation="reflow">
        <BentoGrid.Item id="a" expandable expandedSpan="2x2">
          A
        </BentoGrid.Item>
      </BentoGrid>,
    );
    item = container.querySelector('[data-slot="bento-grid-item"]');
    expect(item?.hasAttribute("data-expandable")).toBe(false);
    expect(item?.className).not.toContain("hover:col-span-2");
  });

  it("should open and close the static detail view with focus return", () => {
    const onOpenDetail = vi.fn();
    const onCloseDetail = vi.fn();
    const { container } = render(
      <BentoGrid animation="morph">
        <BentoGrid.Item
          id="a"
          detail={<p>Detail body</p>}
          onOpenDetail={onOpenDetail}
          onCloseDetail={onCloseDetail}
        >
          A
        </BentoGrid.Item>
      </BentoGrid>,
    );
    const item = container.querySelector<HTMLElement>(
      '[data-slot="bento-grid-item"]',
    );
    expect(item?.getAttribute("role")).toBe("button");
    expect(item?.getAttribute("aria-haspopup")).toBe("dialog");

    fireEvent.click(item!);
    expect(onOpenDetail).toHaveBeenCalledTimes(1);
    const dialog = container.querySelector<HTMLElement>(
      '[data-slot="bento-grid-detail"]',
    );
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(document.activeElement).toBe(dialog);

    fireEvent.keyDown(dialog!, { key: "Escape" });
    expect(onCloseDetail).toHaveBeenCalledTimes(1);
    expect(
      container.querySelector('[data-slot="bento-grid-detail"]'),
    ).toBeFalsy();
    expect(document.activeElement).toBe(item);
  });

  it("should ignore detail unless animation is morph", () => {
    const { container } = render(
      <BentoGrid animation="bento">
        <BentoGrid.Item id="a" detail={<p>Detail body</p>}>
          A
        </BentoGrid.Item>
      </BentoGrid>,
    );
    const item = container.querySelector<HTMLElement>(
      '[data-slot="bento-grid-item"]',
    );
    expect(item?.getAttribute("role")).toBeNull();
    fireEvent.click(item!);
    expect(
      container.querySelector('[data-slot="bento-grid-detail"]'),
    ).toBeFalsy();
  });

  it("should open the detail view from the keyboard", () => {
    const { container } = render(
      <BentoGrid animation="morph">
        <BentoGrid.Item id="a" detail={<p>Detail body</p>}>
          A
        </BentoGrid.Item>
      </BentoGrid>,
    );
    const item = container.querySelector<HTMLElement>(
      '[data-slot="bento-grid-item"]',
    );
    fireEvent.keyDown(item!, { key: "Enter" });
    expect(
      container.querySelector('[data-slot="bento-grid-detail"]'),
    ).toBeTruthy();
  });
});

describe("BentoGridAnimated", () => {
  it("should set displayName on both components", () => {
    expect(BentoGridAnimated.displayName).toBe("BentoGridAnimated");
    expect(BentoGridAnimated.Item.displayName).toBe("BentoGridItemAnimated");
  });

  it("should give the item content wrapper the bento-detail layoutId when detail is set", () => {
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
    expect(content?.getAttribute("data-layout-id")).toBe("bento-detail-a");
  });

  it("should not assign a layoutId without a detail", () => {
    const { container } = render(
      <BentoGridAnimated animation="morph">
        <BentoGridAnimated.Item key="a" id="a">
          A
        </BentoGridAnimated.Item>
      </BentoGridAnimated>,
    );
    const content = container.querySelector(
      '[data-slot="bento-grid-item-content"]',
    );
    expect(content?.getAttribute("data-layout-id")).toBeNull();
  });

  it("should open the morph detail in a portal with a matching layoutId", () => {
    const { container } = render(
      <BentoGridAnimated animation="morph">
        <BentoGridAnimated.Item key="a" id="a" detail={<p>Detail body</p>}>
          A
        </BentoGridAnimated.Item>
      </BentoGridAnimated>,
    );
    const item = container.querySelector<HTMLElement>(
      '[data-slot="bento-grid-item"]',
    );
    fireEvent.click(item!);
    // Renders in a portal on document.body, not inside the grid container.
    expect(
      container.querySelector('[data-slot="bento-grid-detail"]'),
    ).toBeFalsy();
    const dialog = document.body.querySelector<HTMLElement>(
      '[data-slot="bento-grid-detail"]',
    );
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("data-layout-id")).toBe("bento-detail-a");
    expect(document.activeElement).toBe(dialog);
  });

  it("should expand on focus and collapse on blur (keyboard parity)", () => {
    const { container } = render(
      <BentoGridAnimated animation="bento">
        <BentoGridAnimated.Item key="a" id="a" expandable expandedSpan="2x2">
          A
        </BentoGridAnimated.Item>
      </BentoGridAnimated>,
    );
    const item = container.querySelector<HTMLElement>(
      '[data-slot="bento-grid-item"]',
    );
    expect(item?.className).toContain("col-span-1");

    fireEvent.focus(item!);
    expect(item?.hasAttribute("data-expanded")).toBe(true);
    expect(item?.className).toContain("col-span-2");
    expect(item?.className).toContain("row-span-2");

    fireEvent.blur(item!);
    expect(item?.hasAttribute("data-expanded")).toBe(false);
    expect(item?.className).toContain("col-span-1");
  });
  it("should fully unmount the detail overlay after Escape (regression: contested layoutId exit)", async () => {
    const { container } = render(
      <BentoGridAnimated animation="morph">
        <BentoGridAnimated.Item key="a" id="a" detail={<p>Detail body</p>}>
          A
        </BentoGridAnimated.Item>
      </BentoGridAnimated>,
    );
    const item = container.querySelector<HTMLElement>(
      '[data-slot="bento-grid-item"]',
    );
    fireEvent.click(item!);
    const dialog = document.body.querySelector<HTMLElement>(
      '[data-slot="bento-grid-detail"]',
    );
    fireEvent.keyDown(dialog!, { key: "Escape" });
    expect(document.activeElement).toBe(item);
    await waitFor(
      () => {
        expect(
          document.body.querySelector(
            '[data-slot="bento-grid-detail-overlay"]',
          ),
        ).toBeFalsy();
      },
      { timeout: 4000 },
    );
  });
});
