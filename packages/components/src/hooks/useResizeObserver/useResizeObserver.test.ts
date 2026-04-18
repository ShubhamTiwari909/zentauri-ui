import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useResizeObserver } from "./useResizeObserver";

describe("useResizeObserver", () => {
  const OriginalRO = globalThis.ResizeObserver;
  let lastCallback: ResizeObserverCallback | undefined;

  afterEach(() => {
    globalThis.ResizeObserver = OriginalRO;
    lastCallback = undefined;
  });

  it("should observe and set size from contentRect", () => {
    const observeSpy = vi.fn();
    class MockResizeObserver {
      constructor(cb: ResizeObserverCallback) {
        lastCallback = cb;
      }

      observe = observeSpy;

      disconnect = vi.fn();
    }

    globalThis.ResizeObserver =
      MockResizeObserver as unknown as typeof ResizeObserver;

    const { result } = renderHook(() => useResizeObserver());
    const node = document.createElement("div");
    act(() => {
      result.current[0](node);
    });
    expect(observeSpy).toHaveBeenCalledWith(node);
    act(() => {
      lastCallback?.(
        [
          {
            contentRect: { width: 120, height: 80 },
          } as ResizeObserverEntry,
        ],
        {} as ResizeObserver,
      );
    });
    expect(result.current[1]).toEqual({ width: 120, height: 80 });
  });

  it("should not attach when enabled is false", () => {
    const observeSpy = vi.fn();
    class MockResizeObserver {
      constructor(_cb: ResizeObserverCallback) {}

      observe = observeSpy;

      disconnect = vi.fn();
    }

    globalThis.ResizeObserver =
      MockResizeObserver as unknown as typeof ResizeObserver;

    const { result } = renderHook(() => useResizeObserver({ enabled: false }));
    act(() => {
      result.current[0](document.createElement("div"));
    });
    expect(observeSpy).not.toHaveBeenCalled();
  });
});
