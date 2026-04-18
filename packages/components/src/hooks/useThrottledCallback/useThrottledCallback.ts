"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a stable, throttled version of `callback` that runs at most once per `intervalMs`.
 *
 * If invoked again inside the cooldown window, the extra calls are **dropped** (no trailing flush). The latest
 * `callback` reference is always used via a ref, so changing the handler does not reset the throttle clock.
 *
 * @typeParam T - Void function type (`(...args) => void`).
 * @param callback - Work to run when the throttle gate opens.
 * @param intervalMs - Minimum milliseconds between invocations.
 * @returns Throttled function with the same call signature as `callback`.
 */
export function useThrottledCallback<
  T extends (...args: any[]) => void,
>(callback: T, intervalMs: number): T {
  const callbackRef = useRef(callback);
  const lastRunRef = useRef(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRunRef.current >= intervalMs) {
        lastRunRef.current = now;
        callbackRef.current(...args);
      }
    },
    [intervalMs],
  ) as T;
}
