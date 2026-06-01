import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { TableSortDirection } from "../../ui/table/types";
import { useTableSort } from "./useTableSort";

describe("useTableSort", () => {
  it("should default to no active sort", () => {
    const { result } = renderHook(() => useTableSort());
    expect(result.current.sortKey).toBeUndefined();
    expect(result.current.sortDirection).toBe("none");
  });

  it("should seed state from default sort params", () => {
    const { result } = renderHook(() =>
      useTableSort({
        defaultSortKey: "name",
        defaultSortDirection: "ascending",
      }),
    );
    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortDirection).toBe("ascending");
  });

  it("should cycle a column through ascending, descending, and none", () => {
    const { result } = renderHook(() => useTableSort<"name">());

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current).toMatchObject({
      sortKey: "name",
      sortDirection: "ascending",
    });

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current).toMatchObject({
      sortKey: "name",
      sortDirection: "descending",
    });

    act(() => {
      result.current.toggleSort("name");
    });
    expect(result.current).toMatchObject({
      sortKey: undefined,
      sortDirection: "none",
    });
  });

  it("should support controlled sort state", () => {
    const handleSortChange = vi.fn();
    const { result, rerender } = renderHook(
      ({
        sortKey,
        sortDirection,
      }: {
        sortKey?: string;
        sortDirection?: TableSortDirection;
      }) =>
        useTableSort({
          sortKey,
          sortDirection,
          onSortChange: handleSortChange,
        }),
      {
        initialProps: {
          sortKey: "createdAt" as string,
          sortDirection: "ascending" as TableSortDirection,
        },
      },
    );

    act(() => {
      result.current.toggleSort("createdAt");
    });
    expect(handleSortChange).toHaveBeenCalledWith({
      sortKey: "createdAt",
      sortDirection: "descending",
    });
    expect(result.current.sortDirection).toBe("ascending");

    rerender({ sortKey: "createdAt", sortDirection: "descending" });
    expect(result.current.sortDirection).toBe("descending");
  });

  it("should allow only sortKey to be controlled", () => {
    const handleSortChange = vi.fn();
    const { result } = renderHook(() =>
      useTableSort({
        sortKey: "name",
        onSortChange: handleSortChange,
      }),
    );

    act(() => {
      result.current.toggleSort("name");
    });

    expect(handleSortChange).toHaveBeenCalledWith({
      sortKey: "name",
      sortDirection: "ascending",
    });
    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortDirection).toBe("ascending");
  });

  it("should allow only sortDirection to be controlled", () => {
    const handleSortChange = vi.fn();
    const { result } = renderHook(() =>
      useTableSort<"name">({
        sortDirection: "ascending",
        onSortChange: handleSortChange,
      }),
    );

    act(() => {
      result.current.toggleSort("name");
    });

    expect(handleSortChange).toHaveBeenCalledWith({
      sortKey: "name",
      sortDirection: "ascending",
    });
    expect(result.current.sortKey).toBe("name");
    expect(result.current.sortDirection).toBe("ascending");
  });

  it("should return TableHead-compatible sort props", () => {
    const { result } = renderHook(() =>
      useTableSort({
        defaultSortKey: "status",
        defaultSortDirection: "descending",
      }),
    );
    const props = result.current.getSortProps("status");
    expect(props).toMatchObject({
      sortKey: "status",
      sortDirection: "descending",
    });

    act(() => {
      props.onSortChange?.({ sortKey: "status", sortDirection: "none" });
    });
    expect(result.current.sortKey).toBeUndefined();
    expect(result.current.sortDirection).toBe("none");
  });
});
