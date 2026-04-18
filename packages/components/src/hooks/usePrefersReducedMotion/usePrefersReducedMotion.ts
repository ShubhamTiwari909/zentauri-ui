"use client";

import { useMediaQuery } from "../useMediaQuery";

/**
 * Returns whether the user prefers reduced motion (`prefers-reduced-motion: reduce`).
 *
 * Use to disable non-essential animations or switch to instant transitions for accessibility.
 *
 * @returns `true` when reduced motion is requested.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
