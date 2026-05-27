import { cva } from "class-variance-authority";

import {
  zuiSliderRangeAppearances,
  zuiSliderRangeBase,
  zuiSliderRootBase,
  zuiSliderRootSizes,
  zuiSliderThumbBase,
  zuiSliderThumbSizes,
  zuiSliderTrackBase,
  zuiSliderTrackSizes,
} from "../../design-system/slider";

export const sliderRootVariants = cva(zuiSliderRootBase, {
  variants: {
    size: zuiSliderRootSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const sliderTrackVariants = cva(zuiSliderTrackBase, {
  variants: {
    size: zuiSliderTrackSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const sliderRangeVariants = cva(zuiSliderRangeBase, {
  variants: {
    appearance: zuiSliderRangeAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const sliderThumbVariants = cva(zuiSliderThumbBase, {
  variants: {
    size: zuiSliderThumbSizes,
  },
  defaultVariants: {
    size: "md",
  },
});
