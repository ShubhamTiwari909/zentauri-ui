import { cva } from "class-variance-authority";

import {
  zuiCopyButtonAppearances,
  zuiCopyButtonBase,
  zuiCopyButtonIconOnlySizes,
  zuiCopyButtonSizes,
} from "../../design-system/copy-button";

export const copyButtonVariants = cva(zuiCopyButtonBase, {
  variants: {
    appearance: zuiCopyButtonAppearances,
    size: zuiCopyButtonSizes,
    iconOnly: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { iconOnly: true, size: "sm", class: zuiCopyButtonIconOnlySizes.sm },
    { iconOnly: true, size: "md", class: zuiCopyButtonIconOnlySizes.md },
    { iconOnly: true, size: "lg", class: zuiCopyButtonIconOnlySizes.lg },
  ],
  defaultVariants: {
    appearance: "default",
    size: "md",
    iconOnly: true,
  },
});
