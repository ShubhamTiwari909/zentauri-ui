import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { logViewerVariants } from "./variants";

export type LogViewerVariantProps = VariantProps<typeof logViewerVariants>;

export type LogLevel = "error" | "warn" | "info" | "debug" | "verbose";

export type LogEntry = {
  level: LogLevel;
  timestamp: string | Date;
  message: string;
  meta?: string;
  stack?: string;
};

export interface LogViewerLabels {
  copy?: ReactNode;
  copied?: ReactNode;
  noLogs?: ReactNode;
  searchPlaceholder?: ReactNode;
  showing?: ReactNode;
  total?: ReactNode;
}

export type LogViewerBaseProps = VariantProps<typeof logViewerVariants> &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    entries: LogEntry[];
    defaultActiveLevels?: LogLevel[];
    enableClipboard?: boolean;
    enableSearch?: boolean;
    labels?: LogViewerLabels;
    showHeader?: boolean;
    showSummary?: boolean;
  };

export type LogViewerProps = LogViewerBaseProps;
