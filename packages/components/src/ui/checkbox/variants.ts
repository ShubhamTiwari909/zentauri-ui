import { cva } from "class-variance-authority";

import {
  zuiCheckboxAppearances,
  zuiCheckboxControlBase,
  zuiCheckboxIndicatorBase,
  zuiCheckboxRootBase,
  zuiCheckboxSizes,
} from "../../design-system/checkbox";

export const checkboxRootVariants = cva(zuiCheckboxRootBase, {
  variants: {
    size: {
      sm: zuiCheckboxSizes.sm.root,
      md: zuiCheckboxSizes.md.root,
      lg: zuiCheckboxSizes.lg.root,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const checkboxControlVariants = cva(zuiCheckboxControlBase, {
  variants: {
    appearance: zuiCheckboxAppearances,
    size: {
      sm: zuiCheckboxSizes.sm.control,
      md: zuiCheckboxSizes.md.control,
      lg: zuiCheckboxSizes.lg.control,
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const checkboxIndicatorVariants = cva(zuiCheckboxIndicatorBase, {
  variants: {
    size: {
      sm: zuiCheckboxSizes.sm.indicator,
      md: zuiCheckboxSizes.md.indicator,
      lg: zuiCheckboxSizes.lg.indicator,
    },
  },
  defaultVariants: {
    size: "md",
  },
});
