import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { httpRequestViewerVariants } from "./variants";

export type HttpRequestViewerVariantProps = VariantProps<
  typeof httpRequestViewerVariants
>;

/** The selectable detail panels. */
export type HttpRequestViewerTab = "headers" | "query" | "body";

/** Override tab labels and copy-button copy. */
export interface HttpRequestViewerLabels {
  headers?: ReactNode;
  query?: ReactNode;
  body?: ReactNode;
  copy?: ReactNode;
  copied?: ReactNode;
}

export type HttpRequestViewerBaseProps = VariantProps<
  typeof httpRequestViewerVariants
> &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    /** HTTP method, e.g. GET / POST / PUT / PATCH / DELETE. */
    method: string;
    /** Request URL (may include the query string). */
    url: string;
    /** Request headers, rendered as key:value rows. */
    headers?: Record<string, string>;
    /** Query parameters, rendered as key:value rows. Supports multi-value params (e.g. ?id=1&id=2). */
    query?: Record<string, string | string[]>;
    /** Request body — pretty-printed as JSON in a code block. */
    body?: unknown;
    /** Which detail panel is open on first render. */
    defaultTab?: HttpRequestViewerTab;
    /** Show a copy button that copies the body JSON (or a request summary). */
    enableClipboard?: boolean;
    /** Override default tab / copy copy. */
    labels?: HttpRequestViewerLabels;
  };

export type HttpRequestViewerProps = HttpRequestViewerBaseProps;
