import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useTableFilter } from "./useTableFilter";

const rows = [
  { name: "Atlas", status: "active", seats: 12 },
  { name: "Beacon", status: "paused", seats: 4 },
  { name: "Comet", status: "active", seats: 8 },
] as const;

describe("useTableFilter", () => {
  it("should return all rows when no filters are active", () => {
    const { result } = renderHook(() => useTableFilter({ data: rows }));
    expect(result.current.filteredData).toEqual(rows);
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("should filter rows by a string column value", () => {
    const { result } = renderHook(() =>
      useTableFilter({
        data: rows,
        defaultFilters: { status: "active" },
      }),
    );
    expect(result.current.filteredData.map((row) => row.name)).toEqual([
      "Atlas",
      "Comet",
    ]);
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it("should combine multiple column filters", () => {
    const { result } = renderHook(() =>
      useTableFilter({
        data: rows,
        defaultFilters: { status: "active", name: "com" },
      }),
    );
    expect(result.current.filteredData).toEqual([rows[2]]);
  });

  it("should update and clear filters in uncontrolled mode", () => {
    const { result } = renderHook(() => useTableFilter({ data: rows }));

    act(() => {
      result.current.setFilter("name", "bea");
    });
    expect(result.current.filteredData).toEqual([rows[1]]);

    act(() => {
      result.current.clearFilter("name");
    });
    expect(result.current.filteredData).toEqual(rows);

    act(() => {
      result.current.setFilters({ status: "paused" });
    });
    expect(result.current.filteredData).toEqual([rows[1]]);

    act(() => {
      result.current.clearFilters();
    });
    expect(result.current.filteredData).toEqual(rows);
  });

  it("should support controlled filters", () => {
    const handleFiltersChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ filters }: { filters: Record<string, string> }) =>
        useTableFilter({
          data: rows,
          filters,
          onFiltersChange: handleFiltersChange,
        }),
      { initialProps: { filters: { status: "active" } } },
    );

    expect(result.current.filteredData.length).toBe(2);
    act(() => {
      result.current.setFilter("name", "atlas");
    });
    expect(handleFiltersChange).toHaveBeenCalledWith({
      status: "active",
      name: "atlas",
    });
    expect(result.current.filters).toEqual({ status: "active" });

    rerender({ filters: { status: "active", name: "atlas" } });
    expect(result.current.filteredData).toEqual([rows[0]]);
  });

  it("should support custom value accessors and predicates", () => {
    const { result } = renderHook(() =>
      useTableFilter({
        data: rows,
        defaultFilters: { seats: "10" },
        getColumnValue: (row, key) => row[key],
        filterPredicate: (row, value, key) => Number(row[key]) >= Number(value),
      }),
    );
    expect(result.current.filteredData).toEqual([rows[0]]);
  });

  it("should remove blank filter values", () => {
    const { result } = renderHook(() =>
      useTableFilter({
        data: rows,
        defaultFilters: { name: "   " },
      }),
    );
    expect(result.current.filters).toEqual({});
    expect(result.current.hasActiveFilters).toBe(false);
  });
});
