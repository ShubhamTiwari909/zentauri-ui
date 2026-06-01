export type TableFilterState<TKey extends string = string> = Partial<
  Record<TKey, string>
>;

export type TableFilterPredicate<TData, TKey extends string = string> = (
  row: TData,
  filterValue: string,
  filterKey: TKey,
) => boolean;

export type UseTableFilterParams<TData, TKey extends string = string> = {
  data: readonly TData[];
  filters?: TableFilterState<TKey>;
  defaultFilters?: TableFilterState<TKey>;
  onFiltersChange?: (filters: TableFilterState<TKey>) => void;
  getColumnValue?: (row: TData, filterKey: TKey) => unknown;
  filterPredicate?: TableFilterPredicate<TData, TKey>;
};

export type UseTableFilterResult<TData, TKey extends string = string> = {
  filters: TableFilterState<TKey>;
  filteredData: TData[];
  hasActiveFilters: boolean;
  setFilter: (filterKey: TKey, value: string) => void;
  setFilters: (filters: TableFilterState<TKey>) => void;
  clearFilter: (filterKey: TKey) => void;
  clearFilters: () => void;
};