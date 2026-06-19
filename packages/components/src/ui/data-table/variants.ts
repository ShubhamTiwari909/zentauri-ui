import { cva } from "class-variance-authority";

import {
  zuiDataTableColumnPanelBase,
  zuiDataTableRootBase,
  zuiDataTableStateCellBase,
  zuiDataTableStatusBase,
  zuiDataTableToolbarBase,
  zuiDataTableToolbarGroupBase,
  zuiDataTableVirtualScrollBase,
} from "../../design-system/data-table";

export const dataTableRootVariants = cva(zuiDataTableRootBase);
export const dataTableToolbarVariants = cva(zuiDataTableToolbarBase);
export const dataTableToolbarGroupVariants = cva(zuiDataTableToolbarGroupBase);
export const dataTableColumnPanelVariants = cva(zuiDataTableColumnPanelBase);
export const dataTableStatusVariants = cva(zuiDataTableStatusBase);
export const dataTableStateCellVariants = cva(zuiDataTableStateCellBase);
export const dataTableVirtualScrollVariants = cva(
  zuiDataTableVirtualScrollBase,
);
