import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import type { buttonVariants } from "../buttons/variants";

export type PaginationAppearance = NonNullable<
  VariantProps<typeof buttonVariants>["appearance"]
>;

export type PaginationSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

export type PaginationPageItem =
  | { type: "page"; value: number }
  | { type: "ellipsis"; key: string };

export type UsePaginationParams = {
  pageCount: number;
  page?: number;
  defaultPage?: number;
  siblingCount?: number;
  boundaryCount?: number;
  onPageChange?: (page: number) => void;
};

export type UsePaginationResult = {
  /** 1-based active page, clamped to `[1, pageCount]`. */
  currentPage: number;
  pageCount: number;
  items: PaginationPageItem[];
  setPage: (page: number) => void;
  goPrev: () => void;
  goNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
};

export type PaginationProps = Omit<
  ComponentPropsWithoutRef<"nav">,
  "onChange"
> &
  VariantProps<typeof buttonVariants> & {
    pageCount: number;
    page?: number;
    defaultPage?: number;
    onPageChange?: (page: number) => void;
    /**
     * Number of page buttons to show on each side of the current page (the “middle” window).
     * @defaultValue 1
     */
    siblingCount?: number;
    /**
     * Number of pages to keep visible at the start and end of the range.
     * @defaultValue 1
     */
    boundaryCount?: number;
    showPrevNext?: boolean;
    prevLabel?: string;
    nextLabel?: string;
    ellipsisLabel?: string;
    /**
     * When set, page controls render as anchors suitable for URL-based pagination.
     */
    getPageHref?: (page: number) => string | undefined;
  };
