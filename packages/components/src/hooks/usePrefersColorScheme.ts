"use client";

import { useMediaQuery } from "./useMediaQuery";

export type ColorSchemePreference = "light" | "dark";

/**
 * Resolves the user’s preferred color scheme from `prefers-color-scheme: dark` via {@link useMediaQuery}.
 *
 * @param defaultScheme - Hydration / SSR fallback when media queries are unavailable (`"light"` or `"dark"`).
 * @returns `"dark"` when the dark media query matches, otherwise `"light"`.
 */
export function usePrefersColorScheme(
  defaultScheme: ColorSchemePreference = "light",
): ColorSchemePreference {
  const prefersDark = useMediaQuery(
    "(prefers-color-scheme: dark)",
    defaultScheme === "dark",
  );
  return prefersDark ? "dark" : "light";
}
