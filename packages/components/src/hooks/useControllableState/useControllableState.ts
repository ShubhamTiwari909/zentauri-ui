"use client";

import { useCallback, useRef, useState } from "react";

export type UseControllableStateParams<T> = {
  /** When defined, the hook is controlled and this value is returned as state. */
  value?: T;
  /** Initial / fallback value when uncontrolled (`value` is `undefined`). */
  defaultValue: T;
  /** Notified on every `setValue` with the resolved next value (controlled and uncontrolled). */
  onChange?: (next: T) => void;
};

/**
 * Implements the React “controlled vs uncontrolled” pattern as a single state tuple.
 *
 * - If `value` is `undefined`, internal state mirrors `defaultValue` and updates on `setValue`.
 * - If `value` is defined, returned state follows `value`; `setValue` still calls `onChange` so the parent can update.
 * - `setValue` accepts either the next value or an updater `(prev) => next` (updater uses the current `value` in controlled mode).
 *
 * @typeParam T - State value type.
 * @param params - `value`, `defaultValue`, and optional `onChange`.
 * @returns `[value, setValue]` compatible with `useState`-style usage.
 */
export function useControllableState<T>({
  value: valueProp,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>): [T, (next: T | ((prev: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolled;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(value) : next;
      if (!isControlled) {
        setUncontrolled(resolved);
      }
      onChangeRef.current?.(resolved);
    },
    [isControlled, value],
  );

  return [value, setValue];
}
