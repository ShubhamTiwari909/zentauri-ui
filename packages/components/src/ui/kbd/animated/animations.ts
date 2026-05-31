import type { KbdAnimationPresets } from "./types";

export const kbdAnimationPresets: KbdAnimationPresets = {
  none: {},
  press: {
    whileHover: { y: -1 },
    whileTap: { y: 1, scale: 0.96 },
    transition: { type: "spring", stiffness: 600, damping: 22 },
  },
  pop: {
    initial: { scale: 0.85, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 520, damping: 26 },
  },
};
