import { cva } from "class-variance-authority";

import {
  zuiTooltipBase,
  zuiTooltipSizes,
  zuiTooltipVariants,
  zuiTooltipWidths,
} from "../../design-system/tooltip";

export const tooltipVariants = cva(zuiTooltipBase, {
  variants: {
    variant: zuiTooltipVariants,
    size: zuiTooltipSizes,
    width: zuiTooltipWidths,
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    width: "xs",
  },
});
