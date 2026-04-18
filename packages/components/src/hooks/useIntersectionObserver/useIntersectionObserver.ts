"use client";

import type { RefCallback } from "react";
import { useCallback, useEffect, useState } from "react";

export type UseIntersectionObserverParams = IntersectionObserverInit & {
  /** When `false`, disconnects the observer until re-enabled (saves work for hidden or inactive content). */
  enabled?: boolean;
};

/**
 * Observes a single element with the browser `IntersectionObserver` API and exposes the latest entry.
 *
 * Returns a callback ref: assign it to the element to measure. When `enabled` is false or `IntersectionObserver`
 * is undefined (unsupported environment), the effect is a no-op and `entry` may stay `undefined`.
 *
 * @typeParam T - Observed element type.
 * @param params - Standard `IntersectionObserverInit` fields plus optional `enabled` (default `true`).
 * @returns `[setRef, entry]` where `entry` is the most recent callback record for the observed target.
 */
export function useIntersectionObserver<T extends Element>(
  params: UseIntersectionObserverParams = {},
): [RefCallback<T>, IntersectionObserverEntry | undefined] {
  const { enabled = true, root, rootMargin, threshold } = params;
  const [element, setElement] = useState<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>(
    undefined,
  );

  const setRef = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!enabled || element == null) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(
      (records) => {
        setEntry(records[0]);
      },
      { root, rootMargin, threshold },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element, enabled, root, rootMargin, threshold]);

  return [setRef, entry];
}
