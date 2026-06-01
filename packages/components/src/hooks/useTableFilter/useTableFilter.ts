"use client";

import { useCallback, useMemo, useState } from "react";

import type {
  TableFilterState,
  UseTableFilterParams,
  UseTableFilterResult,
} from "./types";

function normalizeFilters<TKey extends string>(
  filters: TableFilterState<TKey> | null | undefined,
): TableFilterState<TKey> {
  if (!filters || typeof filters !== "object") {
    return {};
  }

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

  const updateFilters = useCallback(
    (
      updater: (
        previousFilters: TableFilterState<TKey>,
      ) => TableFilterState<TKey>,
    ) => {
      if (isControlled) {
        const normalized = normalizeFilters(updater(currentFilters));
        onFiltersChange?.(normalized);
        return;
      }

      setInternalFilters((previousFilters) => {
        const normalized = normalizeFilters(updater(previousFilters));
        onFiltersChange?.(normalized);
        return normalized;
      });
    },
    [currentFilters, isControlled, onFiltersChange],
  );

  const setFilter = useCallback(
    (filterKey: TKey, value: string) => {
      updateFilters((previousFilters) => ({
        ...previousFilters,
        [filterKey]: value,
      }));
    },
    [updateFilters],
  );

  const clearFilter = useCallback(
    (filterKey: TKey) => {
      updateFilters((previousFilters) => {
        const nextFilters = { ...previousFilters };
        delete nextFilters[filterKey];
        return nextFilters;
      });
    },
    [updateFilters],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  const activeFilters = useMemo(
    () =>
      (Object.entries(currentFilters) as [TKey, string][]).map(
        ([filterKey, filterValue]) => ({
          filterKey,
          filterValue,
          lowerFilterValue: filterValue.toLowerCase(),
        }),
      ),
    [currentFilters],
  );

  const filteredData = useMemo(() => {
    if (activeFilters.length === 0) {
      return [...data];
    }

    return data.filter((row) =>
      activeFilters.every(({ filterKey, filterValue, lowerFilterValue }) => {
        if (filterPredicate) {
          return filterPredicate(row, filterValue, filterKey);
        }

        const columnValue = getColumnValue(row, filterKey);
        if (columnValue == null) {
          return false;
        }

        return String(columnValue).toLowerCase().includes(lowerFilterValue);
      }),
    );
  }, [activeFilters, data, filterPredicate, getColumnValue]);

  return {
    filters: currentFilters,
    filteredData,
    hasActiveFilters: activeFilters.length > 0,
    setFilter,
    setFilters,
    clearFilter,
    clearFilters,
  };
}
