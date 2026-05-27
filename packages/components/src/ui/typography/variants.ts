import { cva } from "class-variance-authority";

import {
  zuiHeadingBase,
  zuiHeadingLevels,
  zuiOrderedListBase,
  zuiTextSizes,
  zuiTypographyTones,
  zuiUnorderedListBase,
  zuiUnorderedMarkers,
} from "../../design-system/typography";

export const typographyToneVariants = cva("", {
  variants: {
    tone: zuiTypographyTones,
  },
  defaultVariants: {
    tone: "default",
  },
});

export const headingLevelVariants = cva(zuiHeadingBase, {
  variants: {
    level: zuiHeadingLevels,
  },
});

export const textSizeVariants = cva("", {
  variants: {
    size: zuiTextSizes,
  },
  defaultVariants: {
    size: "base",
  },
});

export const unorderedListMarkerVariants = cva(zuiUnorderedListBase, {
  variants: {
    marker: zuiUnorderedMarkers,
  },
  defaultVariants: {
    marker: "disc",
  },
});

export const orderedListVariants = cva(zuiOrderedListBase);
