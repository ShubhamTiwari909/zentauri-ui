import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { consoleViewerVariants } from "./variants";

export type ConsoleViewerVariantProps = VariantProps<
  typeof consoleViewerVariants
>;

export type ConsoleEntryType =
  | "log"
  | "info"
  | "warn"
  | "error"
  | "debug"
  | "dir"
  | "table"
  | "group"
  | "groupCollapsed"
  | "groupEnd";

export type ConsoleEntry = {
  type: ConsoleEntryType;
  message: string;
  stack?: string;
  count?: number;
  children?: ConsoleEntry[];
};

export interface ConsoleViewerLabels {
  copy?: ReactNode;
  copied?: ReactNode;
  clear?: ReactNode;
  collapseAll?: ReactNode;
  noEntries?: ReactNode;
}

export type ConsoleViewerBaseProps = VariantProps<
  typeof consoleViewerVariants
> &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    entries: ConsoleEntry[];
    enableFilter?: boolean;
    enableClear?: boolean;
    enableCollapseAll?: boolean;
    enableClipboard?: boolean;
    labels?: ConsoleViewerLabels;
    defaultFilter?: ConsoleEntryType[];
    initiallyCollapsed?: boolean;
  };

export type ConsoleViewerProps = ConsoleViewerBaseProps;
