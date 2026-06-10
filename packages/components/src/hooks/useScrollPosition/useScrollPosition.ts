"use client";

import type { RefCallback, RefObject } from "react";
import { useCallback, useEffect, useState } from "react";

export type ScrollPosition = {
  x: number;
  y: number;
};

export type UseScrollPositionParams<T extends HTMLElement = HTMLElement> = {
  /**
   * Scroll container to observe via a pre-populated RefObject.
   * For elements that mount asynchronously, use the returned `setRef` callback ref instead.
   */
  target?: RefObject<T | null>;
};

export type UseScrollPositionResult<T extends HTMLElement = HTMLElement> =
  ScrollPosition & {
    /**
     * Callback ref to attach to a scroll container — works correctly with elements
     * that are null on initial render (lazy / conditional mounts). Pass this as `ref`
     * on the scrollable element when you cannot guarantee the ref is populated at mount.
     */
    setRef: RefCallback<T>;
  };

/**
 * Tracks the scroll offset of the window (default) or a scrollable element.
 *
 * - Window mode reads `scrollX` / `scrollY`; element mode reads `scrollLeft` / `scrollTop`.
 * - Subscribes with a passive `scroll` listener and reads the initial position on mount.
 * - Pass a pre-populated `target` RefObject **or** use the returned `setRef` callback ref on
 *   the scrollable element. Prefer `setRef` for elements that may be null on the first render
 *   (conditional mounts, portals) — it stores the element in state so the effect re-attaches
 *   correctly when the element becomes available.
 * - For high-frequency consumers, derive throttled values downstream (e.g. with
 *   `useThrottledCallback`) rather than throttling the source of truth.
 *
 * @param params - {@link UseScrollPositionParams}
 * @returns Latest `{ x, y }` scroll offset in pixels plus a `setRef` callback ref.
 */
export function useScrollPosition<T extends HTMLElement = HTMLElement>(
  params: UseScrollPositionParams<T> = {},
): UseScrollPositionResult<T> {
  const { target } = params;

  // Track the element in state so the scroll listener effect reruns when the element
  // is assigned (handles callback-ref / lazy-mount patterns).
  const [element, setElement] = useState<T | null>(
    () => target?.current ?? null,
  );
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  // Sync element state when the target RefObject changes (pre-populated refs).
  useEffect(() => {
    if (target?.current != null) {
      setElement(target.current);
    }
  }, [target]);

  const setRef = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    const node: Window | T | null =
      element ?? (typeof window === "undefined" ? null : window);
    if (node == null) {
      return;
    }
    const read = (): ScrollPosition =>
      element == null
        ? { x: window.scrollX, y: window.scrollY }
        : { x: element.scrollLeft, y: element.scrollTop };
    const onScroll = () => {
      setPosition(read());
    };
    onScroll();
    node.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      node.removeEventListener("scroll", onScroll);
    };
  }, [element]);

  return { x: position.x, y: position.y, setRef };
}
