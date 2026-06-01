"use client";

import { useCallback, useMemo, useState } from "react";

import type {
  TableFilterState,
  UseTableFilterParams,
  UseTableFilterResult,
} from "./types";

function normalizeFilters<TKey extends string>(
  filters: TableFilterState<TKey>,
): TableFilterState<TKey> {
  return Object.fromEntries(
    Object.entries(filters).filter(
      (entry): entry is [TKey, string] =>
        typeof entry[1] === "string" && entry[1].trim().length > 0,
    ),
  ) as TableFilterState<TKey>;
}

function defaultColumnValue<TData, TKey extends string>(
  row: TData,
  filterKey: TKey,
): unknown {
  if (row && typeof row === "object" && filterKey in row) {
    return (row as Record<TKey, unknown>)[filterKey];
  }
  return undefined;
}

function defaultFilterPredicate<TData, TKey extends string>(
  row: TData,
  filterValue: string,
  filterKey: TKey,
  getColumnValue: (row: TData, filterKey: TKey) => unknown,
): boolean {
  const columnValue = getColumnValue(row, filterKey);
  if (columnValue == null) {
    return false;
  }

  return String(columnValue)
    .toLocaleLowerCase()
    .includes(filterValue.toLocaleLowerCase());
}

export function useTableFilter<TData, TKey extends string = string>({
  data,
  filters,
  defaultFilters = {},
  onFiltersChange,
  getColumnValue = defaultColumnValue,
  filterPredicate,
}: UseTableFilterParams<TData, TKey>): UseTableFilterResult<TData, TKey> {
  const [internalFilters, setInternalFilters] = useState<
    TableFilterState<TKey>
  >(() => normalizeFilters(defaultFilters));

  const isControlled = filters !== undefined;
  const currentFilters = useMemo(
    () => normalizeFilters(isControlled ? filters : internalFilters),
    [filters, internalFilters, isControlled],
  );

  const setFilters = useCallback(
    (nextFilters: TableFilterState<TKey>) => {
      const normalized = normalizeFilters(nextFilters);
      if (!isControlled) {
        setInternalFilters(normalized);
      }
      onFiltersChange?.(normalized);
    },
    [isControlled, onFiltersChange],
  );

  const setFilter = useCallback(
    (filterKey: TKey, value: string) => {
      setFilters({
        ...currentFilters,
        [filterKey]: value,
      });
    },
    [currentFilters, setFilters],
  );

  const clearFilter = useCallback(
    (filterKey: TKey) => {
      const nextFilters = { ...currentFilters };
      delete nextFilters[filterKey];
      setFilters(nextFilters);
    },
    [currentFilters, setFilters],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  const activeEntries = useMemo(
    () => Object.entries(currentFilters) as [TKey, string][],
    [currentFilters],
  );

  const filteredData = useMemo(() => {
    if (activeEntries.length === 0) {
      return [...data];
    }

    return data.filter((row) =>
      activeEntries.every(([filterKey, filterValue]) =>
        filterPredicate
          ? filterPredicate(row, filterValue, filterKey)
          : defaultFilterPredicate(row, filterValue, filterKey, getColumnValue),
      ),
    );
  }, [activeEntries, data, filterPredicate, getColumnValue]);

  return {
    filters: currentFilters,
    filteredData,
    hasActiveFilters: activeEntries.length > 0,
    setFilter,
    setFilters,
    clearFilter,
    clearFilters,
  };
}
