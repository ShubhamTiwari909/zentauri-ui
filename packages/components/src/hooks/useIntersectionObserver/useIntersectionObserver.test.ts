import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useIntersectionObserver } from "./useIntersectionObserver";

describe("useIntersectionObserver", () => {
  const OriginalIO = globalThis.IntersectionObserver;
  let lastCallback: IntersectionObserverCallback | undefined;

  afterEach(() => {
    globalThis.IntersectionObserver = OriginalIO;
    lastCallback = undefined;
    vi.restoreAllMocks();
  });

  it("should observe element and expose latest entry from callback", () => {
    const observeSpy = vi.fn();
    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        lastCallback = cb;
      }

      observe = observeSpy;

      disconnect = vi.fn();
    }

    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    const { result } = renderHook(() => useIntersectionObserver());
    const node = document.createElement("div");
    act(() => {
      result.current[0](node);
    });
    expect(observeSpy).toHaveBeenCalledWith(node);
    const rect = node.getBoundingClientRect();
    const fakeEntry: IntersectionObserverEntry = {
      boundingClientRect: rect,
      intersectionRect: rect,
      intersectionRatio: 1,
      isIntersecting: true,
      rootBounds: null,
      target: node,
      time: 0,
    };
    act(() => {
      lastCallback?.([fakeEntry], {} as IntersectionObserver);
    });
    expect(result.current[1]?.isIntersecting).toBe(true);
  });

  it("should not observe when enabled is false", () => {
    const observeSpy = vi.fn();
    class MockIntersectionObserver {
      constructor(_cb: IntersectionObserverCallback) {}

      observe = observeSpy;

      disconnect = vi.fn();
    }

    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    const { result } = renderHook(() =>
      useIntersectionObserver({ enabled: false }),
    );
    const node = document.createElement("div");
    act(() => {
      result.current[0](node);
    });
    expect(observeSpy).not.toHaveBeenCalled();
  });
});
