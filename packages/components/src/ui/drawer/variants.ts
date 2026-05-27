import { cva } from "class-variance-authority";

import {
  zuiDrawerContentAppearances,
  zuiDrawerContentBase,
  zuiDrawerContentSides,
  zuiDrawerContentSizes,
  zuiDrawerOverlayBase,
  zuiDrawerTriggerAppearances,
  zuiDrawerTriggerBase,
} from "../../design-system/drawer";

export const drawerOverlayVariants = cva(zuiDrawerOverlayBase);

export const drawerTriggerVariants = cva(zuiDrawerTriggerBase, {
  variants: {
    appearance: zuiDrawerTriggerAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const drawerContentVariants = cva(zuiDrawerContentBase, {
  variants: {
    side: zuiDrawerContentSides,
    size: zuiDrawerContentSizes,
    appearance: zuiDrawerContentAppearances,
  },
  compoundVariants: [
    { side: "left", size: "sm", class: "w-[min(100%,320px)]" },
    { side: "left", size: "md", class: "w-[min(100%,420px)]" },
    { side: "left", size: "lg", class: "w-[min(100%,520px)]" },
    { side: "left", size: "xl", class: "w-[min(100%,640px)]" },
    { side: "left", size: "full", class: "w-full max-w-none" },
    { side: "right", size: "sm", class: "w-[min(100%,320px)]" },
    { side: "right", size: "md", class: "w-[min(100%,420px)]" },
    { side: "right", size: "lg", class: "w-[min(100%,520px)]" },
    { side: "right", size: "xl", class: "w-[min(100%,640px)]" },
    { side: "right", size: "full", class: "w-full max-w-none" },
  ],
  defaultVariants: {
    side: "right",
    size: "md",
    appearance: "default",
  },
});
