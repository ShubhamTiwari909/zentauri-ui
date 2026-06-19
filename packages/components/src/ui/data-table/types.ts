import type {
  ComponentPropsWithRef,
  ReactNode,
  Ref,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

import type { TableProps, TableSortDirection } from "../table";

export type DataTableColumnValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

export type DataTableColumnTextAlign = NonNullable<TableProps["textAlign"]>;

export type DataTableCellContext<TData> = {
  row: TData;
  value: unknown;
  column: DataTableColumn<TData>;
  rowIndex: number;
};

export type DataTableHeaderContext<TData> = {
  column: DataTableColumn<TData>;
};

export type DataTableColumn<TData, TKey extends string = string> = {
  id: TKey;
  header: ReactNode | ((context: DataTableHeaderContext<TData>) => ReactNode);
  accessor?: keyof TData | ((row: TData) => unknown);
  cell?: (context: DataTableCellContext<TData>) => ReactNode;
  sortable?: boolean;
  sortValue?: (row: TData) => DataTableColumnValue;
  filterable?: boolean;
  filterValue?: (row: TData) => DataTableColumnValue;
  visible?: boolean;
  enableHiding?: boolean;
  textAlign?: DataTableColumnTextAlign;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
  headerProps?: ThHTMLAttributes<HTMLTableCellElement>;
  cellProps?: TdHTMLAttributes<HTMLTableCellElement>;
};

export type DataTableSearchOptions<TKey extends string = string> = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  filterColumnIds?: readonly TKey[];
};

export type DataTablePaginationOptions = {
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
};

export type DataTableBulkAction<TData> = {
  label: ReactNode;
  onSelect: (selectedRows: TData[]) => void;
  disabled?: boolean;
};

export type DataTableVirtualizationOptions = {
  enabled?: boolean;
  rowHeight: number;
  height: number;
  overscan?: number;
};

export type DataTableProps<TData, TKey extends string = string> = Omit<
  ComponentPropsWithRef<"section">,
  "children" | "onChange"
> &
  Pick<TableProps, "appearance" | "size" | "stickyHeader" | "textAlign"> & {
    data: readonly TData[];
    columns: readonly DataTableColumn<TData, TKey>[];
    getRowId?: (row: TData, index: number) => string;
    caption?: ReactNode;
    tableClassName?: string;
    tableScrollAreaAriaLabel?: string;
    search?: boolean | DataTableSearchOptions<TKey>;
    sortKey?: TKey;
    defaultSortKey?: TKey;
    sortDirection?: TableSortDirection;
    defaultSortDirection?: TableSortDirection;
    onSortChange?: (sort: {
      sortKey?: TKey;
      sortDirection: TableSortDirection;
    }) => void;
    enableRowSelection?: boolean;
    selectedRowIds?: readonly string[];
    defaultSelectedRowIds?: readonly string[];
    onRowSelectionChange?: (
      selectedRowIds: string[],
      selectedRows: TData[],
    ) => void;
    enableColumnVisibility?: boolean;
    visibleColumnIds?: readonly TKey[];
    defaultVisibleColumnIds?: readonly TKey[];
    onColumnVisibilityChange?: (visibleColumnIds: TKey[]) => void;
    bulkActions?: readonly DataTableBulkAction<TData>[];
    pagination?: boolean | DataTablePaginationOptions;
    virtualization?: DataTableVirtualizationOptions;
    showRowCount?: boolean;
    loading?: boolean;
    loadingContent?: ReactNode;
    emptyContent?: ReactNode;
    ref?: Ref<HTMLElement>;
  };
