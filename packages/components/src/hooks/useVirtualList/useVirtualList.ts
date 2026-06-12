"use client";

import type { RefCallback } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

export type VirtualItem = {
  /** Index into your data array. */
  index: number;
  /** Offset from the top of the scroll content in pixels (use for `translateY` / `top`). */
  start: number;
  /** Row height in pixels. */
  size: number;
};

export type UseVirtualListParams = {
  /** Total number of rows in the list. */
  itemCount: number;
  /** Fixed height of every row in pixels (must be > 0). */
  itemHeight: number;
  /** Extra rows rendered above and below the viewport (default `3`). */
  overscan?: number;
};

export type UseVirtualListResult = {
  /** Callback ref for the scrollable container (needs `overflow-y: auto` and a bounded height). */
  setContainerRef: RefCallback<HTMLElement>;
  /** The rows to render, each with its absolute `start` offset. */
  virtualItems: VirtualItem[];
  /** Height of the full list content; set it on an inner spacer element. */
  totalHeight: number;
  /** First rendered index (after overscan). */
  startIndex: number;
  /** Last rendered index (after overscan), `-1` when empty. */
  endIndex: number;
  /** Scroll the container so the given row is at the top. */
  scrollToIndex: (index: number) => void;
};

/**
 * Headless fixed-height list virtualization: renders only the rows visible in the
 * scroll container (plus `overscan`), so lists of tens of thousands of rows stay cheap.
 *
 * Markup recipe: outer container gets `setContainerRef` + `overflow-y: auto` and a height;
 * inside it, one relative spacer div with `height: totalHeight`; each virtual item is
 * absolutely positioned at `translateY(item.start)` with `height: item.size`.
 *
 * Viewport size tracks `ResizeObserver` (when available) and scroll position tracks a
 * passive `scroll` listener. For variable-height rows, reach for a dedicated virtualizer.
 *
 * @param params - {@link UseVirtualListParams}
 * @returns {@link UseVirtualListResult}
 */
export function useVirtualList({
  itemCount,
  itemHeight,
  overscan = 3,
}: UseVirtualListParams): UseVirtualListResult {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const setContainerRef = useCallback((node: HTMLElement | null) => {
    setContainer(node);
  }, []);

  useEffect(() => {
    if (container == null) {
      return;
    }
    const onScroll = () => {
      setScrollTop(container.scrollTop);
    };
    const measure = () => {
      setViewportHeight(container.clientHeight);
    };
    measure();
    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(container);
    }
    return () => {
      container.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [container]);

  const safeItemCount = Math.max(0, Math.floor(itemCount));
  const safeItemHeight = Math.max(1, itemHeight);
  const safeOverscan = Math.max(0, Math.floor(overscan));

  const totalHeight = safeItemCount * safeItemHeight;
  const startIndex =
    safeItemCount === 0
      ? 0
      : Math.max(0, Math.floor(scrollTop / safeItemHeight) - safeOverscan);
  const endIndex =
    safeItemCount === 0
      ? -1
      : Math.min(
          safeItemCount - 1,
          Math.ceil((scrollTop + viewportHeight) / safeItemHeight) -
            1 +
            safeOverscan,
        );

  const virtualItems = useMemo(() => {
    const items: VirtualItem[] = [];
    for (let index = startIndex; index <= endIndex; index += 1) {
      items.push({
        index,
        start: index * safeItemHeight,
        size: safeItemHeight,
      });
    }
    return items;
  }, [endIndex, safeItemHeight, startIndex]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (container == null || safeItemCount === 0) {
        return;
      }
      const clamped = Math.min(Math.max(index, 0), safeItemCount - 1);
      container.scrollTop = clamped * safeItemHeight;
      setScrollTop(container.scrollTop);
    },
    [container, safeItemCount, safeItemHeight],
  );

  return {
    setContainerRef,
    virtualItems,
    totalHeight,
    startIndex,
    endIndex,
    scrollToIndex,
  };
}
