import { ProgressAnimationPresets } from "./types";

export const progressAnimationPresets: ProgressAnimationPresets = {
  none: {},
  shimmer: {
    animate: { backgroundPosition: ["0% 0%", "100% 0%"] },
    transition: { repeat: Infinity, duration: 1.2, ease: "linear" },
  },
};
