"use client";

import type { RefCallback } from "react";
import { useCallback, useEffect, useState } from "react";

export type ElementSize = {
  width: number;
  height: number;
};

export type UseResizeObserverParams = {
  /** When `false`, no `ResizeObserver` is attached. */
  enabled?: boolean;
};

/**
 * Observes an element’s `contentRect` size via `ResizeObserver` and exposes `{ width, height }`.
 *
 * When `ResizeObserver` is undefined or `enabled` is false, size may remain `undefined`. Uses the first
 * entry from the observer callback (`entries[0]`) aligned with the single observed node.
 *
 * @typeParam T - Observed element type.
 * @param params - Optional `{ enabled }` (default `true`).
 * @returns `[setRef, size]` callback ref and latest measured size.
 */
export function useResizeObserver<T extends Element>(
  params: UseResizeObserverParams = {},
): [RefCallback<T>, ElementSize | undefined] {
  const { enabled = true } = params;
  const [element, setElement] = useState<T | null>(null);
  const [size, setSize] = useState<ElementSize | undefined>(undefined);

  const setRef = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!enabled || element == null) {
      return;
    }
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? {
        width: 0,
        height: 0,
      };
      setSize({ width, height });
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element, enabled]);

  return [setRef, size];
}
