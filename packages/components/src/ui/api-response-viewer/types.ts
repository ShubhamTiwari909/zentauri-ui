import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { apiResponseViewerVariants } from "./variants";

export type ApiResponseViewerVariantProps = VariantProps<
  typeof apiResponseViewerVariants
>;

/** Semantic classification of an HTTP status code, driving the status pill color. */
export type ApiResponseStatusTone =
  | "info"
  | "success"
  | "redirect"
  | "clientError"
  | "serverError"
  | "neutral";

/** Which panel is shown. */
export type ApiResponseViewerTab = "body" | "headers";

/** Override the tab / copy labels. */
export interface ApiResponseViewerLabels {
  copy?: ReactNode;
  copied?: ReactNode;
  bodyTab?: ReactNode;
  headersTab?: ReactNode;
}

export type ApiResponseViewerBaseProps = Omit<
  VariantProps<typeof apiResponseViewerVariants>,
  "size"
> &
  Omit<ComponentPropsWithRef<"div">, "children" | "size"> & {
    /** HTTP status code, e.g. 200, 404, 500. */
    status: number;
    /** Reason phrase. Derived from a common-codes map (then the status class) when omitted. */
    statusText?: string;
    /** Request method, e.g. "GET". */
    method?: string;
    /** Request URL (truncated in the header). */
    url?: string;
    /** Round-trip time in milliseconds. */
    time?: number;
    /**
     * Visual scale of the viewer chrome (sm | md | lg). Named `size` to mirror
     * the library's other display components.
     */
    size?: NonNullable<VariantProps<typeof apiResponseViewerVariants>["size"]>;
    /** Human-readable response payload size, e.g. "2.4 KB". */
    responseSize?: string;
    /** Response headers rendered in the Headers tab. */
    headers?: Record<string, string>;
    /** Response body, pretty-printed as JSON in the Body tab. */
    body?: unknown;
    /** Which tab is active initially. */
    defaultTab?: ApiResponseViewerTab;
    /** Show a copy button that copies the pretty-printed JSON body. */
    enableClipboard?: boolean;
    /** Override default tab / copy copy. */
    labels?: ApiResponseViewerLabels;
  };

export type ApiResponseViewerProps = ApiResponseViewerBaseProps;
