import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { usePageVisibility } from "./usePageVisibility";

describe("usePageVisibility", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should track document.visibilityState via visibilitychange", () => {
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe("visible");
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current).toBe("hidden");
  });
});
