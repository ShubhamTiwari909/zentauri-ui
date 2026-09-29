import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { numberInputVariants } from "./variants";

export type NumberInputProps = Omit<
  ComponentPropsWithRef<"input">,
  | "size"
  | "value"
  | "defaultValue"
  | "onChange"
  | "min"
  | "max"
  | "step"
  | "type"
> &
  VariantProps<typeof numberInputVariants> & {
    value?: number | null;
    defaultValue?: number | null;
    onValueChange?: (value: number | null) => void;
    min?: number;
    max?: number;
    step?: number;
    showControls?: boolean;
  };
