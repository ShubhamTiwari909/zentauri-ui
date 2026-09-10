import { cva } from "class-variance-authority";

import {
  zuiCarouselAppearances,
  zuiCarouselControlBase,
  zuiCarouselControlPositions,
  zuiCarouselControlsBase,
  zuiCarouselCounterBase,
  zuiCarouselDotBase,
  zuiCarouselDotSizes,
  zuiCarouselDotsBase,
  zuiCarouselDotsOrientations,
  zuiCarouselDragModes,
  zuiCarouselFrames,
  zuiCarouselItemBase,
  zuiCarouselProgressBarBase,
  zuiCarouselProgressBase,
  zuiCarouselRootBase,
  zuiCarouselSizes,
  zuiCarouselTrackBase,
  zuiCarouselTrackOrientations,
  zuiCarouselViewportBase,
  zuiCarouselViewportOrientations,
} from "../../design-system/carousel";

export const carouselVariants = cva(zuiCarouselRootBase, {
  variants: {
    appearance: zuiCarouselAppearances,
    size: zuiCarouselSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const carouselViewportVariants = cva(zuiCarouselViewportBase, {
  variants: {
    frame: zuiCarouselFrames,
    orientation: zuiCarouselViewportOrientations,
    drag: zuiCarouselDragModes,
  },
  defaultVariants: {
    frame: "none",
    orientation: "horizontal",
    drag: "none",
  },
});

export const carouselTrackVariants = cva(zuiCarouselTrackBase, {
  variants: {
    orientation: zuiCarouselTrackOrientations,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const carouselItemVariants = cva(zuiCarouselItemBase);

export const carouselControlsVariants = cva(zuiCarouselControlsBase);

export const carouselControlVariants = cva(zuiCarouselControlBase, {
  variants: {
    position: zuiCarouselControlPositions,
  },
  defaultVariants: {
    position: "outside",
  },
});

export const carouselDotsVariants = cva(zuiCarouselDotsBase, {
  variants: {
    orientation: zuiCarouselDotsOrientations,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const carouselDotVariants = cva(zuiCarouselDotBase, {
  variants: {
    size: zuiCarouselDotSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const carouselCounterVariants = cva(zuiCarouselCounterBase);

export const carouselProgressVariants = cva(zuiCarouselProgressBase);

export const carouselProgressBarVariants = cva(zuiCarouselProgressBarBase);
