import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { jsonViewerVariants } from "./variants";

export type JsonViewerVariantProps = VariantProps<typeof jsonViewerVariants>;

/** Coarse classification of a JSON value, driving syntax color and rendering. */
export type JsonValueKind =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "object"
  | "array";

/** Override the toolbar / empty copy. */
export interface JsonViewerLabels {
  expandAll?: ReactNode;
  collapseAll?: ReactNode;
  copy?: ReactNode;
  copied?: ReactNode;
  root?: ReactNode;
}

export type JsonViewerBaseProps = VariantProps<typeof jsonViewerVariants> &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    /** The JSON-serializable value to render. */
    data: unknown;
    /** Expand containers whose depth is below this value (0 = collapse all but root). Defaults to expanding everything. */
    defaultExpandedDepth?: number;
    /** Show the toolbar with expand-all / collapse-all / copy controls. */
    showToolbar?: boolean;
    /** Show a copy button that copies the pretty-printed JSON. */
    enableClipboard?: boolean;
    /** Show the count of keys / items next to a container's preview. */
    showItemCount?: boolean;
    /** Render quotes around string values (and stringify-escape them). */
    quoteStrings?: boolean;
    /** Override default toolbar copy. */
    labels?: JsonViewerLabels;
  };

export type JsonViewerProps = JsonViewerBaseProps;
