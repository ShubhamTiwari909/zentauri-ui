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

type TableVariantProps = VariantProps<typeof tableVariants>;

export type TableProps = TableVariantProps &
  Omit<HTMLAttributes<HTMLTableElement>, "children"> & {
    children?: ReactNode;
    ref?: Ref<HTMLTableElement>;
    textAlign?: "left" | "center" | "right";
  };

export type TableSectionProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  rowAnimation?: TableAnimation;
};

export type TableHeadCellProps = ThHTMLAttributes<HTMLTableCellElement> & {
  sortDirection?: "ascending" | "descending" | "none";
  ref?: Ref<HTMLTableCellElement>;
};

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: Ref<HTMLTableCellElement>;
  textAlign?: "left" | "center" | "right";
};

export type TableCtx = {
  appearance: NonNullable<TableProps["appearance"]>;
  size: NonNullable<TableProps["size"]>;
  stickyHeader: boolean;
  rowAnimation: TableAnimation;
  textAlign: NonNullable<TableCellProps["textAlign"]>;
};
