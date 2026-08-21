import { cva } from "class-variance-authority";

import {
  zuiSlideToCompleteIconBase,
  zuiSlideToCompleteLabelBase,
  zuiSlideToCompleteProgressAppearances,
  zuiSlideToCompleteProgressBase,
  zuiSlideToCompleteRootBase,
  zuiSlideToCompleteSizes,
  zuiSlideToCompleteThumbAppearances,
  zuiSlideToCompleteThumbBase,
  zuiSlideToCompleteTrackAppearances,
  zuiSlideToCompleteTrackBase,
} from "../../design-system/slide-to-complete";

export const slideToCompleteVariants = cva(zuiSlideToCompleteRootBase, {
  variants: {
    size: zuiSlideToCompleteSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const slideToCompleteTrackVariants = cva(zuiSlideToCompleteTrackBase, {
  variants: {
    appearance: zuiSlideToCompleteTrackAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const slideToCompleteProgressVariants = cva(
  zuiSlideToCompleteProgressBase,
  {
    variants: {
      appearance: zuiSlideToCompleteProgressAppearances,
    },
    defaultVariants: {
      appearance: "default",
    },
  },
);

export const slideToCompleteLabelVariants = cva(zuiSlideToCompleteLabelBase);

export const slideToCompleteThumbVariants = cva(zuiSlideToCompleteThumbBase, {
  variants: {
    appearance: zuiSlideToCompleteThumbAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const slideToCompleteIconVariants = cva(zuiSlideToCompleteIconBase);
