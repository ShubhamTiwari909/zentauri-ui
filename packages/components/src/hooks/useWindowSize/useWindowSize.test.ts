import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useWindowSize } from "./useWindowSize";

describe("useWindowSize", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should read inner dimensions and update on resize", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(800);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(600);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: 800, height: 600 });
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(768);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });
});
