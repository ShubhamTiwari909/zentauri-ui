import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type {
  checkboxControlVariants,
  checkboxIndicatorVariants,
  checkboxRootVariants,
} from "./variants";

export type CheckboxState = "checked" | "unchecked" | "indeterminate";

export type CheckboxRootVariantProps = VariantProps<
  typeof checkboxRootVariants
>;
export type CheckboxControlVariantProps = VariantProps<
  typeof checkboxControlVariants
>;
export type CheckboxIndicatorVariantProps = VariantProps<
  typeof checkboxIndicatorVariants
>;

export type CheckboxProps = CheckboxRootVariantProps &
  CheckboxControlVariantProps &
  Omit<
    ComponentPropsWithRef<"input">,
    "type" | "size" | "checked" | "defaultChecked" | "onChange" | "children"
  > & {
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    children?: ReactNode;
    label?: ReactNode;
    rootClassName?: string;
    controlClassName?: string;
    indicatorClassName?: string;
  };
