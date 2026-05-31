import { cva } from "class-variance-authority";

import {
  zuiMarqueeAppearances,
  zuiMarqueeBase,
  zuiMarqueeFade,
  zuiMarqueeOrientations,
  zuiMarqueeSizes,
} from "../../design-system/marquee";

export const marqueeVariants = cva(zuiMarqueeBase, {
  variants: {
    appearance: zuiMarqueeAppearances,
    fade: zuiMarqueeFade,
    orientation: zuiMarqueeOrientations,
    size: zuiMarqueeSizes,
  },
  defaultVariants: {
    appearance: "default",
    fade: true,
    orientation: "horizontal",
    size: "md",
  },
});
