import { cva } from "class-variance-authority";

import {
  zuiProgressAppearances,
  zuiProgressBarBase,
  zuiProgressBarStriped,
  zuiProgressBase,
  zuiProgressBoolean,
  zuiProgressShapes,
  zuiProgressSizes,
  zuiProgressTrackBase,
  zuiProgressTrackSizes,
} from "../../design-system/progress";

export const progressVariants = cva(zuiProgressBase, {
  variants: {
    appearance: zuiProgressAppearances,
    size: zuiProgressSizes,
    shape: zuiProgressShapes,
    striped: zuiProgressBoolean,
    animated: zuiProgressBoolean,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    shape: "rounded",
    striped: false,
    animated: false,
  },
});

export const progressTrackVariants = cva(zuiProgressTrackBase, {
  variants: {
    size: zuiProgressTrackSizes,
    shape: zuiProgressShapes,
  },
  defaultVariants: {
    size: "md",
    shape: "rounded",
  },
});

export const progressBarVariants = cva(zuiProgressBarBase, {
  variants: {
    striped: zuiProgressBarStriped,
  },
  defaultVariants: { striped: false },
});
