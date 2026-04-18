import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { buildPaginationItems, usePagination } from "./usePagination";

describe("buildPaginationItems", () => {
  it("should return empty list when pageCount is zero", () => {
    expect(
      buildPaginationItems({
        pageCount: 0,
        currentPage: 1,
        siblingCount: 1,
        boundaryCount: 1,
      }),
    ).toEqual([]);
  });

  it("should return full page range when within totalNumbers window", () => {
    const items = buildPaginationItems({
      pageCount: 5,
      currentPage: 3,
      siblingCount: 1,
      boundaryCount: 1,
    });
    expect(items).toEqual([
      { type: "page", value: 1 },
      { type: "page", value: 2 },
      { type: "page", value: 3 },
      { type: "page", value: 4 },
      { type: "page", value: 5 },
    ]);
  });

  it("should insert ellipsis when range is fragmented", () => {
    const items = buildPaginationItems({
      pageCount: 10,
      currentPage: 5,
      siblingCount: 1,
      boundaryCount: 1,
    });
    const ellipsisKeys = items
      .filter((item) => item.type === "ellipsis")
      .map((item) => item.key);
    expect(ellipsisKeys.length).toBeGreaterThan(0);
    const pages = items
      .filter((item) => item.type === "page")
      .map((item) => item.value);
    expect(pages).toContain(1);
    expect(pages).toContain(10);
    expect(pages).toContain(5);
  });

  it("should clamp current page into range", () => {
    const items = buildPaginationItems({
      pageCount: 3,
      currentPage: 99,
      siblingCount: 0,
      boundaryCount: 1,
    });
    expect(items.every((i) => i.type === "page")).toBe(true);
    expect(items.some((i) => i.type === "page" && i.value === 3)).toBe(true);
  });
});

describe("usePagination", () => {
  it("should use internal state when uncontrolled", () => {
    const { result } = renderHook(() =>
      usePagination({ pageCount: 5, defaultPage: 2 }),
    );
    expect(result.current.currentPage).toBe(2);
    expect(result.current.canGoPrev).toBe(true);
    expect(result.current.canGoNext).toBe(true);
    act(() => {
      result.current.setPage(4);
    });
    expect(result.current.currentPage).toBe(4);
  });

  it("should clamp setPage into 1 and pageCount", () => {
    const { result } = renderHook(() =>
      usePagination({ pageCount: 3, defaultPage: 2 }),
    );
    act(() => {
      result.current.setPage(0);
    });
    expect(result.current.currentPage).toBe(1);
    act(() => {
      result.current.setPage(100);
    });
    expect(result.current.currentPage).toBe(3);
  });

  it("should follow controlled page prop", () => {
    const onPageChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ page }: { page: number }) =>
        usePagination({ pageCount: 4, page, onPageChange }),
      { initialProps: { page: 1 } },
    );
    expect(result.current.currentPage).toBe(1);
    act(() => {
      result.current.setPage(3);
    });
    expect(result.current.currentPage).toBe(1);
    expect(onPageChange).toHaveBeenCalledWith(3);
    rerender({ page: 3 });
    expect(result.current.currentPage).toBe(3);
  });

  it("should not change page on goPrev when already first", () => {
    const { result } = renderHook(() =>
      usePagination({ pageCount: 3, defaultPage: 1 }),
    );
    act(() => {
      result.current.goPrev();
    });
    expect(result.current.currentPage).toBe(1);
    expect(result.current.canGoPrev).toBe(false);
  });

  it("should not change page on goNext when already last", () => {
    const { result } = renderHook(() =>
      usePagination({ pageCount: 3, defaultPage: 3 }),
    );
    act(() => {
      result.current.goNext();
    });
    expect(result.current.currentPage).toBe(3);
    expect(result.current.canGoNext).toBe(false);
  });

  it("should set canGoPrev and canGoNext false when pageCount is zero", () => {
    const { result } = renderHook(() =>
      usePagination({ pageCount: 0, defaultPage: 1 }),
    );
    expect(result.current.canGoPrev).toBe(false);
    expect(result.current.canGoNext).toBe(false);
  });
});
