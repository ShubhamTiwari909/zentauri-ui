import { cva } from "class-variance-authority";

import {
  zuiTableAppearances,
  zuiTableBase,
  zuiTableCellAppearances,
  zuiTableCellBase,
  zuiTableCellSizes,
  zuiTableRowAppearances,
  zuiTableRowBase,
  zuiTableSizes,
  zuiTableStickyHeader,
  zuiTableTextAlignments,
} from "../../design-system/table";

export const tableVariants = cva(zuiTableBase, {
  variants: {
    appearance: zuiTableAppearances,
    size: zuiTableSizes,
    stickyHeader: zuiTableStickyHeader,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    stickyHeader: false,
  },
});

export const tableRowVariants = cva(zuiTableRowBase, {
  variants: {
    appearance: zuiTableRowAppearances,
  },
  defaultVariants: { appearance: "default" },
});

export const tableCellVariants = cva(zuiTableCellBase, {
  variants: {
    appearance: zuiTableCellAppearances,
    size: zuiTableCellSizes,
    textAlign: zuiTableTextAlignments,
  },
  defaultVariants: { appearance: "default", size: "md" },
});
