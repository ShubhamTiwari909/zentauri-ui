import type { TableCellProps, TableProps } from "@zentauri-ui/zentauri-components/ui";

export type TableDemoProps = {
  appearance: NonNullable<TableProps["appearance"]>;
  size: NonNullable<TableProps["size"]>;
  stickyHeader: boolean;
  textAlign?: NonNullable<TableCellProps["textAlign"]>;
  className?: string;
};
