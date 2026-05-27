import { cva } from "class-variance-authority";

import {
  zuiDividerAppearances,
  zuiDividerBase,
  zuiDividerLabelBase,
  zuiDividerLineBase,
  zuiDividerLineOrientations,
  zuiDividerOrientations,
  zuiDividerSizes,
} from "../../design-system/divider";

export const dividerToneVariants = cva("", {
  variants: {
    appearance: zuiDividerAppearances,
  },
  defaultVariants: { appearance: "default" },
});

export const dividerVariants = cva(zuiDividerBase, {
  variants: {
    appearance: zuiDividerAppearances,
    orientation: zuiDividerOrientations,
    size: zuiDividerSizes,
  },
  compoundVariants: [
    { orientation: "horizontal", size: "sm", class: "min-h-px" },
    { orientation: "horizontal", size: "md", class: "min-h-[2px]" },
    { orientation: "horizontal", size: "lg", class: "min-h-[3px]" },
    { orientation: "vertical", size: "sm", class: "min-w-px" },
    { orientation: "vertical", size: "md", class: "min-w-[2px]" },
    { orientation: "vertical", size: "lg", class: "min-w-[3px]" },
  ],
  defaultVariants: {
    appearance: "default",
    orientation: "horizontal",
    size: "md",
  },
});

export const dividerLineVariants = cva(zuiDividerLineBase, {
  variants: {
    orientation: zuiDividerLineOrientations,
    size: zuiDividerSizes,
  },
  compoundVariants: [
    { orientation: "horizontal", size: "sm", class: "h-px" },
    { orientation: "horizontal", size: "md", class: "h-0.5" },
    { orientation: "horizontal", size: "lg", class: "h-1" },
    { orientation: "vertical", size: "sm", class: "w-px" },
    { orientation: "vertical", size: "md", class: "w-0.5" },
    { orientation: "vertical", size: "lg", class: "w-1" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export const dividerLabelVariants = cva(zuiDividerLabelBase);
