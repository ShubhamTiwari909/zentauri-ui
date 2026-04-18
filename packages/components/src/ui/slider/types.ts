import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode, RefObject } from "react";

import type {
  sliderRangeVariants,
  sliderRootVariants,
  sliderThumbVariants,
  sliderTrackVariants,
} from "./variants";

type SliderRootVariantProps = VariantProps<typeof sliderRootVariants>;
type SliderThumbVariantProps = VariantProps<typeof sliderThumbVariants>;

export type SliderProps = SliderRootVariantProps & {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  appearance?: VariantProps<typeof sliderRangeVariants>["appearance"];
  /** Label for the slider group (accessibility). */
  "aria-label"?: string;
  /** Optional visible label id */
  "aria-labelledby"?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "defaultValue">;

export type SliderTrackProps = ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof sliderTrackVariants>;

export type SliderRangeProps = ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof sliderRangeVariants>;

export type SliderThumbProps = SliderThumbVariantProps &
  ComponentPropsWithoutRef<"div">;

export type RangeSliderProps = SliderRootVariantProps & {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  disabled?: boolean;
  appearance?: VariantProps<typeof sliderRangeVariants>["appearance"];
  "aria-label"?: string;
  "aria-labelledby"?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "defaultValue">;

export type SliderAppearance = NonNullable<
  Parameters<typeof sliderRangeVariants>[0]
>["appearance"];

export type SliderCtx = {
  min: number;
  max: number;
  step: number;
  value: number;
  setValue: (next: number) => void;
  disabled: boolean;
  size: NonNullable<SliderProps["size"]>;
  appearance: SliderAppearance;
  trackRef: RefObject<HTMLDivElement | null>;
};