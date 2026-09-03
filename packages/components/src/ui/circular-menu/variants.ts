import { cva } from "class-variance-authority";

import {
  zuiCircularMenuItemAppearances,
  zuiCircularMenuItemBase,
  zuiCircularMenuItemIconBase,
  zuiCircularMenuItemLabelBase,
  zuiCircularMenuItemPositionerBase,
  zuiCircularMenuLabelPlacements,
  zuiCircularMenuListBase,
  zuiCircularMenuRootBase,
  zuiCircularMenuSizes,
  zuiCircularMenuSpokeAppearances,
  zuiCircularMenuSpokeBase,
  zuiCircularMenuTriggerAppearances,
  zuiCircularMenuTriggerBase,
} from "../../design-system/circular-menu";

export const circularMenuVariants = cva(zuiCircularMenuRootBase, {
  variants: {
    size: zuiCircularMenuSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const circularMenuTriggerVariants = cva(zuiCircularMenuTriggerBase, {
  variants: {
    appearance: zuiCircularMenuTriggerAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const circularMenuListVariants = cva(zuiCircularMenuListBase);

export const circularMenuItemPositionerVariants = cva(
  zuiCircularMenuItemPositionerBase,
);

export const circularMenuItemVariants = cva(zuiCircularMenuItemBase, {
  variants: {
    appearance: zuiCircularMenuItemAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const circularMenuItemIconVariants = cva(zuiCircularMenuItemIconBase);

export const circularMenuItemLabelVariants = cva(zuiCircularMenuItemLabelBase, {
  variants: {
    placement: zuiCircularMenuLabelPlacements,
  },
  defaultVariants: {
    placement: "tooltip",
  },
});

export const circularMenuSpokeVariants = cva(zuiCircularMenuSpokeBase, {
  variants: {
    appearance: zuiCircularMenuSpokeAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});
