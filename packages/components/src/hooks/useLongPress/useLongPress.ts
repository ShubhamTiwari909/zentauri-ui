"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef } from "react";

export type UseLongPressOptions = {
  /** Hold duration in milliseconds before the press counts as "long" (default `500`). */
  thresholdMs?: number;
  /** Pointer travel in pixels that cancels the press (default `10`). */
  moveTolerancePx?: number;
  /** Called when the pointer goes down (press attempt starts). */
  onStart?: (event: ReactPointerEvent) => void;
  /** Called on release after a long press fired. */
  onFinish?: (event: ReactPointerEvent) => void;
  /** Called when the press is released or cancelled before the threshold. */
  onCancel?: (event: ReactPointerEvent) => void;
};

export type UseLongPressHandlers = {
  onPointerDown: (event: ReactPointerEvent) => void;
  onPointerMove: (event: ReactPointerEvent) => void;
  onPointerUp: (event: ReactPointerEvent) => void;
  onPointerLeave: (event: ReactPointerEvent) => void;
};

/**
 * Long-press gesture detection built on pointer events, so it works for mouse, touch, and pen.
 *
 * Spread the returned handlers onto the target element. After the pointer is held
 * `thresholdMs` without travelling more than `moveTolerancePx`, `callback` fires once;
 * releasing afterwards calls `onFinish`, while early release / movement / leaving the
 * element calls `onCancel`.
 *
 * Pair with `touch-action` / `select-none` CSS on touch targets to suppress native
 * scrolling or text selection during the hold where needed.
 *
 * @param callback - Invoked once when the press crosses the threshold.
 * @param options - {@link UseLongPressOptions}
 * @returns Spreadable pointer handlers ({@link UseLongPressHandlers}).
 */
export function useLongPress(
  callback: (event: ReactPointerEvent) => void,
  options: UseLongPressOptions = {},
): UseLongPressHandlers {
  const {
    thresholdMs = 500,
    moveTolerancePx = 10,
    onStart,
    onFinish,
    onCancel,
  } = options;

  const callbackRef = useRef(callback);
  const onStartRef = useRef(onStart);
  const onFinishRef = useRef(onFinish);
  const onCancelRef = useRef(onCancel);

  useEffect(() => {
    callbackRef.current = callback;
    onStartRef.current = onStart;
    onFinishRef.current = onFinish;
    onCancelRef.current = onCancel;
  }, [callback, onCancel, onFinish, onStart]);

  const timeoutRef = useRef<number | undefined>(undefined);
  const triggeredRef = useRef(false);
  const pressingRef = useRef(false);
  const originRef = useRef({ x: 0, y: 0 });

  const stopTimer = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  useEffect(() => stopTimer, [stopTimer]);

  const cancel = useCallback(
    (event: ReactPointerEvent) => {
      if (!pressingRef.current) {
        return;
      }
      pressingRef.current = false;
      stopTimer();
      if (!triggeredRef.current) {
        onCancelRef.current?.(event);
      }
    },
    [stopTimer],
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      pressingRef.current = true;
      triggeredRef.current = false;
      originRef.current = { x: event.clientX, y: event.clientY };
      onStartRef.current?.(event);
      stopTimer();
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = undefined;
        if (pressingRef.current) {
          triggeredRef.current = true;
          callbackRef.current(event);
        }
      }, thresholdMs);
    },
    [stopTimer, thresholdMs],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent) => {
      if (!pressingRef.current || triggeredRef.current) {
        return;
      }
      const dx = event.clientX - originRef.current.x;
      const dy = event.clientY - originRef.current.y;
      if (Math.hypot(dx, dy) > moveTolerancePx) {
        cancel(event);
      }
    },
    [cancel, moveTolerancePx],
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent) => {
      if (!pressingRef.current) {
        return;
      }
      const triggered = triggeredRef.current;
      pressingRef.current = false;
      stopTimer();
      if (triggered) {
        onFinishRef.current?.(event);
      } else {
        onCancelRef.current?.(event);
      }
    },
    [stopTimer],
  );

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave: cancel,
  };
}
