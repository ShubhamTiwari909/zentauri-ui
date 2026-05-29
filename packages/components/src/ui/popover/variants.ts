import { cva } from "class-variance-authority";

import {
  zuiPopoverContentBase,
  zuiPopoverContentSizes,
  zuiPopoverContentVariants,
  zuiPopoverContentWidths,
} from "../../design-system/popover";

export const popoverContentVariants = cva(zuiPopoverContentBase, {
  variants: {
    variant: zuiPopoverContentVariants,
    size: zuiPopoverContentSizes,
    width: zuiPopoverContentWidths,
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    width: "xs",
  },
});
