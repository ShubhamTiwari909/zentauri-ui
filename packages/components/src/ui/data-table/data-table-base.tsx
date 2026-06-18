"use client";

import { useCallback, useId, useMemo, useState } from "react";

import { usePagination } from "../../hooks/usePagination";
import { useTableFilter } from "../../hooks/useTableFilter";
import { useTableSort } from "../../hooks/useTableSort";
import { useVirtualList } from "../../hooks/useVirtualList";
import { cn } from "../../lib/utils";
import { Button } from "../buttons";
import { Checkbox } from "../checkbox";
import { Input } from "../inputs";
import { Pagination } from "../pagination";
import type { PaginationAppearance } from "../pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

import type {
  DataTableColumn,
  DataTableColumnValue,
  DataTableProps,
  DataTableSearchOptions,
} from "./types";
import {
  dataTableColumnPanelVariants,
  dataTableRootVariants,
  dataTableStateCellVariants,
  dataTableStatusVariants,
  dataTableToolbarGroupVariants,
  dataTableToolbarVariants,
  dataTableVirtualScrollVariants,
} from "./variants";

const defaultLoadingContent = "Loading data";
const defaultEmptyContent = "No results found";
const globalFilterKey = "__zui_global_filter__";

function getAccessorValue<TData>(
  row: TData,
  column: DataTableColumn<TData>,
): unknown {
  if (typeof column.accessor === "function") {
    return column.accessor(row);
  }
  if (column.accessor && row && typeof row === "object") {
    return (row as Record<PropertyKey, unknown>)[column.accessor];
  }
  if (row && typeof row === "object" && column.id in row) {
    return (row as Record<string, unknown>)[column.id];
  }
  return undefined;
}

function normalizeComparable(value: DataTableColumnValue): string | number {
  if (value instanceof Date) {
    return value.getTime();
  }
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  return value == null ? "" : String(value).toLowerCase();
}

function compareValues(
  left: DataTableColumnValue,
  right: DataTableColumnValue,
): number {
  const normalizedLeft = normalizeComparable(left);
  const normalizedRight = normalizeComparable(right);

  if (
    typeof normalizedLeft === "number" &&
    typeof normalizedRight === "number"
  ) {
    return normalizedLeft - normalizedRight;
  }
  return String(normalizedLeft).localeCompare(String(normalizedRight));
}

function resolveSearchOptions<TKey extends string>(
  search: DataTableProps<unknown, TKey>["search"],
): DataTableSearchOptions<TKey> | null {
  if (!search) {
    return null;
  }
  if (search === true) {
    return {};
  }
  return search;
}

function validateSearchOptions<TKey extends string>(
  searchOptions: DataTableSearchOptions<TKey> | null,
) {
  if (
    searchOptions?.filterColumnIds &&
    searchOptions.filterColumnIds.length === 0
  ) {
    console.warn(
      "DataTable search.filterColumnIds is empty. It should include at least one column id.",
    );
  }
}

function isSelected(selectedRowIds: readonly string[], rowId: string) {
  return selectedRowIds.includes(rowId);
}

function toggleId(ids: readonly string[], id: string, checked: boolean) {
  if (checked) {
    return ids.includes(id) ? [...ids] : [...ids, id];
  }
  return ids.filter((item) => item !== id);
}

function textAlignClass(textAlign: "left" | "center" | "right" | undefined) {
  if (textAlign === "center") {
    return "text-center";
  }
  if (textAlign === "right") {
    return "text-right";
  }
  return undefined;
}

function paginationAppearanceFor(
  appearance: NonNullable<DataTableProps<unknown>["appearance"]>,
): PaginationAppearance {
  if (
    appearance === "striped" ||
    appearance === "bordered" ||
    appearance === "ghost"
  ) {
    return "default";
  }
  return appearance as PaginationAppearance;
}

function uniqueVisibleColumnIds<TData, TKey extends string>(
  columns: readonly DataTableColumn<TData, TKey>[],
  ids: readonly TKey[] | undefined,
) {
  const columnIds = new Set(columns.map((column) => column.id));
  const initialIds =
    ids ??
    columns
      .filter((column) => column.visible !== false)
      .map((column) => column.id);

  return initialIds.filter((id, index) => {
    return columnIds.has(id) && initialIds.indexOf(id) === index;
  });
}

export function DataTableBase<TData, TKey extends string = string>(
  props: DataTableProps<TData, TKey>,
) {
  const {
    className,
    columns,
    data,
    getRowId,
    caption,
    tableClassName,
    tableScrollAreaAriaLabel,
    appearance = "default",
    size = "md",
    stickyHeader,
    textAlign,
    search,
    sortKey,
    defaultSortKey,
    sortDirection,
    defaultSortDirection = "none",
    onSortChange,
    enableRowSelection = false,
    selectedRowIds,
    defaultSelectedRowIds = [],
    onRowSelectionChange,
    enableColumnVisibility = false,
    visibleColumnIds,
    defaultVisibleColumnIds,
    onColumnVisibilityChange,
    bulkActions = [],
    pagination,
    virtualization,
    showRowCount = true,
    loading = false,
    loadingContent = defaultLoadingContent,
    emptyContent = defaultEmptyContent,
    ref,
    "aria-label": ariaLabel = "Data table",
    ...rest
  } = props;
  const searchOptions = resolveSearchOptions(search);
  validateSearchOptions(searchOptions);

  const rowIdsMap = useMemo(() => {
    const map = new Map<TData, string>();
    data.forEach((row, index) => {
      map.set(row, getRowId ? getRowId(row, index) : String(index));
    });
    return map;
  }, [data, getRowId]);

  const resolvedAppearance = appearance ?? "default";
  const resolvedSize = size ?? "md";
  const resolvedPaginationAppearance =
    paginationAppearanceFor(resolvedAppearance);
  const columnPanelId = useId();
  const [columnPanelOpen, setColumnPanelOpen] = useState(false);

  const [internalSelectedRowIds, setInternalSelectedRowIds] = useState(() => [
    ...defaultSelectedRowIds,
  ]);
  const selectedIds = useMemo(
    () => (selectedRowIds ? [...selectedRowIds] : internalSelectedRowIds),
    [internalSelectedRowIds, selectedRowIds],
  );
  const isSelectionControlled = selectedRowIds !== undefined;

  const [internalVisibleColumnIds, setInternalVisibleColumnIds] = useState<
    TKey[]
  >(() => uniqueVisibleColumnIds(columns, defaultVisibleColumnIds));
  const currentVisibleColumnIds = visibleColumnIds
    ? uniqueVisibleColumnIds(columns, visibleColumnIds)
    : uniqueVisibleColumnIds(columns, internalVisibleColumnIds);
  const isVisibilityControlled = visibleColumnIds !== undefined;

  const visibleColumns = useMemo(
    () =>
      columns.filter((column) => currentVisibleColumnIds.includes(column.id)),
    [columns, currentVisibleColumnIds],
  );

  const [internalSearchValue, setInternalSearchValue] = useState(
    () => searchOptions?.defaultValue ?? "",
  );
  const searchValue = searchOptions?.value ?? internalSearchValue;
  const isSearchControlled = searchOptions?.value !== undefined;

  const searchableColumns = useMemo(() => {
    const filterColumnIds = searchOptions?.filterColumnIds;
    const hasFilterColumns = Boolean(
      filterColumnIds && filterColumnIds.length > 0,
    );
    return visibleColumns.filter((column) => {
      if (hasFilterColumns && !filterColumnIds?.includes(column.id)) {
        return false;
      }
      return column.filterable !== false;
    });
  }, [searchOptions?.filterColumnIds, visibleColumns]);

  const filterState = searchValue
    ? { [globalFilterKey]: searchValue }
    : undefined;

  const { filteredData } = useTableFilter<TData, string>({
    data,
    filters: filterState,
    filterPredicate: (row, filterValue) => {
      const query = filterValue.trim().toLowerCase();
      if (!query) {
        return true;
      }
      return searchableColumns.some((column) => {
        const value = column.filterValue
          ? column.filterValue(row)
          : getAccessorValue(row, column);
        return String(value ?? "")
          .toLowerCase()
          .includes(query);
      });
    },
  });

  const tableSort = useTableSort<TKey>({
    sortKey,
    defaultSortKey,
    sortDirection,
    defaultSortDirection,
    onSortChange,
  });

  const sortedData = useMemo(() => {
    if (!tableSort.sortKey || tableSort.sortDirection === "none") {
      return filteredData;
    }

    const sortedColumn = columns.find(
      (column) => column.id === tableSort.sortKey,
    );
    if (!sortedColumn || !sortedColumn.sortable) {
      return filteredData;
    }

    const direction = tableSort.sortDirection === "ascending" ? 1 : -1;
    return [...filteredData].sort((left, right) => {
      const leftValue = sortedColumn.sortValue
        ? sortedColumn.sortValue(left)
        : (getAccessorValue(left, sortedColumn) as DataTableColumnValue);
      const rightValue = sortedColumn.sortValue
        ? sortedColumn.sortValue(right)
        : (getAccessorValue(right, sortedColumn) as DataTableColumnValue);

      return compareValues(leftValue, rightValue) * direction;
    });
  }, [columns, filteredData, tableSort.sortDirection, tableSort.sortKey]);

  const paginationOptions =
    pagination && pagination !== true ? pagination : undefined;
  const paginationEnabled = Boolean(pagination);
  const pageSize = Math.max(1, paginationOptions?.pageSize ?? 10);
  const pageCount = paginationEnabled
    ? Math.ceil(sortedData.length / pageSize)
    : 1;
  const paginationState = usePagination({
    pageCount,
    page: paginationOptions?.page,
    defaultPage: paginationOptions?.defaultPage,
    siblingCount: paginationOptions?.siblingCount,
    boundaryCount: paginationOptions?.boundaryCount,
    onPageChange: paginationOptions?.onPageChange,
  });

  const processedRows = paginationEnabled
    ? sortedData.slice(
        (paginationState.currentPage - 1) * pageSize,
        paginationState.currentPage * pageSize,
      )
    : sortedData;

  const virtualizationEnabled =
    Boolean(virtualization?.enabled) && processedRows.length > 0;
  const virtualList = useVirtualList({
    itemCount: processedRows.length,
    itemHeight: virtualization?.rowHeight ?? 48,
    overscan: virtualization?.overscan,
  });
  const renderedRows = virtualizationEnabled
    ? virtualList.virtualItems.map((item) => ({
        row: processedRows[item.index] as TData,
        index: item.index,
        start: item.start,
      }))
    : processedRows.map((row, index) => ({ row, index, start: 0 }));
  const virtualOffset = virtualizationEnabled
    ? (virtualList.virtualItems[0]?.start ?? 0)
    : 0;

  const selectableRows = useMemo(
    () =>
      processedRows.map((row) => ({
        row,
        id: rowIdsMap.get(row) ?? "",
      })),
    [processedRows, rowIdsMap],
  );
  const selectedRows = useMemo(
    () =>
      data.filter((row) => {
        const id = rowIdsMap.get(row);
        return id !== undefined && isSelected(selectedIds, id);
      }),
    [data, rowIdsMap, selectedIds],
  );

  const allVisibleSelected =
    selectableRows.length > 0 &&
    selectableRows.every((item) => isSelected(selectedIds, item.id));
  const someVisibleSelected =
    selectableRows.some((item) => isSelected(selectedIds, item.id)) &&
    !allVisibleSelected;

  const setSelectedIds = useCallback(
    (nextIds: string[]) => {
      if (!isSelectionControlled) {
        setInternalSelectedRowIds(nextIds);
      }
      const nextRows = data.filter((row) => {
        const id = rowIdsMap.get(row);
        return id !== undefined && nextIds.includes(id);
      });
      onRowSelectionChange?.(nextIds, nextRows);
    },
    [data, isSelectionControlled, onRowSelectionChange, rowIdsMap],
  );

  const setColumnVisible = useCallback(
    (columnId: TKey, checked: boolean) => {
      const nextIds = checked
        ? [...currentVisibleColumnIds, columnId]
        : currentVisibleColumnIds.filter((id) => id !== columnId);
      const normalized = uniqueVisibleColumnIds(columns, nextIds);
      if (!isVisibilityControlled) {
        setInternalVisibleColumnIds(normalized);
      }
      onColumnVisibilityChange?.(normalized);
    },
    [
      columns,
      currentVisibleColumnIds,
      isVisibilityControlled,
      onColumnVisibilityChange,
    ],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      if (!isSearchControlled) {
        setInternalSearchValue(value);
      }
      searchOptions?.onValueChange?.(value);
    },
    [isSearchControlled, searchOptions],
  );

  const headerColSpan =
    visibleColumns.length + (enableRowSelection ? 1 : 0) || 1;

  const renderStateRow = (content: React.ReactNode) => (
    <TableRow>
      <TableCell
        colSpan={headerColSpan}
        className={dataTableStateCellVariants()}
      >
        {content}
      </TableCell>
    </TableRow>
  );

  const renderRow = (row: TData, rowIndex: number) => {
    const rowId = rowIdsMap.get(row) ?? String(rowIndex);
    const rowSelected = isSelected(selectedIds, rowId);
    const labelColumn = visibleColumns[0] ?? columns[0];
    const rowSelectionLabel = labelColumn
      ? String(getAccessorValue(row, labelColumn) ?? rowId)
      : rowId;

    return (
      <TableRow key={rowId} data-state={rowSelected ? "selected" : undefined}>
        {enableRowSelection ? (
          <TableCell className="w-10">
            <Checkbox
              aria-label={`Select ${rowSelectionLabel}`}
              checked={rowSelected}
              onCheckedChange={(checked) => {
                setSelectedIds(toggleId(selectedIds, rowId, checked));
              }}
            />
          </TableCell>
        ) : null}
        {visibleColumns.map((column, columnIndex) => {
          const value = getAccessorValue(row, column);
          const content = column.cell
            ? column.cell({ row, value, column, rowIndex })
            : String(value ?? "");
          const isRowHeader = columnIndex === 0;

          return (
            <TableCell
              key={column.id}
              scope={isRowHeader ? "row" : undefined}
              className={cn(
                textAlignClass(column.textAlign),
                column.className,
                column.cellClassName,
              )}
              {...column.cellProps}
            >
              {content}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  const tableElement = (
    <Table
      aria-label={ariaLabel}
      appearance={resolvedAppearance}
      size={resolvedSize}
      stickyHeader={stickyHeader}
      textAlign={textAlign}
      scrollAreaAriaLabel={tableScrollAreaAriaLabel}
      className={tableClassName}
    >
      {caption ? <TableCaption>{caption}</TableCaption> : null}
      <TableHeader>
        <TableRow>
          {enableRowSelection ? (
            <TableHead className="w-10">
              <Checkbox
                aria-label="Select all rows"
                checked={allVisibleSelected}
                indeterminate={someVisibleSelected}
                onCheckedChange={(checked) => {
                  const visibleIds = selectableRows.map((item) => item.id);
                  const nextIds = checked
                    ? [...new Set([...selectedIds, ...visibleIds])]
                    : selectedIds.filter((id) => !visibleIds.includes(id));
                  setSelectedIds(nextIds);
                }}
              />
            </TableHead>
          ) : null}
          {visibleColumns.map((column) => {
            const header =
              typeof column.header === "function"
                ? column.header({ column })
                : column.header;
            return (
              <TableHead
                key={column.id}
                className={cn(
                  textAlignClass(column.textAlign),
                  column.className,
                  column.headerClassName,
                )}
                {...(column.sortable ? tableSort.getSortProps(column.id) : {})}
                {...column.headerProps}
              >
                {header}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? renderStateRow(loadingContent)
          : renderedRows.length === 0
            ? renderStateRow(emptyContent)
            : renderedRows.map(({ row, index }) => renderRow(row, index))}
      </TableBody>
    </Table>
  );

  return (
    <section
      ref={ref}
      data-slot="data-table"
      className={cn(dataTableRootVariants(), className)}
      {...rest}
    >
      {searchOptions || enableColumnVisibility || bulkActions.length > 0 ? (
        <div
          data-slot="data-table-toolbar"
          className={dataTableToolbarVariants()}
        >
          <div
            data-slot="data-table-toolbar-primary"
            className={dataTableToolbarGroupVariants()}
          >
            {searchOptions ? (
              <Input
                as="input"
                type="search"
                aria-label={searchOptions.label ?? "Search table"}
                placeholder={searchOptions.placeholder ?? "Search table"}
                value={searchValue}
                onChange={(event) =>
                  handleSearchChange(event.currentTarget.value)
                }
                className="min-w-56"
              />
            ) : null}
            {selectedRows.length > 0 ? (
              <span className={dataTableStatusVariants()} aria-live="polite">
                {selectedRows.length} selected
              </span>
            ) : null}
          </div>
          <div
            data-slot="data-table-toolbar-actions"
            className={dataTableToolbarGroupVariants()}
          >
            {bulkActions.map((action, index) => (
              <Button
                key={index}
                type="button"
                appearance="outline"
                size="sm"
                disabled={action.disabled || selectedRows.length === 0}
                onClick={() => action.onSelect(selectedRows)}
              >
                {action.label}
              </Button>
            ))}
            {enableColumnVisibility ? (
              <div className="relative">
                <Button
                  type="button"
                  appearance="outline"
                  size="sm"
                  aria-expanded={columnPanelOpen}
                  aria-controls={columnPanelId}
                  onClick={() => setColumnPanelOpen((open) => !open)}
                >
                  Columns
                </Button>
                {columnPanelOpen ? (
                  <div
                    id={columnPanelId}
                    data-slot="data-table-column-panel"
                    className={dataTableColumnPanelVariants()}
                  >
                    {columns.map((column) => {
                      const canHide = column.enableHiding !== false;
                      return (
                        <Checkbox
                          key={column.id}
                          checked={currentVisibleColumnIds.includes(column.id)}
                          disabled={!canHide}
                          onCheckedChange={(checked) =>
                            setColumnVisible(column.id, checked)
                          }
                        >
                          {String(
                            typeof column.header === "function"
                              ? column.id
                              : column.header,
                          )}{" "}
                          column
                        </Checkbox>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {virtualizationEnabled ? (
        <div
          ref={virtualList.setContainerRef}
          data-slot="data-table-virtual-scroll"
          className={dataTableVirtualScrollVariants()}
          style={{ maxHeight: virtualization?.height }}
        >
          <div style={{ minHeight: virtualList.totalHeight }}>
            <div
              data-slot="data-table-virtual-offset"
              style={{ transform: `translateY(${virtualOffset}px)` }}
            >
              {tableElement}
            </div>
          </div>
        </div>
      ) : (
        tableElement
      )}

      {paginationEnabled && pageCount > 1 ? (
        <div
          className={cn(
            "flex flex-wrap items-center gap-3",
            showRowCount ? "justify-between" : "justify-end",
          )}
        >
          {showRowCount ? (
            <span className={dataTableStatusVariants()}>
              Showing {processedRows.length} of {sortedData.length}
            </span>
          ) : null}
          <Pagination
            appearance={resolvedPaginationAppearance}
            size={resolvedSize}
            pageCount={pageCount}
            page={paginationState.currentPage}
            siblingCount={paginationOptions?.siblingCount}
            boundaryCount={paginationOptions?.boundaryCount}
            onPageChange={paginationState.setPage}
            className="w-auto"
          />
        </div>
      ) : null}
    </section>
  );
}

DataTableBase.displayName = "DataTable";
