import type { VariantProps } from "class-variance-authority";
import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
  Ref,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

import type { tableVariants } from "./variants";

export type TableAnimation = "none" | "hover";
export type TableSortDirection = "ascending" | "descending" | "none";

export type TableSortState<TKey extends string = string> = {
  sortKey?: TKey;
  sortDirection: TableSortDirection;
};

export type TableSortChangeHandler<TKey extends string = string> = (
  nextSort: TableSortState<TKey>,
) => void;

type TableVariantProps = VariantProps<typeof tableVariants>;

export type TableProps = TableVariantProps &
  Omit<HTMLAttributes<HTMLTableElement>, "children"> & {
    children?: ReactNode;
    ref?: Ref<HTMLTableElement>;
    textAlign?: "left" | "center" | "right";
    /** Label for the overflow scroll wrapper (keyboard-focusable region). */
    scrollAreaAriaLabel?: string;
  };

export type TableSectionProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  rowAnimation?: TableAnimation;
};

export type TableHeadCellProps = ThHTMLAttributes<HTMLTableCellElement> & {
  sortKey?: string;
  sortDirection?: TableSortDirection;
  onSortChange?: TableSortChangeHandler;
  ref?: Ref<HTMLTableCellElement>;
};

export type TableCellProps = Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  "scope"
> & {
  ref?: Ref<HTMLTableCellElement>;
  textAlign?: "left" | "center" | "right";
  /** Row/column header scope; when set, the cell renders as `<th>` (required for valid `scope` usage). */
  scope?: ThHTMLAttributes<HTMLTableCellElement>["scope"];
};

export type TableCtx = {
  appearance: NonNullable<TableProps["appearance"]>;
  size: NonNullable<TableProps["size"]>;
  stickyHeader: boolean;
  rowAnimation: TableAnimation;
  textAlign: NonNullable<TableCellProps["textAlign"]>;
};
