"use client";

import { useCallback, useEffect, useRef } from "react";

export type UseTimeoutResult = {
  /** Cancel the pending timeout (no-op if already fired or cleared). */
  clear: () => void;
  /** Cancel any pending timeout and schedule a fresh one with the current delay. */
  reset: () => void;
};

/**
 * Declarative `setTimeout`: runs `callback` once after `delayMs` milliseconds with automatic cleanup.
 *
 * - The latest callback is kept in a ref, so a new inline function each render does not reschedule.
 * - Pass `null` as the delay to cancel scheduling entirely.
 * - Changing `delayMs` cancels the pending timeout and schedules a new one.
 *
 * @param callback - Function invoked when the timeout fires.
 * @param delayMs - Delay in milliseconds, or `null` to disable.
 * @returns `{ clear, reset }` to cancel or restart the timeout imperatively.
 */
export function useTimeout(
  callback: () => void,
  delayMs: number | null,
): UseTimeoutResult {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  const reset = useCallback(() => {
    clear();
    if (delayMs == null) {
      return;
    }
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = undefined;
      callbackRef.current();
    }, delayMs);
  }, [clear, delayMs]);

  useEffect(() => {
    reset();
    return clear;
  }, [clear, reset]);

  return { clear, reset };
}
