"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

export type UseDebouncedCallbackResult<Args extends unknown[], Result> = {
  /** Schedule the latest arguments; each call restarts the trailing timer. */
  debouncedCallback: (...args: Args) => void;
  /** Discard scheduled work. Does not cancel a callback that has already started. */
  cancel: () => void;
  /** Run pending work now and return its result, or undefined when idle. */
  flush: () => Result | undefined;
  /** Reactive state for scheduled work, not for an in-flight async callback. */
  isPending: boolean;
};

/**
 * Debounces actions on the trailing edge with stable scheduling/cancel/flush functions.
 * Uses the latest committed callback and the most recently scheduled arguments.
 * Updating the delay affects future calls; it does not move an existing deadline.
 * Unmounting discards work without flushing. A zero delay still runs asynchronously.
 *
 * Call the controls from events/effects, not during render. Pass plain values rather
 * than retaining an event object. Async callbacks are supported, but isPending only
 * describes the timer; handle async errors/results inside the callback or via flush.
 *
 * @param callback - Work to invoke after calls stop for the delay interval.
 * @param delayMs - Finite delay from 0 through 2,147,483,647 milliseconds.
 * @returns Stable controls and reactive pending state; this is trailing-only debounce.
 */
export function useDebouncedCallback<Args extends unknown[], Result>(
  callback: (...args: Args) => Result,
  delayMs: number,
): UseDebouncedCallbackResult<Args, Result> {
  if (!Number.isFinite(delayMs) || delayMs < 0 || delayMs > 2_147_483_647) {
    throw new RangeError(
      "delayMs must be finite and between 0 and 2147483647.",
    );
  }

  const callbackRef = useRef(callback);
  const delayRef = useRef(delayMs);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const argsRef = useRef<Args | undefined>(undefined);
  const mountedRef = useRef(true);
  const [isPending, setIsPending] = useState(false);

  // Publish only committed inputs so suspended/abandoned renders cannot leak work.
  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
    delayRef.current = delayMs;
  }, [callback, delayMs]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    argsRef.current = undefined;
  }, []);

  useIsomorphicLayoutEffect(() => {
    mountedRef.current = true;
    // Child layout effects may schedule before this effect. Reconnecting after
    // cleanup (including StrictMode replay) has no remaining arguments/timer.
    setIsPending(argsRef.current !== undefined);
    return () => {
      mountedRef.current = false;
      clearTimer();
    };
  }, [clearTimer]);

  const cancel = useCallback(() => {
    clearTimer();
    if (mountedRef.current) setIsPending(false);
  }, [clearTimer]);

  const flush = useCallback((): Result | undefined => {
    const args = argsRef.current;
    if (args === undefined || !mountedRef.current) return undefined;
    clearTimer();
    setIsPending(false);
    // Clear before invoking: the callback may schedule another debounce cycle.
    return callbackRef.current(...args);
  }, [clearTimer]);

  const debouncedCallback = useCallback(
    (...args: Args) => {
      if (!mountedRef.current) return;
      clearTimer();
      argsRef.current = args;
      setIsPending(true);
      timerRef.current = setTimeout(flush, delayRef.current);
    },
    [clearTimer, flush],
  );

  return useMemo(
    () => ({ debouncedCallback, cancel, flush, isPending }),
    [debouncedCallback, cancel, flush, isPending],
  );
}
