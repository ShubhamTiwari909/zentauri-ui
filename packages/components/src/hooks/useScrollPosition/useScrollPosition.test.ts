import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useScrollPosition } from "./useScrollPosition";

describe("useScrollPosition", () => {
  it("should start at the current window offset", () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it("should update from window scroll events", () => {
    const { result } = renderHook(() => useScrollPosition());
    act(() => {
      Object.defineProperty(window, "scrollY", {
        configurable: true,
        value: 120,
      });
      Object.defineProperty(window, "scrollX", {
        configurable: true,
        value: 40,
      });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toEqual({ x: 40, y: 120 });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    Object.defineProperty(window, "scrollX", { configurable: true, value: 0 });
  });

  it("should track an element target", () => {
    const element = document.createElement("div");
    const ref = { current: element };
    const { result } = renderHook(() => useScrollPosition({ target: ref }));
    act(() => {
      element.scrollTop = 75;
      element.scrollLeft = 5;
      element.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toEqual({ x: 5, y: 75 });
  });

  it("should stop listening on unmount", () => {
    const element = document.createElement("div");
    const ref = { current: element };
    const { result, unmount } = renderHook(() =>
      useScrollPosition({ target: ref }),
    );
    unmount();
    act(() => {
      element.scrollTop = 300;
      element.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toEqual({ x: 0, y: 0 });
  });
});
