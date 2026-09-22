import { cva } from "class-variance-authority";

import {
  zuiImageCompareAppearances,
  zuiImageCompareBase,
  zuiImageCompareDividerBase,
  zuiImageCompareHandleBase,
  zuiImageCompareLabelBase,
  zuiImageCompareLayerBase,
  zuiImageCompareRadii,
  zuiImageCompareSizes,
} from "../../design-system/image-compare";

export const imageCompareVariants = cva(zuiImageCompareBase, {
  variants: {
    appearance: zuiImageCompareAppearances,
    size: zuiImageCompareSizes,
    radius: zuiImageCompareRadii,
    disabled: {
      true: "cursor-not-allowed opacity-60",
      false: "cursor-ew-resize",
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    radius: "md",
    disabled: false,
  },
});

export const imageCompareLayerVariants = cva(zuiImageCompareLayerBase, {
  variants: { side: { before: "z-10", after: "z-0" } },
});

export const imageCompareDividerVariants = cva(zuiImageCompareDividerBase);
export const imageCompareHandleVariants = cva(zuiImageCompareHandleBase);
export const imageCompareLabelVariants = cva(zuiImageCompareLabelBase, {
  variants: { side: { before: "left-3", after: "right-3" } },
});
