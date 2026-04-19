import { BadgeAnimationPresets } from "./types";

export const badgeAnimationPresets: BadgeAnimationPresets = {
  none: {},
  pop: {
    initial: { scale: 0.92, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 520, damping: 28 },
  },
  bounce: {
    whileHover: { y: -2, scale: 1.04 },
    whileTap: { scale: 0.96 },
    transition: { type: "spring", bounce: 0.45, stiffness: 420, damping: 18 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
};
