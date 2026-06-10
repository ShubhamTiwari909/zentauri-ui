import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PointerEvent as ReactPointerEvent } from "react";

import { useLongPress } from "./useLongPress";

function pointerEvent(x = 0, y = 0): ReactPointerEvent {
  return { clientX: x, clientY: y } as ReactPointerEvent;
}

describe("useLongPress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should fire the callback after the threshold", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useLongPress(callback, { thresholdMs: 400 }),
    );
    act(() => {
      result.current.onPointerDown(pointerEvent());
    });
    act(() => {
      vi.advanceTimersByTime(399);
    });
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should cancel when released early", () => {
    const callback = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useLongPress(callback, { thresholdMs: 400, onCancel }),
    );
    act(() => {
      result.current.onPointerDown(pointerEvent());
      vi.advanceTimersByTime(200);
      result.current.onPointerUp(pointerEvent());
      vi.advanceTimersByTime(400);
    });
    expect(callback).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onStart and onFinish around a completed press", () => {
    const callback = vi.fn();
    const onStart = vi.fn();
    const onFinish = vi.fn();
    const { result } = renderHook(() =>
      useLongPress(callback, { thresholdMs: 300, onStart, onFinish }),
    );
    act(() => {
      result.current.onPointerDown(pointerEvent());
    });
    expect(onStart).toHaveBeenCalledTimes(1);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    act(() => {
      result.current.onPointerUp(pointerEvent());
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("should cancel when the pointer travels beyond the tolerance", () => {
    const callback = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useLongPress(callback, {
        thresholdMs: 300,
        moveTolerancePx: 10,
        onCancel,
      }),
    );
    act(() => {
      result.current.onPointerDown(pointerEvent(0, 0));
      result.current.onPointerMove(pointerEvent(4, 4));
      vi.advanceTimersByTime(100);
      result.current.onPointerMove(pointerEvent(30, 0));
      vi.advanceTimersByTime(300);
    });
    expect(callback).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should cancel when the pointer leaves the target", () => {
    const callback = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useLongPress(callback, { thresholdMs: 300, onCancel }),
    );
    act(() => {
      result.current.onPointerDown(pointerEvent());
      vi.advanceTimersByTime(100);
      result.current.onPointerLeave(pointerEvent());
      vi.advanceTimersByTime(300);
    });
    expect(callback).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
