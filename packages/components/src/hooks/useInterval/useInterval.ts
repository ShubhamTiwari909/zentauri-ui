"use client";

import { useEffect, useRef } from "react";

/**
 * Declarative `setInterval`: runs `callback` every `delayMs` milliseconds with automatic cleanup.
 *
 * - The latest callback is kept in a ref, so a new inline function each render does not restart the timer.
 * - Pass `null` as the delay to pause the interval; pass a number again to resume.
 * - Changing `delayMs` clears the previous interval and starts a fresh one.
 *
 * @param callback - Function invoked on every tick.
 * @param delayMs - Interval in milliseconds, or `null` to pause.
 */
export function useInterval(
  callback: () => void,
  delayMs: number | null,
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs == null) {
      return;
    }
    const id = window.setInterval(() => {
      callbackRef.current();
    }, delayMs);
    return () => {
      window.clearInterval(id);
    };
  }, [delayMs]);
}
