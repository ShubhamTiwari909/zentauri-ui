import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useThrottledCallback } from "./useThrottledCallback";

describe("useThrottledCallback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000_000);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should invoke callback immediately when outside cooldown", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 100));
    act(() => {
      result.current("a");
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");
  });

  it("should drop calls inside cooldown window", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 1000));
    act(() => {
      result.current();
      result.current();
      result.current();
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should allow another call after interval elapses", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 500));
    act(() => {
      result.current(1);
    });
    act(() => {
      vi.setSystemTime(1_000_400);
      result.current(2);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      vi.setSystemTime(1_000_500);
      result.current(3);
    });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith(3);
  });

  it("should always use latest callback reference without resetting clock", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { result, rerender } = renderHook(
      ({ fn }: { fn: () => void }) => useThrottledCallback(fn, 200),
      { initialProps: { fn: first } },
    );
    act(() => {
      result.current();
    });
    expect(first).toHaveBeenCalledTimes(1);
    rerender({ fn: second });
    act(() => {
      vi.setSystemTime(1_000_200);
      result.current();
    });
    expect(second).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledTimes(1);
  });
});
