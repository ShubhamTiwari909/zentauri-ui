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
  /** Accessible name for the slider (applied to the focusable thumb). */
  "aria-label"?: string;
  /** Visible label element id (`aria-labelledby` on the focusable thumb). */
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
  /** Accessible name for the range control (each thumb gets a distinct suffix). */
  "aria-label"?: string;
  /** Visible label element id for each thumb when `aria-label` is not used. */
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
  /** Mirrored from `<Slider>` so the focusable thumb exposes an accessible name. */
  "aria-label"?: string;
  /** Mirrored from `<Slider>` so the focusable thumb exposes an accessible name. */
  "aria-labelledby"?: string;
};
