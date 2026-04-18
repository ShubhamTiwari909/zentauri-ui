"use client";

import { createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

import { tableAnimationPresets } from "./animations";
import type {
  TableCtx,
  TableCellProps,
  TableHeadCellProps,
  TableProps,
  TableSectionProps,
} from "./types";
import { tableCellVariants, tableRowVariants, tableVariants } from "./variants";

const TableContext = createContext<TableCtx | null>(null);

function useTableContext(component: string): TableCtx {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Table>`);
  }
  return ctx;
}

export function Table(props: TableProps) {
  const {
    className,
    appearance = "default",
    size = "md",
    textAlign = "left",
    stickyHeader = false,
    rowAnimation = "none",
    children,
    ref,
    ...rest
  } = props;
  const ctx = useMemo(
    () => ({
      appearance: appearance ?? "default",
      size: size ?? "md",
      stickyHeader: Boolean(stickyHeader),
      rowAnimation,
      textAlign,
    }),
    [appearance, rowAnimation, size, stickyHeader, textAlign],
  );

  return (
    <TableContext.Provider value={ctx}>
      <div data-slot="table-scroll" className="relative w-full overflow-auto">
        <table
          ref={ref}
          data-slot="table"
          role="table"
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

Table.displayName = "Table";

export function TableHeader({ className, children }: TableSectionProps) {
  const { stickyHeader } = useTableContext("TableHeader");
  const stickyClass = stickyHeader
    ? "sticky top-0 z-10 bg-slate-950/95 backdrop-blur"
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
  ...rest
}: TableSectionProps & { ref?: React.Ref<HTMLTableRowElement> }) {
  const { appearance, rowAnimation } = useTableContext("TableRow");
  const motionProps = tableAnimationPresets[rowAnimation];

  return (
    <motion.tr
      ref={ref}
      data-slot="table-row"
      className={cn(tableRowVariants({ appearance }), className)}
      initial={false}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.tr>
  );
}

TableRow.displayName = "TableRow";

export function TableHead({
  className,
  children,
  scope = "col",
  sortDirection,
  ref,
  ...rest
}: TableHeadCellProps) {
  const { appearance, size, textAlign } = useTableContext("TableHead");
  return (
    <th
      ref={ref}
      data-slot="table-head"
      scope={scope}
      aria-sort={sortDirection}
      className={cn(
        tableCellVariants({ appearance, size, textAlign }),
        className,
      )}
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
  ...rest
}: TableCellProps) {
  const { appearance, size, textAlign } = useTableContext("TableCell");
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        tableCellVariants({ appearance, size, textAlign }),
        className,
      )}
      {...rest}
    >
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
