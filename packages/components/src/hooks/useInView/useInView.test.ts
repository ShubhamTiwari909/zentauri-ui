import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useInView } from "./useInView";

describe("useInView", () => {
  const OriginalIO = globalThis.IntersectionObserver;
  let lastCallback: IntersectionObserverCallback | undefined;

  afterEach(() => {
    globalThis.IntersectionObserver = OriginalIO;
    lastCallback = undefined;
  });

  it("should derive inView from isIntersecting", () => {
    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        lastCallback = cb;
      }

      observe = vi.fn();

      disconnect = vi.fn();
    }

    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    const { result } = renderHook(() => useInView());
    const el = document.createElement("div");
    act(() => {
      result.current[0](el);
    });
    expect(result.current[1]).toBe(false);
    act(() => {
      lastCallback?.(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(result.current[1]).toBe(true);
  });
});
