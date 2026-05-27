import { cva } from "class-variance-authority";

import {
  zuiTabsListBase,
  zuiTabsListSizes,
  zuiTabsListVariants,
  zuiTabsOrientations,
  zuiTabsTriggerAppearances,
  zuiTabsTriggerBase,
  zuiTabsTriggerSizes,
  zuiTabsTriggerVariants,
} from "../../design-system/tabs";

export const tabsListVariants = cva(zuiTabsListBase, {
  variants: {
    variant: zuiTabsListVariants,
    size: zuiTabsListSizes,
    orientation: zuiTabsOrientations,
  },
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
    variant: "pills",
  },
});

export const tabsTriggerVariants = cva(zuiTabsTriggerBase, {
  variants: {
    appearance: zuiTabsTriggerAppearances,
    variant: zuiTabsTriggerVariants,
    size: zuiTabsTriggerSizes,
  },
  defaultVariants: {
    appearance: "default",
    variant: "pills",
    size: "md",
  },
});
