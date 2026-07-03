import { cva } from "class-variance-authority";

import {
  zuiCardAppearances,
  zuiCardBgAppearances,
  zuiCardBase,
  zuiCardDescriptionBase,
  zuiCardDescriptionSizes,
  zuiCardFooterBase,
  zuiCardFooterSizes,
  zuiCardHeaderBase,
  zuiCardHeaderSizes,
  zuiCardRounded,
  zuiCardSizes,
  zuiCardTitleBase,
  zuiCardTitleSizes,
} from "../../design-system/card";

export const cardVariants = cva(zuiCardBase, {
  variants: {
    appearance: zuiCardAppearances,
    bg: zuiCardBgAppearances,
    size: zuiCardSizes,
    rounded: zuiCardRounded,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    rounded: "md",
  },
});

export const cardHeaderVariants = cva(zuiCardHeaderBase, {
  variants: {
    size: zuiCardHeaderSizes,
  },
  defaultVariants: { size: "md" },
});

export const cardFooterVariants = cva(zuiCardFooterBase, {
  variants: {
    size: zuiCardFooterSizes,
  },
  defaultVariants: { size: "md" },
});

export const cardTitleVariants = cva(zuiCardTitleBase, {
  variants: {
    size: zuiCardTitleSizes,
  },
  defaultVariants: { size: "md" },
});

export const cardDescriptionVariants = cva(zuiCardDescriptionBase, {
  variants: {
    size: zuiCardDescriptionSizes,
  },
  defaultVariants: { size: "md" },
});
