"use client";

import { useEffect, useRef } from "react";

/**
 * Returns the value passed in on the previous render (`undefined` on first render).
 *
 * The ref is updated in an effect after each committed render, so during a render
 * you always see the value from the previous one — handy for diffing props/state,
 * animation direction, or "changed since last render" checks.
 *
 * @typeParam T - Tracked value type.
 * @param value - The current value to track.
 * @returns The value from the previous render, or `undefined` before the first update.
 */
export function usePrevious<T>(value: T): T | undefined {
  const previousRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return previousRef.current;
}
