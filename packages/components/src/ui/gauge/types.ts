import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { gaugeVariants } from "./variants";

export type GaugeVariantProps = VariantProps<typeof gaugeVariants>;

export type GaugeBaseProps = GaugeVariantProps &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    value?: number;
    min?: number;
    max?: number;
    label?: string;
    showValue?: boolean;
    formatValue?: (value: number, percentage: number) => string;
    children?: ReactNode;
  };

export type GaugeProps = GaugeBaseProps;
