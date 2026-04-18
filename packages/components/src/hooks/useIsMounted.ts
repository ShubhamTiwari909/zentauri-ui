"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a stable function that reports whether the component is currently mounted.
 *
 * Useful to guard async completions (fetch, timers) so `setState` does not run after unmount.
 * The returned function identity is stable across renders; it reads a ref updated in an effect.
 *
 * @returns `() => boolean` — `true` after mount until unmount cleanup runs.
 */
export function useIsMounted(): () => boolean {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback(() => mounted.current, []);
}
