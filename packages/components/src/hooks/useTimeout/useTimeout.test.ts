import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useTimeout } from "./useTimeout";

describe("useTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should fire once after the delay", () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, 200));
    vi.advanceTimersByTime(199);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not schedule when delay is null", () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, null));
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should cancel via clear", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout(callback, 200));
    act(() => {
      result.current.clear();
    });
    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should restart the delay via reset", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout(callback, 200));
    vi.advanceTimersByTime(150);
    act(() => {
      result.current.reset();
    });
    vi.advanceTimersByTime(150);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should cancel the pending timeout on unmount", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 200));
    unmount();
    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
  });
});
