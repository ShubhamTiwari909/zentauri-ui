import { cva } from "class-variance-authority";

import {
  zuiSplitButtonContent,
  zuiSplitButtonDropdown,
  zuiSplitButtonFullWidth,
  zuiSplitButtonGroup,
  zuiSplitButtonItemDisabled,
  zuiSplitButtonPrimary,
  zuiSplitButtonRoot,
  zuiSplitButtonTrigger,
  zuiSplitButtonTriggerSizes,
} from "../../design-system";

export const splitButtonRootVariants = cva(zuiSplitButtonRoot, {
  variants: {
    fullWidth: {
      true: zuiSplitButtonFullWidth,
    },
  },
});
export const splitButtonDropdownVariants = cva(zuiSplitButtonDropdown, {
  variants: {
    fullWidth: {
      true: zuiSplitButtonFullWidth,
    },
  },
});
export const splitButtonGroupVariants = cva(zuiSplitButtonGroup, {
  variants: {
    fullWidth: {
      true: zuiSplitButtonFullWidth,
    },
  },
});
export const splitButtonPrimaryVariants = cva(zuiSplitButtonPrimary);
export const splitButtonTriggerVariants = cva(zuiSplitButtonTrigger, {
  variants: {
    size: zuiSplitButtonTriggerSizes,
  },
  defaultVariants: {
    size: "md",
  },
});
export const splitButtonContentVariants = cva(zuiSplitButtonContent);
export const splitButtonItemDisabledVariants = cva(zuiSplitButtonItemDisabled);
