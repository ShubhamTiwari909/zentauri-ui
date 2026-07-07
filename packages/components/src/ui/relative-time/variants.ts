import { cva } from "class-variance-authority";

import {
  zuiRelativeTimeAppearances,
  zuiRelativeTimeBase,
  zuiRelativeTimeSizes,
} from "../../design-system/relative-time";

export const relativeTimeVariants = cva(zuiRelativeTimeBase, {
  variants: {
    appearance: zuiRelativeTimeAppearances,
    size: zuiRelativeTimeSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});
