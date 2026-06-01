import type {
  TableHeadCellProps,
  TableSortDirection,
  TableSortState,
} from "../../ui/table/types";

export type UseTableSortParams<TKey extends string = string> = {
  sortKey?: TKey;
  defaultSortKey?: TKey;
  sortDirection?: TableSortDirection;
  defaultSortDirection?: TableSortDirection;
  onSortChange?: (nextSort: TableSortState<TKey>) => void;
};

export type UseTableSortResult<TKey extends string = string> =
  TableSortState<TKey> & {
    setSort: (nextSort: TableSortState<TKey>) => void;
    clearSort: () => void;
    toggleSort: (sortKey: TKey) => void;
    getSortProps: (
      sortKey: TKey,
    ) => Pick<TableHeadCellProps, "sortKey" | "sortDirection" | "onSortChange">;
  };
