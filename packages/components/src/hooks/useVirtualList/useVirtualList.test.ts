import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useVirtualList } from "./useVirtualList";

function createContainer(clientHeight: number): HTMLDivElement {
  const element = document.createElement("div");
  Object.defineProperty(element, "clientHeight", {
    configurable: true,
    value: clientHeight,
  });
  return element;
}

describe("useVirtualList", () => {
  it("should expose the full content height", () => {
    const { result } = renderHook(() =>
      useVirtualList({ itemCount: 1000, itemHeight: 40 }),
    );
    expect(result.current.totalHeight).toBe(40000);
  });

  it("should render only the visible window plus overscan", () => {
    const container = createContainer(200);
    const { result } = renderHook(() =>
      useVirtualList({ itemCount: 1000, itemHeight: 40, overscan: 2 }),
    );
    act(() => {
      result.current.setContainerRef(container);
    });
    // viewport 200px / 40px rows = 5 visible + 2 overscan below (none above at top)
    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(6);
    expect(result.current.virtualItems).toHaveLength(7);
    expect(result.current.virtualItems[0]).toEqual({
      index: 0,
      start: 0,
      size: 40,
    });
  });

  it("should shift the window on scroll", () => {
    const container = createContainer(200);
    const { result } = renderHook(() =>
      useVirtualList({ itemCount: 1000, itemHeight: 40, overscan: 2 }),
    );
    act(() => {
      result.current.setContainerRef(container);
    });
    act(() => {
      container.scrollTop = 400;
      container.dispatchEvent(new Event("scroll"));
    });
    // rows 10..14 visible, ±2 overscan
    expect(result.current.startIndex).toBe(8);
    expect(result.current.endIndex).toBe(16);
    expect(result.current.virtualItems[0]?.start).toBe(8 * 40);
  });

  it("should clamp the window at the end of the list", () => {
    const container = createContainer(200);
    const { result } = renderHook(() =>
      useVirtualList({ itemCount: 12, itemHeight: 40, overscan: 3 }),
    );
    act(() => {
      result.current.setContainerRef(container);
    });
    act(() => {
      container.scrollTop = 280;
      container.dispatchEvent(new Event("scroll"));
    });
    expect(result.current.endIndex).toBe(11);
  });

  it("should handle an empty list", () => {
    const { result } = renderHook(() =>
      useVirtualList({ itemCount: 0, itemHeight: 40 }),
    );
    expect(result.current.virtualItems).toHaveLength(0);
    expect(result.current.totalHeight).toBe(0);
    expect(result.current.endIndex).toBe(-1);
  });

  it("should scroll to an index, clamped to bounds", () => {
    const container = createContainer(200);
    const { result } = renderHook(() =>
      useVirtualList({ itemCount: 100, itemHeight: 40, overscan: 0 }),
    );
    act(() => {
      result.current.setContainerRef(container);
    });
    act(() => {
      result.current.scrollToIndex(50);
    });
    expect(container.scrollTop).toBe(2000);
    expect(result.current.startIndex).toBe(50);
    act(() => {
      result.current.scrollToIndex(500);
    });
    expect(container.scrollTop).toBe(99 * 40);
  });
});
