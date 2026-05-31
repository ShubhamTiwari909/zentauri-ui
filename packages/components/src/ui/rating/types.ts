import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { IconType } from "react-icons";

import type { ratingIconVariants, ratingItemVariants } from "./variants";

export type RatingPresetIcon = "star" | "heart" | "flame" | "thumb";

export type RatingItemVariantProps = VariantProps<typeof ratingItemVariants>;
export type RatingIconVariantProps = VariantProps<typeof ratingIconVariants>;

export type RatingProps = RatingItemVariantProps &
  RatingIconVariantProps &
  Omit<
    ComponentPropsWithRef<"div">,
    "children" | "defaultValue" | "onChange"
  > & {
    allowClear?: boolean;
    allowHalf?: boolean;
    defaultValue?: number;
    disabled?: boolean;
    errorMessage?: ReactNode;
    getLabel?: (value: number, max: number) => string;
    hint?: ReactNode;
    icon?: RatingPresetIcon | IconType;
    iconClassName?: string;
    label?: ReactNode;
    max?: number;
    name?: string;
    onValueChange?: (value: number) => void;
    readOnly?: boolean;
    value?: number;
  };
