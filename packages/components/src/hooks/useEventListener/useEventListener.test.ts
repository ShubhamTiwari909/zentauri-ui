import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useEventListener } from "./useEventListener";

describe("useEventListener", () => {
  it("should listen on window by default", () => {
    const handler = vi.fn();
    renderHook(() => useEventListener("focus", handler));
    window.dispatchEvent(new Event("focus"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should listen on an element target", () => {
    const element = document.createElement("button");
    const handler = vi.fn();
    renderHook(() => useEventListener("click", handler, element));
    element.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should listen on a ref target resolved after mount", () => {
    const element = document.createElement("div");
    const ref = { current: element };
    const handler = vi.fn();
    renderHook(() => useEventListener("click", handler, ref));
    element.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should always invoke the latest handler without re-subscribing", () => {
    const first = vi.fn();
    const second = vi.fn();
    const addSpy = vi.spyOn(window, "addEventListener");
    const { rerender } = renderHook(
      ({ handler }: { handler: () => void }) =>
        useEventListener("focus", handler),
      { initialProps: { handler: first } },
    );
    const subscriptions = addSpy.mock.calls.filter(
      ([type]) => type === "focus",
    ).length;
    rerender({ handler: second });
    window.dispatchEvent(new Event("focus"));
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
    expect(addSpy.mock.calls.filter(([type]) => type === "focus").length).toBe(
      subscriptions,
    );
    addSpy.mockRestore();
  });

  it("should remove the listener on unmount", () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useEventListener("focus", handler));
    unmount();
    window.dispatchEvent(new Event("focus"));
    expect(handler).not.toHaveBeenCalled();
  });
});
