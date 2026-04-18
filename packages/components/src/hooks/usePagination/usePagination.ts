"use client";

import { useCallback, useMemo, useState } from "react";

import type {
  PaginationPageItem,
  UsePaginationParams,
  UsePaginationResult,
} from "../../ui/pagination/types";
import { clampPage, range } from "../../lib/utils";

export type { PaginationPageItem } from "../../ui/pagination/types";

export type BuildPaginationItemsParams = {
  pageCount: number;
  currentPage: number;
  siblingCount: number;
  boundaryCount: number;
};

/**
 * Headless pagination state: current page, derived page button items, and prev/next helpers.
 *
 * Supports controlled mode when `page` is passed from the parent, or internal state seeded by `defaultPage`.
 * All page indices are **1-based** and clamped to `[1, pageCount]` via {@link clampPage}. `items` is memoized from
 * {@link buildPaginationItems} for rendering numeric pages and ellipsis gaps.
 *
 * @param params - See `UsePaginationParams` in `../ui/pagination/types` for full fields (`pageCount`, `page`, `onPageChange`, etc.).
 * @returns Current page, item list, `setPage`, navigation helpers, and `canGoPrev` / `canGoNext` flags.
 */
export function usePagination({
  pageCount,
  page,
  defaultPage = 1,
  siblingCount = 1,
  boundaryCount = 1,
  onPageChange,
}: UsePaginationParams): UsePaginationResult {
  const [internalPage, setInternalPage] = useState(() =>
    clampPage(defaultPage, pageCount),
  );

  const isControlled = page !== undefined;
  const currentPage = clampPage(isControlled ? page : internalPage, pageCount);

  const setPage = useCallback(
    (next: number) => {
      const clamped = clampPage(next, pageCount);
      if (!isControlled) {
        setInternalPage(clamped);
      }
      onPageChange?.(clamped);
    },
    [isControlled, onPageChange, pageCount],
  );

  const items = useMemo(
    () =>
      buildPaginationItems({
        pageCount,
        currentPage,
        siblingCount,
        boundaryCount,
      }),
    [boundaryCount, currentPage, pageCount, siblingCount],
  );

  const canGoPrev = pageCount > 0 && currentPage > 1;
  const canGoNext = pageCount > 0 && currentPage < pageCount;

  const goPrev = useCallback(() => {
    if (canGoPrev) {
      setPage(currentPage - 1);
    }
  }, [canGoPrev, currentPage, setPage]);

  const goNext = useCallback(() => {
    if (canGoNext) {
      setPage(currentPage + 1);
    }
  }, [canGoNext, currentPage, setPage]);

  return {
    currentPage,
    pageCount,
    items,
    setPage,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
  };
}

/**
 * Builds the ordered list of page numbers and ellipsis markers for a pagination control.
 *
 * @param params.pageCount - Total number of pages (must be >= 0; empty list when 0).
 * @param params.currentPage - Active page index (1-based).
 * @param params.siblingCount - How many page buttons to show on each side of the current page.
 * @param params.boundaryCount - How many pages to pin at the start and end of the range.
 * @returns Items suitable for rendering, e.g. page `1`, ellipsis gap, middle window, ellipsis, last page.
 */
export function buildPaginationItems({
  pageCount,
  currentPage,
  siblingCount,
  boundaryCount,
}: BuildPaginationItemsParams): PaginationPageItem[] {
  if (pageCount <= 0) {
    return [];
  }

  const safeBoundary = Math.max(1, boundaryCount);
  const safeSibling = Math.max(0, siblingCount);
  const current = clampPage(currentPage, pageCount);

  const totalNumbers = safeBoundary * 2 + safeSibling * 2 + 1;
  if (pageCount <= totalNumbers) {
    return range(1, pageCount).map((value) => ({ type: "page", value }));
  }

  const leftBoundaryEnd = safeBoundary;
  const rightBoundaryStart = pageCount - safeBoundary + 1;

  const siblingsStart = Math.max(current - safeSibling, leftBoundaryEnd + 1);
  const siblingsEnd = Math.min(current + safeSibling, rightBoundaryStart - 1);

  const pages = new Set<number>();
  for (let p = 1; p <= leftBoundaryEnd; p += 1) {
    pages.add(p);
  }
  for (let p = rightBoundaryStart; p <= pageCount; p += 1) {
    pages.add(p);
  }
  for (let p = siblingsStart; p <= siblingsEnd; p += 1) {
    pages.add(p);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items: PaginationPageItem[] = [];

  for (let i = 0; i < sorted.length; i += 1) {
    const value = sorted[i];
    const prev = sorted[i - 1];
    if (i > 0 && prev !== undefined && value && value - prev > 1) {
      items.push({ type: "ellipsis", key: `gap-${prev}-${value}` });
    }
    items.push({ type: "page", value: value as number });
  }

  return items;
}
