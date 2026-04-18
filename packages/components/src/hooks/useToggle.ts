"use client";

import { useCallback, useState } from "react";

/**
 * Simple boolean state with `toggle()` and an explicit `set(next)` setter.
 *
 * @param initialValue - Starting boolean (default `false`).
 * @returns `[on, toggle, set]` where `on` is the flag, `toggle` flips it, and `set` assigns an absolute value.
 */
export function useToggle(
  initialValue = false,
): [boolean, () => void, (next: boolean) => void] {
  const [on, setOn] = useState(initialValue);
  const toggle = useCallback(() => {
    setOn((previous) => !previous);
  }, []);
  const set = useCallback((next: boolean) => {
    setOn(next);
  }, []);
  return [on, toggle, set];
}
