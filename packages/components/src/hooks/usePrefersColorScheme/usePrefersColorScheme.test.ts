import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { usePrefersColorScheme } from "./usePrefersColorScheme";

function createDarkPreferenceMatchMedia(initialDark: boolean) {
  let dark = initialDark;
  const listeners = new Set<() => void>();
  return {
    setDark(next: boolean) {
      dark = next;
      listeners.forEach((listener) => listener());
    },
    implementation: (query: string) => {
      const mql = {
        media: query,
        get matches() {
          return query === "(prefers-color-scheme: dark)" && dark;
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

describe("usePrefersColorScheme", () => {
  afterEach(() => {
    vi.spyOn(window, "matchMedia").mockRestore();
  });

  it("should map dark media query to dark scheme", () => {
    const { setDark, implementation } = createDarkPreferenceMatchMedia(false);
    const matchMediaSpy = vi
      .spyOn(window, "matchMedia")
      .mockImplementation(implementation);
    const { result } = renderHook(() => usePrefersColorScheme("light"));
    expect(matchMediaSpy).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
    expect(result.current).toBe("light");
    act(() => {
      setDark(true);
    });
    expect(result.current).toBe("dark");
  });
});
