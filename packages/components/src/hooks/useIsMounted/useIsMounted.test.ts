import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useIsMounted } from "./useIsMounted";

describe("useIsMounted", () => {
  it("should return true after mount", () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current()).toBe(true);
  });

  it("should return false after unmount", () => {
    const { result, unmount } = renderHook(() => useIsMounted());
    expect(result.current()).toBe(true);
    unmount();
    expect(result.current()).toBe(false);
  });

  it("should keep stable function identity", () => {
    const { result, rerender } = renderHook(() => useIsMounted());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
