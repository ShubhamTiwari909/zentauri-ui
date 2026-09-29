import { cva } from "class-variance-authority";
import {
  zuiNumberInputAppearances,
  zuiNumberInputBase,
  zuiNumberInputSizes,
} from "../../design-system/number-input";

export const numberInputVariants = cva(zuiNumberInputBase, {
  variants: {
    appearance: zuiNumberInputAppearances,
    size: zuiNumberInputSizes,
  },
  defaultVariants: { appearance: "default", size: "md" },
});
