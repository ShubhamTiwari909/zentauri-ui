import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

describe("usePrefersReducedMotion", () => {
  afterEach(() => {
    vi.spyOn(window, "matchMedia").mockRestore();
  });

  it("should subscribe to prefers-reduced-motion reduce query", () => {
    const matchMediaSpy = vi.spyOn(window, "matchMedia").mockImplementation(
      () =>
        ({
          matches: true,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    );
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(matchMediaSpy).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
    expect(result.current).toBe(true);
  });
});
