import { cva } from "class-variance-authority";

import {
  zuiToggleThumbBase,
  zuiToggleThumbColors,
  zuiToggleThumbSizes,
  zuiToggleTrackAppearances,
  zuiToggleTrackBase,
  zuiToggleTrackSizes,
} from "../../design-system/toggle";

export const toggleTrackVariants = cva(zuiToggleTrackBase, {
  variants: {
    size: zuiToggleTrackSizes,
    appearance: zuiToggleTrackAppearances,
  },
  defaultVariants: {
    size: "md",
    appearance: "default",
  },
});

export const toggleThumbVariants = cva(zuiToggleThumbBase, {
  variants: {
    size: zuiToggleThumbSizes,
    thumbColor: zuiToggleThumbColors,
  },
  defaultVariants: {
    size: "md",
    thumbColor: "default",
  },
});
