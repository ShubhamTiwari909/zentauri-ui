"use client";

import { useEffect, useState } from "react";

/**
 * Subscribes to `window.matchMedia(query)` and returns whether the query currently matches.
 *
 * On the server or when `matchMedia` is missing, `defaultValue` is used for the initial render and the effect no-ops.
 * The `change` listener keeps `matches` updated when the viewport or user settings change.
 *
 * @param query - A valid media query string, e.g. `"(min-width: 768px)"`.
 * @param defaultValue - Value to use before hydration or when `matchMedia` is unavailable (default `false`).
 * @returns Current `matches` boolean for the query.
 */
export function useMediaQuery(
  query: string,
  defaultValue = false,
): boolean {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }
    const media = window.matchMedia(query);
    const onChange = () => {
      setMatches(media.matches);
    };
    setMatches(media.matches);
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [query]);

  return matches;
}
