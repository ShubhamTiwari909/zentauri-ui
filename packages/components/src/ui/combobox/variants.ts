import { cva } from "class-variance-authority";

import {
  zuiComboboxContentAppearances,
  zuiComboboxContentBase,
  zuiComboboxDisabled,
  zuiComboboxItemAppearances,
  zuiComboboxItemBase,
  zuiComboboxListAppearances,
  zuiComboboxListBase,
  zuiComboboxSizes,
  zuiComboboxSpacing,
  zuiComboboxTriggerBase,
  zuiComboboxTriggerVariants,
} from "../../design-system/combobox";

export const comboboxTriggerVariants = cva(zuiComboboxTriggerBase, {
  variants: {
    variant: zuiComboboxTriggerVariants,
    size: zuiComboboxSizes,
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const comboboxItemVariants = cva(zuiComboboxItemBase, {
  variants: {
    appearance: zuiComboboxItemAppearances,
    disabled: zuiComboboxDisabled,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const comboboxListVariants = cva(zuiComboboxListBase, {
  variants: {
    appearance: zuiComboboxListAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const comboboxContentVariants = cva(zuiComboboxContentBase, {
  variants: {
    appearance: zuiComboboxContentAppearances,
    size: zuiComboboxSizes,
    spacing: zuiComboboxSpacing,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    spacing: "default",
  },
});
