import type { VariantProps } from "class-variance-authority";
import type {
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
    rowAnimation?: TableAnimation;
    ref?: Ref<HTMLTableElement>;
    textAlign?: "left" | "center" | "right";
  };

export type TableSectionProps = {
  className?: string;
  children?: ReactNode;
};

export type TableHeadCellProps = ThHTMLAttributes<HTMLTableCellElement> & {
  sortDirection?: "ascending" | "descending" | "none";
  ref?: Ref<HTMLTableCellElement>;
};

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: Ref<HTMLTableCellElement>;
  textAlign?: "left" | "center" | "right";
};
