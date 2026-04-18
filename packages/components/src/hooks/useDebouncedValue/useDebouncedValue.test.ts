import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useDebouncedValue } from "./useDebouncedValue";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebouncedValue("a", 300));
    expect(result.current).toBe("a");
  });

  it("should update after delay when value stabilizes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebouncedValue(value, delay),
      { initialProps: { value: "x", delay: 100 } },
    );
    rerender({ value: "y", delay: 100 });
    expect(result.current).toBe("x");
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("y");
  });

  it("should reset timer when value changes rapidly", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useDebouncedValue(value, 50),
      { initialProps: { value: 0 } },
    );
    rerender({ value: 1 });
    act(() => {
      vi.advanceTimersByTime(40);
    });
    rerender({ value: 2 });
    act(() => {
      vi.advanceTimersByTime(40);
    });
    expect(result.current).toBe(0);
    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(result.current).toBe(2);
  });

  it("should reset debounce when delayMs changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebouncedValue(value, delay),
      { initialProps: { value: "a", delay: 200 } },
    );
    rerender({ value: "b", delay: 200 });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    rerender({ value: "b", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("a");
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("b");
  });
});
