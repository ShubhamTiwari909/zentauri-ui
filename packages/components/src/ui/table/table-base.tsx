"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type KeyboardEvent,
} from "react";

import { cn } from "../../lib/utils";

import type {
  TableCtx,
  TableCellProps,
  TableHeadCellProps,
  TableProps,
  TableSectionProps,
  TableSortDirection,
} from "./types";
import { tableCellVariants, tableRowVariants, tableVariants } from "./variants";

export const TableContext = createContext<TableCtx | null>(null);

export function useTableContext(component: string): TableCtx {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Table>`);
  }
  return ctx;
}

export function TableBase(props: TableProps) {
  const {
    className,
    appearance = "default",
    size = "md",
    textAlign = "left",
    stickyHeader = false,
    scrollAreaAriaLabel,
    children,
    ref,
    ...rest
  } = props;
  const ctx = useMemo(
    () => ({
      appearance: appearance ?? "default",
      size: size ?? "md",
      stickyHeader: Boolean(stickyHeader),
      rowAnimation: "none" as const,
      textAlign,
    }),
    [appearance, size, stickyHeader, textAlign],
  );

  return (
    <TableContext.Provider value={ctx}>
      <div
        data-slot="table-scroll"
        tabIndex={0}
        role="region"
        aria-label={scrollAreaAriaLabel ?? "Scrollable table"}
        className={cn(
          "relative w-full overflow-auto",
          "outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        )}
      >
        <table
          ref={ref}
          data-slot="table"
          className={cn(
            tableVariants({ appearance, size, stickyHeader }),
            "w-full min-w-0 table",
            className,
          )}
          {...rest}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

TableBase.displayName = "Table";

export function TableHeader({ className, children }: TableSectionProps) {
  const { stickyHeader } = useTableContext("TableHeader");
  const stickyClass = stickyHeader
    ? "sticky top-0 z-10 dark:bg-slate-950/95 bg-slate-50/95 backdrop-blur"
    : "";
  return (
    <thead data-slot="table-header" className={cn(stickyClass, className)}>
      {children}
    </thead>
  );
}

TableHeader.displayName = "TableHeader";

export function TableBody({ className, children }: TableSectionProps) {
  return (
    <tbody data-slot="table-body" className={cn(className)}>
      {children}
    </tbody>
  );
}

TableBody.displayName = "TableBody";

export function TableFooter({ className, children }: TableSectionProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-white/10 bg-white/3 font-medium",
        className,
      )}
    >
      {children}
    </tfoot>
  );
}

TableFooter.displayName = "TableFooter";

export function TableRow({
  className,
  children,
  ref,
  as: Wrapper = "tr",
  rowAnimation: _rowAnimation,
  ...rest
}: TableSectionProps & { ref?: React.Ref<HTMLTableRowElement> }) {
  const { appearance } = useTableContext("TableRow");

  return (
    <Wrapper
      ref={ref}
      data-slot="table-row"
      className={cn(tableRowVariants({ appearance }), className)}
      {...rest}
    >
      {children}
    </Wrapper>
  );
}

TableRow.displayName = "TableRow";

export function TableHead({
  className,
  children,
  scope = "col",
  sortKey,
  sortDirection,
  onSortChange,
  onClick,
  onKeyDown,
  tabIndex,
  ref,
  ...rest
}: TableHeadCellProps) {
  const { appearance, size, textAlign } = useTableContext("TableHead");
  const isSortable = Boolean(sortKey && onSortChange);
  const sortableDirection: TableSortDirection = sortDirection ?? "none";

  const handleSort = useCallback(() => {
    if (!sortKey || !onSortChange) {
      return;
    }

    const nextDirection: TableSortDirection =
      sortableDirection === "ascending"
        ? "descending"
        : sortableDirection === "descending"
          ? "none"
          : "ascending";

    onSortChange({
      sortKey,
      sortDirection: nextDirection,
    });
  }, [onSortChange, sortKey, sortableDirection]);

  const handleClick: TableHeadCellProps["onClick"] = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      handleSort();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTableCellElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !isSortable) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSort();
    }
  };

  return (
    <th
      ref={ref}
      data-slot="table-head"
      scope={scope}
      aria-sort={sortDirection}
      data-sort-key={sortKey}
      data-sort-direction={sortDirection}
      tabIndex={isSortable ? (tabIndex ?? 0) : tabIndex}
      className={cn(
        tableCellVariants({ appearance, size, textAlign }),
        isSortable &&
          "cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        className,
      )}
      onClick={isSortable ? handleClick : onClick}
      onKeyDown={isSortable ? handleKeyDown : onKeyDown}
      {...rest}
    >
      {children}
    </th>
  );
}

TableHead.displayName = "TableHead";

export function TableCell({
  className,
  children,
  ref,
  scope,
  ...rest
}: TableCellProps) {
  const { appearance, size, textAlign } = useTableContext("TableCell");
  const cellClassName = cn(
    tableCellVariants({ appearance, size, textAlign }),
    className,
  );

  if (scope !== undefined) {
    return (
      <th
        ref={ref}
        data-slot="table-cell"
        scope={scope}
        className={cellClassName}
        {...rest}
      >
        {children}
      </th>
    );
  }

  return (
    <td ref={ref} data-slot="table-cell" className={cellClassName} {...rest}>
      {children}
    </td>
  );
}

TableCell.displayName = "TableCell";

export function TableCaption({ className, children }: TableSectionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-3 text-left text-xs text-slate-500", className)}
    >
      {children}
    </caption>
  );
}

TableCaption.displayName = "TableCaption";
