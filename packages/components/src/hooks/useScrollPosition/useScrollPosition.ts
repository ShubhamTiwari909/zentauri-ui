"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";

export type ScrollPosition = {
  x: number;
  y: number;
};

export type UseScrollPositionParams<T extends HTMLElement = HTMLElement> = {
  /** Scroll container to observe; omit to track the window. */
  target?: RefObject<T | null>;
};

/**
 * Tracks the scroll offset of the window (default) or a scrollable element.
 *
 * - Window mode reads `scrollX` / `scrollY`; element mode reads `scrollLeft` / `scrollTop`.
 * - Subscribes with a passive `scroll` listener and reads the initial position on mount.
 * - For high-frequency consumers, derive throttled values downstream (e.g. with
 *   `useThrottledCallback`) rather than throttling the source of truth.
 *
 * @param params - {@link UseScrollPositionParams}
 * @returns Latest `{ x, y }` scroll offset in pixels.
 */
export function useScrollPosition<T extends HTMLElement = HTMLElement>(
  params: UseScrollPositionParams<T> = {},
): ScrollPosition {
  const { target } = params;
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const element = target?.current ?? null;
    const node: Window | T | null = target ? element : window;
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
  }, [target]);

  return position;
}
