import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useInterval } from "./useInterval";

describe("useInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should invoke the callback on every tick", () => {
    const callback = vi.fn();
    renderHook(() => useInterval(callback, 100));
    vi.advanceTimersByTime(350);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should pause when delay is null", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ delay }: { delay: number | null }) => useInterval(callback, delay),
      { initialProps: { delay: 100 as number | null } },
    );
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
    rerender({ delay: null });
    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should use the latest callback without restarting the timer", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(
      ({ callback }: { callback: () => void }) => useInterval(callback, 100),
      { initialProps: { callback: first } },
    );
    vi.advanceTimersByTime(50);
    rerender({ callback: second });
    vi.advanceTimersByTime(50);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("should stop on unmount", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useInterval(callback, 100));
    unmount();
    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
  });
});
