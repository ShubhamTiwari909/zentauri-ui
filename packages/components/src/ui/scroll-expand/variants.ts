import { cva } from "class-variance-authority";
import {
  zuiScrollExpandAppearances,
  zuiScrollExpandBase,
  zuiScrollExpandScrollers,
} from "../../design-system/scroll-expand";

export const scrollExpandVariants = cva(zuiScrollExpandBase, {
  variants: {
    appearance: zuiScrollExpandAppearances,
    scroller: zuiScrollExpandScrollers,
  },
  defaultVariants: { appearance: "default", scroller: "window" },
});
