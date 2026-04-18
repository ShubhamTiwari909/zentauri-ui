import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "./useMediaQuery";

function createControllableMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;
  const listeners = new Set<() => void>();
  return {
    setMatches(next: boolean) {
      matches = next;
      listeners.forEach((listener) => listener());
    },
    implementation: (query: string) => {
      const mql = {
        media: query,
        get matches() {
          return matches;
        },
        addEventListener: (_type: string, listener: () => void) => {
          listeners.add(listener);
        },
        removeEventListener: (_type: string, listener: () => void) => {
          listeners.delete(listener);
        },
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
      return mql as unknown as MediaQueryList;
    },
  };
}

describe("useMediaQuery", () => {
  afterEach(() => {
    vi.spyOn(window, "matchMedia").mockRestore();
  });

  it("should reflect matchMedia matches and subscribe to change", () => {
    const { setMatches, implementation } = createControllableMatchMedia(false);
    const matchMediaSpy = vi
      .spyOn(window, "matchMedia")
      .mockImplementation(implementation);

    const { result } = renderHook(() => useMediaQuery("(min-width: 1px)"));
    expect(result.current).toBe(false);
    act(() => {
      setMatches(true);
    });
    expect(result.current).toBe(true);
    expect(matchMediaSpy).toHaveBeenCalledWith("(min-width: 1px)");
  });

  it("should sync to media.matches after mount when defaultValue differs", () => {
    const { implementation } = createControllableMatchMedia(false);
    vi.spyOn(window, "matchMedia").mockImplementation(implementation);
    const { result } = renderHook(() =>
      useMediaQuery("(min-width: 99999px)", true),
    );
    expect(result.current).toBe(false);
  });
});
