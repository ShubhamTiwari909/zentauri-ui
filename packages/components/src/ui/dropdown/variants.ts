import { cva } from "class-variance-authority";

import {
  zuiDropdownContentBase,
  zuiDropdownItemBase,
  zuiDropdownItemVariants,
  zuiDropdownPlacements,
  zuiDropdownSpacing,
  zuiDropdownTriggerBase,
  zuiDropdownTriggerSizes,
  zuiDropdownTriggerVariants,
} from "../../design-system/dropdown";

export const triggerVariants = cva(zuiDropdownTriggerBase, {
  variants: {
    variant: zuiDropdownTriggerVariants,
    size: zuiDropdownTriggerSizes,
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const contentVariants = cva(zuiDropdownContentBase, {
  variants: {
    placement: zuiDropdownPlacements,
    spacing: zuiDropdownSpacing,
  },
  defaultVariants: {
    placement: "bottom",
    spacing: "default",
  },
});

export const itemVariants = cva(zuiDropdownItemBase, {
  variants: {
    variant: zuiDropdownItemVariants,
  },
  defaultVariants: {
    variant: "default",
  },
});
