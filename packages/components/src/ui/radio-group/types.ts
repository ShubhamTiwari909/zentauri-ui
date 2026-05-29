import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type {
  radioGroupControlVariants,
  radioGroupIndicatorVariants,
  radioGroupItemVariants,
  radioGroupRootVariants,
} from "./variants";

export type RadioGroupRootVariantProps = VariantProps<
  typeof radioGroupRootVariants
>;
export type RadioGroupItemVariantProps = VariantProps<
  typeof radioGroupItemVariants
>;
export type RadioGroupControlVariantProps = VariantProps<
  typeof radioGroupControlVariants
>;
export type RadioGroupIndicatorVariantProps = VariantProps<
  typeof radioGroupIndicatorVariants
>;

export type RadioGroupAppearance = NonNullable<
  RadioGroupControlVariantProps["appearance"]
>;
export type RadioGroupSize = NonNullable<RadioGroupItemVariantProps["size"]>;

export type RadioGroupProps = RadioGroupRootVariantProps &
  Pick<RadioGroupControlVariantProps, "appearance"> &
  RadioGroupItemVariantProps &
  Omit<
    ComponentPropsWithRef<"div">,
    "defaultValue" | "dir" | "onChange" | "role"
  > & {
    value?: string;
    defaultValue?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    onValueChange?: (value: string) => void;
  };

export type RadioGroupItemProps = RadioGroupItemVariantProps &
  RadioGroupControlVariantProps &
  Omit<
    ComponentPropsWithRef<"input">,
    | "type"
    | "size"
    | "name"
    | "checked"
    | "defaultChecked"
    | "onChange"
    | "children"
  > & {
    value: string;
    label?: ReactNode;
    children?: ReactNode;
    rootClassName?: string;
    controlClassName?: string;
    indicatorClassName?: string;
  };
