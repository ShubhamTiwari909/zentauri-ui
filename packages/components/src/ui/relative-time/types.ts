import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { RelativeTimeUnit } from "../../hooks/useRelativeTime";

import type { relativeTimeVariants } from "./variants";

export type RelativeTimeVariantProps = VariantProps<
  typeof relativeTimeVariants
>;

export interface RelativeTimeBaseProps
  extends
    RelativeTimeVariantProps,
    Omit<ComponentPropsWithRef<"time">, "dateTime" | "children"> {
  date: Date | number | string;
  locale?: string | string[];
  formatStyle?: Intl.RelativeTimeFormatStyle;
  numeric?: Intl.RelativeTimeFormatNumeric;
  live?: boolean;
  absoluteAfter?: { unit: RelativeTimeUnit; count: number };
  withTooltip?: boolean;
  tooltipFormatOptions?: Intl.DateTimeFormatOptions;
  ssrFallback?: React.ReactNode;
}

export type RelativeTimeProps = RelativeTimeBaseProps;
