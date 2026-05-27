import { cva } from "class-variance-authority";

import {
  zuiSelectContentAppearances,
  zuiSelectContentBase,
  zuiSelectDisabled,
  zuiSelectItemAppearances,
  zuiSelectItemBase,
  zuiSelectSizes,
  zuiSelectSpacing,
  zuiSelectTriggerBase,
  zuiSelectTriggerVariants,
} from "../../design-system/select";

export const selectTriggerVariants = cva(zuiSelectTriggerBase, {
  variants: {
    variant: zuiSelectTriggerVariants,
    size: zuiSelectSizes,
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const selectItemVariants = cva(zuiSelectItemBase, {
  variants: {
    appearance: zuiSelectItemAppearances,
    disabled: zuiSelectDisabled,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const selectContentVariants = cva(zuiSelectContentBase, {
  variants: {
    appearance: zuiSelectContentAppearances,
    size: zuiSelectSizes,
    spacing: zuiSelectSpacing,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    spacing: "default",
  },
});
