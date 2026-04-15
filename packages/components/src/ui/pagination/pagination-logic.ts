export type PaginationPageItem =
  | { type: "page"; value: number }
  | { type: "ellipsis"; key: string };

export type BuildPaginationItemsParams = {
  pageCount: number;
  currentPage: number;
  siblingCount: number;
  boundaryCount: number;
};

/**
 * Builds the ordered list of page numbers and ellipsis markers for a pagination control.
 *
 * Args:
 *   pageCount: Total number of pages (must be >= 0).
 *   currentPage: Active page index (1-based).
 *   siblingCount: How many page buttons to show on each side of the current page.
 *   boundaryCount: How many pages to pin at the start and end of the range.
 *
 * Returns:
 *   A list of items suitable for rendering, e.g. [1, ellipsis, 4,5,6, ellipsis, 20].
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

  const totalNumbers =
    safeBoundary * 2 + safeSibling * 2 + 1;
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

export function clampPage(page: number, pageCount: number): number {
  if (pageCount <= 0) {
    return 1;
  }
  return Math.min(pageCount, Math.max(1, Math.floor(page)));
}

function range(from: number, to: number): number[] {
  const out: number[] = [];
  for (let i = from; i <= to; i += 1) {
    out.push(i);
  }
  return out;
}
