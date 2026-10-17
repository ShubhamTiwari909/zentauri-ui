import { cva } from "class-variance-authority";
import {
  zuiMaskedHeadingAligns,
  zuiMaskedHeadingAppearances,
  zuiMaskedHeadingBase,
  zuiMaskedHeadingOutline,
  zuiMaskedHeadingSizes,
  zuiMaskedHeadingText,
} from "../../design-system/masked-heading";

export const maskedHeadingVariants = cva(zuiMaskedHeadingBase, {
  variants: {
    appearance: zuiMaskedHeadingAppearances,
    size: zuiMaskedHeadingSizes,
    align: zuiMaskedHeadingAligns,
  },
  defaultVariants: { appearance: "aurora", size: "lg", align: "start" },
});

export const maskedHeadingTextVariants = cva(zuiMaskedHeadingText, {
  variants: {
    outline: { true: zuiMaskedHeadingOutline, false: "" },
  },
  defaultVariants: { outline: false },
});
