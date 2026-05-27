import { cva } from "class-variance-authority";

import {
  zuiBadgeAppearances,
  zuiBadgeBase,
  zuiBadgeCloseButtonBase,
  zuiBadgeCloseButtonSizes,
  zuiBadgeShapes,
  zuiBadgeSizes,
  zuiButtonLikeSolidAppearances,
  type ZuiButtonLikeSolidAppearance,
} from "../../design-system/badge";

export const buttonLikeSolidAppearances = zuiButtonLikeSolidAppearances;
export type ButtonLikeSolidAppearance = ZuiButtonLikeSolidAppearance;

export const badgeVariants = cva(zuiBadgeBase, {
  variants: {
    appearance: zuiBadgeAppearances,
    size: zuiBadgeSizes,
    shape: zuiBadgeShapes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    shape: "pill",
  },
});

export const badgeCloseButtonVariants = cva(zuiBadgeCloseButtonBase, {
  variants: {
    size: zuiBadgeCloseButtonSizes,
  },
  defaultVariants: { size: "md" },
});
