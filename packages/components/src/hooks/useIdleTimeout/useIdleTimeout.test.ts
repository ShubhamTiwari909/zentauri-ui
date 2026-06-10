import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useIdleTimeout } from "./useIdleTimeout";

describe("useIdleTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should start active and become idle after the timeout", () => {
    const { result } = renderHook(() => useIdleTimeout({ timeoutMs: 1000 }));
    expect(result.current.isIdle).toBe(false);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.isIdle).toBe(true);
  });

  it("should stay active while activity events occur", () => {
    const { result } = renderHook(() => useIdleTimeout({ timeoutMs: 1000 }));
    act(() => {
      vi.advanceTimersByTime(800);
      window.dispatchEvent(new Event("keydown"));
      vi.advanceTimersByTime(800);
      window.dispatchEvent(new Event("pointermove"));
      vi.advanceTimersByTime(800);
    });
    expect(result.current.isIdle).toBe(false);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.isIdle).toBe(true);
  });

  it("should flip back to active on activity after idling", () => {
    const onIdle = vi.fn();
    const onActive = vi.fn();
    const { result } = renderHook(() =>
      useIdleTimeout({ timeoutMs: 500, onIdle, onActive }),
    );
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.isIdle).toBe(true);
    expect(onIdle).toHaveBeenCalledTimes(1);
    act(() => {
      window.dispatchEvent(new Event("pointerdown"));
    });
    expect(result.current.isIdle).toBe(false);
    expect(onActive).toHaveBeenCalledTimes(1);
  });

  it("should not fire callbacks on mount", () => {
    const onIdle = vi.fn();
    const onActive = vi.fn();
    renderHook(() =>
      useIdleTimeout({ timeoutMs: 500, onIdle, onActive }),
    );
    expect(onIdle).not.toHaveBeenCalled();
    expect(onActive).not.toHaveBeenCalled();
  });

  it("should respect a custom events list", () => {
    const { result } = renderHook(() =>
      useIdleTimeout({ timeoutMs: 500, events: ["click"] }),
    );
    act(() => {
      vi.advanceTimersByTime(400);
      window.dispatchEvent(new Event("keydown"));
      vi.advanceTimersByTime(100);
    });
    expect(result.current.isIdle).toBe(true);
    act(() => {
      window.dispatchEvent(new Event("click"));
    });
    expect(result.current.isIdle).toBe(false);
  });

  it("should restart the timer via reset", () => {
    const { result } = renderHook(() => useIdleTimeout({ timeoutMs: 500 }));
    act(() => {
      vi.advanceTimersByTime(400);
      result.current.reset();
      vi.advanceTimersByTime(400);
    });
    expect(result.current.isIdle).toBe(false);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.isIdle).toBe(true);
  });
});
