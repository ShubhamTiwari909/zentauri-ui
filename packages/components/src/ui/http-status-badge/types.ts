import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import type { HttpStatusBadgeTone } from "../../design-system/http-status-badge";
import type { httpStatusBadgeVariants } from "./variants";

export type { HttpStatusBadgeTone } from "../../design-system/http-status-badge";

export type HttpStatusBadgeVariantProps = VariantProps<
  typeof httpStatusBadgeVariants
>;

export type HttpStatusBadgeBaseProps = HttpStatusBadgeVariantProps &
  Omit<ComponentPropsWithRef<"span">, "children"> & {
    /** The HTTP status code to render (e.g. 200, 404, 503). */
    status: number;
    /** Override the reason phrase. Defaults to a known phrase for the code, or the tone label. */
    statusText?: string;
    /** Show the reason phrase next to the code. Defaults to true. */
    showText?: boolean;
  };

export type HttpStatusBadgeProps = HttpStatusBadgeBaseProps;

export type { HttpStatusBadgeTone as HttpStatusBadgeToneType };
