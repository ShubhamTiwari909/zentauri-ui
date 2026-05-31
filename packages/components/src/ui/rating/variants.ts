import { cva } from "class-variance-authority";

import {
  zuiRatingAppearances,
  zuiRatingIconBase,
  zuiRatingItemBase,
  zuiRatingSizes,
} from "../../design-system/rating";

export const ratingItemVariants = cva(zuiRatingItemBase, {
  variants: {
    size: zuiRatingSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const ratingIconVariants = cva(zuiRatingIconBase, {
  variants: {
    appearance: zuiRatingAppearances,
  },
  defaultVariants: {
    appearance: "amber",
  },
});
