"use client";

import { useCallback, useMemo, useState } from "react";

import type { TableSortDirection, TableSortState } from "../../ui/table/types";
import type { UseTableSortParams, UseTableSortResult } from "./types";

function nextSortDirection(
  currentDirection: TableSortDirection,
): TableSortDirection {
  if (currentDirection === "ascending") {
    return "descending";
  }
  if (currentDirection === "descending") {
    return "none";
  }
  return "ascending";
}

function normalizeSortState<TKey extends string>(
  nextSort: TableSortState<TKey>,
): TableSortState<TKey> {
  if (!nextSort.sortKey || nextSort.sortDirection === "none") {
    return { sortKey: undefined, sortDirection: "none" };
  }
  return nextSort;
}

export function useTableSort<TKey extends string = string>({
  sortKey,
  defaultSortKey,
  sortDirection,
  defaultSortDirection = "none",
  onSortChange,
}: UseTableSortParams<TKey> = {}): UseTableSortResult<TKey> {
  const [internalSort, setInternalSort] = useState<TableSortState<TKey>>(() =>
    normalizeSortState({
      sortKey: defaultSortKey,
      sortDirection: defaultSortDirection,
    }),
  );

  const isControlled = sortKey !== undefined || sortDirection !== undefined;
  const currentSort = normalizeSortState({
    sortKey: isControlled ? sortKey : internalSort.sortKey,
    sortDirection: isControlled
      ? (sortDirection ?? "none")
      : internalSort.sortDirection,
  });

  const setSort = useCallback(
    (nextSort: TableSortState<TKey>) => {
      const normalized = normalizeSortState(nextSort);
      if (!isControlled) {
        setInternalSort(normalized);
      }
      onSortChange?.(normalized);
    },
    [isControlled, onSortChange],
  );

  const clearSort = useCallback(() => {
    setSort({ sortKey: undefined, sortDirection: "none" });
  }, [setSort]);

  const toggleSort = useCallback(
    (nextSortKey: TKey) => {
      const direction =
        currentSort.sortKey === nextSortKey
          ? nextSortDirection(currentSort.sortDirection)
          : "ascending";

      setSort({
        sortKey: nextSortKey,
        sortDirection: direction,
      });
    },
    [currentSort.sortDirection, currentSort.sortKey, setSort],
  );

  const getSortProps = useCallback(
    (nextSortKey: TKey) => ({
      sortKey: nextSortKey,
      sortDirection:
        currentSort.sortKey === nextSortKey
          ? currentSort.sortDirection
          : "none",
      onSortChange: (nextSort: TableSortState) => {
        setSort(nextSort as TableSortState<TKey>);
      },
    }),
    [currentSort.sortDirection, currentSort.sortKey, setSort],
  );

  return useMemo(
    () => ({
      sortKey: currentSort.sortKey,
      sortDirection: currentSort.sortDirection,
      setSort,
      clearSort,
      toggleSort,
      getSortProps,
    }),
    [
      clearSort,
      currentSort.sortDirection,
      currentSort.sortKey,
      getSortProps,
      setSort,
      toggleSort,
    ],
  );
}
