import { cva } from "class-variance-authority";

import {
  zuiButtonAppearances,
  zuiButtonBase,
  zuiButtonSizes,
} from "../../design-system";

export const buttonVariants = cva(zuiButtonBase, {
  variants: {
    appearance: zuiButtonAppearances,
    size: zuiButtonSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});
