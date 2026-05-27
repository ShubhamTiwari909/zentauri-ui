import { cva } from "class-variance-authority";

import {
  zuiToastRootAppearances,
  zuiToastRootBase,
  zuiToastRootSizes,
  zuiToastViewportBase,
  zuiToastViewportPositions,
} from "../../design-system/toast";

export const toastViewportVariants = cva(zuiToastViewportBase, {
  variants: {
    position: zuiToastViewportPositions,
  },
  defaultVariants: {
    position: "bottom-right",
  },
});

export const toastRootVariants = cva(zuiToastRootBase, {
  variants: {
    appearance: zuiToastRootAppearances,
    size: zuiToastRootSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});
