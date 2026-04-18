"use client";

import type { RefCallback } from "react";

import { useIntersectionObserver } from "../useIntersectionObserver";

export type UseInViewParams = IntersectionObserverInit & {
  /** When `false`, no observer is attached (useful to pause work when off-screen lists are virtualized). */
  enabled?: boolean;
};

/**
 * Convenience wrapper around {@link useIntersectionObserver} that exposes only a boolean `inView` flag.
 *
 * `inView` is `true` when the latest `IntersectionObserverEntry.isIntersecting` is truthy; otherwise `false`.
 * Accepts the same `root`, `rootMargin`, `threshold`, and `enabled` options as the underlying observer.
 *
 * @typeParam T - Observed element type.
 * @param params - IntersectionObserver options plus optional `enabled` flag.
 * @returns `[setRef, inView]` callback ref and intersection boolean.
 */
export function useInView<T extends Element>(
  params: UseInViewParams = {},
): [RefCallback<T>, boolean] {
  const [setRef, entry] = useIntersectionObserver<T>(params);
  const inView = Boolean(entry?.isIntersecting);
  return [setRef, inView];
}
