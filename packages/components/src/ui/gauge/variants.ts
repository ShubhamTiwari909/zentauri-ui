import { cva } from "class-variance-authority";

import {
  zuiGaugeAppearances,
  zuiGaugeBase,
  zuiGaugeSizes,
  zuiGaugeThicknesses,
  zuiGaugeVariants,
} from "../../design-system/gauge";

export const gaugeVariants = cva(zuiGaugeBase, {
  variants: {
    appearance: zuiGaugeAppearances,
    size: zuiGaugeSizes,
    thickness: zuiGaugeThicknesses,
    variant: zuiGaugeVariants,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    thickness: "medium",
    variant: "radial",
  },
});
