import type { PopoverAnimationPresets } from "./types";

export const popoverAnimationPresets: PopoverAnimationPresets = {
  none: {},
  fade: {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.16, ease: "easeOut" },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.16, ease: "easeOut" },
  },
};
