import { cva } from "class-variance-authority";

import {
  zuiAnimatedNumberAppearance,
  zuiAnimatedNumberSize,
} from "../../design-system/animated-number";

export const animatedNumberAppearance = cva("inline-flex", {
  variants: {
    appearance: zuiAnimatedNumberAppearance,
    size: zuiAnimatedNumberSize,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});
