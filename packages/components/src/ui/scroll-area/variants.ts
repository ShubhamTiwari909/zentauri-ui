import { cva } from "class-variance-authority";

import {
  zuiScrollAreaAppearances,
  zuiScrollAreaBase,
  zuiScrollAreaOrientations,
  zuiScrollAreaShadows,
  zuiScrollAreaSizes,
  zuiScrollAreaVisibility,
} from "../../design-system/scroll-area";

export const scrollAreaVariants = cva(zuiScrollAreaBase, {
  variants: {
    appearance: zuiScrollAreaAppearances,
    orientation: zuiScrollAreaOrientations,
    scrollbar: zuiScrollAreaVisibility,
    shadow: zuiScrollAreaShadows,
    size: zuiScrollAreaSizes,
  },
  compoundVariants: [
    {
      scrollbar: "always",
      orientation: "vertical",
      class: "overflow-x-hidden overflow-y-scroll",
    },
    {
      scrollbar: "always",
      orientation: "horizontal",
      class: "overflow-x-scroll overflow-y-hidden",
    },
    {
      scrollbar: "always",
      orientation: "both",
      class: "overflow-scroll",
    },
  ],
  defaultVariants: {
    appearance: "default",
    orientation: "vertical",
    scrollbar: "auto",
    shadow: false,
    size: "md",
  },
});
