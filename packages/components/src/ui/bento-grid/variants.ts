import { cva } from "class-variance-authority";

import {
  zuiBentoGridAppearances,
  zuiBentoGridBase,
  zuiBentoGridExpandedSpans,
  zuiBentoGridFlows,
  zuiBentoGridGaps,
  zuiBentoGridItemBase,
  zuiBentoGridSpans,
} from "../../design-system/bento-grid";

export {
  zuiBentoGridSpans as bentoGridSpanClasses,
  zuiBentoGridExpandedSpans as bentoGridExpandedSpanClasses,
};

export const bentoGridVariants = cva(zuiBentoGridBase, {
  variants: {
    gap: zuiBentoGridGaps,
    autoFlow: zuiBentoGridFlows,
  },
  defaultVariants: {
    gap: "md",
    autoFlow: "dense",
  },
});

export const bentoGridItemVariants = cva(zuiBentoGridItemBase, {
  variants: {
    span: zuiBentoGridSpans,
    appearance: zuiBentoGridAppearances,
  },
  defaultVariants: {
    span: "1x1",
    appearance: "default",
  },
});
