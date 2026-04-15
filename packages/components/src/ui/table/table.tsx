"use client";

import { createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

import { tableAnimationPresets } from "./animations";
import type {
  TableCellProps,
  TableHeadCellProps,
  TableProps,
  TableSectionProps,
} from "./types";
import { tableCellVariants, tableRowVariants, tableVariants } from "./variants";

type TableCtx = {
  appearance: NonNullable<TableProps["appearance"]>;
  size: NonNullable<TableProps["size"]>;
  stickyHeader: boolean;
  rowAnimation: NonNullable<TableProps["rowAnimation"]>;
  textAlign: NonNullable<TableCellProps["textAlign"]>;
};

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
    overflow = "auto",
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
  const overflowClass =
    overflow === "auto"
      ? cn(
          "min-w-0 max-lg:overflow-x-auto max-lg:overscroll-x-contain lg:overflow-x-visible",
          "max-lg:[&_[data-slot=table]]:w-full max-lg:[&_[data-slot=table]]:min-w-max",
        )
      : "overflow-hidden";

  return (
    <TableContext.Provider value={ctx}>
      <div data-slot="table-scroll" className={cn("relative w-full")}>
        <table
          ref={ref}
          data-slot="table"
          role="table"
          className={cn(tableVariants({ appearance, size, stickyHeader }), overflowClass, className)}
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
  return (
    <thead data-slot="table-header" className={cn(className)}>
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
      className={cn("border-t border-white/10 bg-white/3 font-medium", className)}
    >
      {children}
    </tfoot>
  );
}

TableFooter.displayName = "TableFooter";

export function TableRow({ className, children, ref, ...rest }: TableSectionProps & { ref?: React.Ref<HTMLTableRowElement> }) {
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

export function TableHead({ className, children, scope = "col", sortDirection, ref, ...rest }: TableHeadCellProps) {
  const { size, textAlign } = useTableContext("TableHead");
  return (
    <th
      ref={ref}
      data-slot="table-head"
      scope={scope}
      aria-sort={sortDirection}
      className={cn(tableCellVariants({ size, textAlign }), className)}
      {...rest}
    >
      {children}
    </th>
  );
}

TableHead.displayName = "TableHead";

export function TableCell({ className, children, ref, ...rest }: TableCellProps) {
  const { size, textAlign } = useTableContext("TableCell");
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(tableCellVariants({ size, textAlign }), className)}
      {...rest}
    >
      {children}
    </td>
  );
}

TableCell.displayName = "TableCell";

export function TableCaption({ className, children }: TableSectionProps) {
  return (
    <caption data-slot="table-caption" className={cn("mt-3 text-left text-xs text-slate-500", className)}>
      {children}
    </caption>
  );
}

TableCaption.displayName = "TableCaption";
