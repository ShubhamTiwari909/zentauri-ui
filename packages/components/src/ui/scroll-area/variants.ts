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
  defaultVariants: {
    appearance: "default",
    orientation: "vertical",
    scrollbar: "auto",
    shadow: false,
    size: "md",
  },
});
