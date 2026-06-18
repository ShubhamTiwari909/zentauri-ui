// data-table.tsx — default static entry (no framer-motion)
import { DataTableBase } from "./data-table-base";
import type { DataTableProps } from "./types";

export function DataTable<TData, TKey extends string = string>(
  props: DataTableProps<TData, TKey>,
) {
  return <DataTableBase {...props} />;
}

DataTable.displayName = "DataTable";
