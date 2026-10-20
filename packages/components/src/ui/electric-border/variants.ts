import { cva } from "class-variance-authority";
import {
  zuiElectricBorderAppearances,
  zuiElectricBorderBase,
} from "../../design-system/electric-border";

export const electricBorderVariants = cva(zuiElectricBorderBase, {
  variants: { appearance: zuiElectricBorderAppearances },
  defaultVariants: { appearance: "default" },
});
