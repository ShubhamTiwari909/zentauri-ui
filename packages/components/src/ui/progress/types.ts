import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import type { progressVariants } from "./variants";

export type ProgressVariantProps = VariantProps<typeof progressVariants>;

export type ProgressProps = ProgressVariantProps &
  (Omit<ComponentPropsWithRef<"div">, "children"> & {
    value?: number;
    min?: number;
    max?: number;
    label?: string;
    children?: ReactNode;
    as?: ElementType;
  });

export type ProgressSectionProps = {
  className?: string;
  children?: ReactNode;
  as?: ElementType;
};

export type ProgressCtx = {
  value: number;
  min: number;
  max: number;
  size: NonNullable<ProgressProps["size"]>;
  shape: NonNullable<ProgressProps["shape"]>;
  striped: boolean;
  animated: boolean;
  appearance: NonNullable<ProgressProps["appearance"]>;
};
