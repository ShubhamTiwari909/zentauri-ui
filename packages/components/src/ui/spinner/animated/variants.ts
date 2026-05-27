import { cva } from "class-variance-authority";

import {
  zuiSpinnerAppearances,
  zuiSpinnerBase,
  zuiSpinnerSizes,
  zuiSpinnerVariants,
} from "../../../design-system/spinner";

export const spinnerVariants = cva(zuiSpinnerBase, {
  variants: {
    appearance: zuiSpinnerAppearances,
    size: zuiSpinnerSizes,
    variant: zuiSpinnerVariants,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    variant: "ring",
  },
});
