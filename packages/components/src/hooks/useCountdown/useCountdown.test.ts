import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useCountdown } from "./useCountdown";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should stay idle until started", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 100 }),
    );
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.count).toBe(5);
    expect(result.current.isRunning).toBe(false);
  });

  it("should count down once started", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 100 }),
    );
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current.count).toBe(2);
    expect(result.current.isRunning).toBe(true);
  });

  it("should auto start when configured", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 3, intervalMs: 100, autoStart: true }),
    );
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.count).toBe(2);
  });

  it("should pause and resume", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 100 }),
    );
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    act(() => {
      result.current.pause();
    });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.count).toBe(3);
    act(() => {
      result.current.resume();
    });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.count).toBe(2);
  });

  it("should stop at countStop and call onComplete once", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useCountdown({ countStart: 2, intervalMs: 100, onComplete }),
    );
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.count).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isComplete).toBe(true);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("should reset back to countStart without running", () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 5, intervalMs: 100 }),
    );
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
    expect(result.current.isRunning).toBe(false);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.count).toBe(5);
  });
});
