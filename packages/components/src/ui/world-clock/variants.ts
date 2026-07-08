import { cva } from "class-variance-authority";

import {
  zuiWorldClockAppearances,
  zuiWorldClockBase,
  zuiWorldClockLayouts,
  zuiWorldClockCardBase,
  zuiWorldClockCardSizes,
  zuiWorldClockLabelBase,
  zuiWorldClockTimeBase,
  zuiWorldClockDateBase,
  zuiWorldClockOffsetBase,
  zuiWorldClockDaynightBase,
} from "../../design-system/world-clock";

export const worldClockVariants = cva(zuiWorldClockBase, {
  variants: {
    layout: zuiWorldClockLayouts,
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const worldClockCardVariants = cva(zuiWorldClockCardBase, {
  variants: {
    appearance: zuiWorldClockAppearances,
    size: zuiWorldClockCardSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const worldClockLabelVariants = cva(zuiWorldClockLabelBase);

export const worldClockTimeVariants = cva(zuiWorldClockTimeBase);

export const worldClockDateVariants = cva(zuiWorldClockDateBase);

export const worldClockOffsetVariants = cva(zuiWorldClockOffsetBase);

export const worldClockDaynightVariants = cva(zuiWorldClockDaynightBase);
