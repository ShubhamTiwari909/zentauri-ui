"use client";

import { useCallback, useMemo, useState } from "react";

import type { UsePaginationParams, UsePaginationResult } from "./types";
import { buildPaginationItems, clampPage } from "./pagination-logic";

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
  const currentPage = clampPage(
    isControlled ? page : internalPage,
    pageCount,
  );

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
