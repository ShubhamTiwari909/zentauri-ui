import type { TooltipAnimationPresets } from "./types";


export const tooltipAnimationPresets: TooltipAnimationPresets = {
  none: {},
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.15, ease: "easeOut" },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.15, ease: "easeIn" },
  },
};
