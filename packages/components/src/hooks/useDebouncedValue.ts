"use client";

import { useEffect, useState } from "react";

/**
 * Returns a lagged copy of `value` that only updates after `value` has been stable for `delayMs`.
 * Each change to `value` or `delayMs` resets the timer; rapid updates collapse into one committed update.
 *
 * Common uses: search inputs, resize-driven layout, or any expensive work that should not run on every keystroke.
 *
 * @typeParam T - Value type (any JSON-serializable or referential type).
 * @param value - Live value from props or state.
 * @param delayMs - Debounce interval in milliseconds.
 * @returns The last value that survived the full delay without a newer `value` arriving.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
    }, delayMs);
    return () => {
      clearTimeout(id);
    };
  }, [delayMs, value]);

  return debounced;
}
