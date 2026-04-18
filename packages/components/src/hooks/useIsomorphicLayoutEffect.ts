"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Runs `useLayoutEffect` in the browser and `useEffect` on the server to avoid SSR warnings.
 *
 * Use for DOM measurements or synchronous paint updates that must run before the browser paints,
 * but only when the code path is safe on the client; on the server the timing matches `useEffect`.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
