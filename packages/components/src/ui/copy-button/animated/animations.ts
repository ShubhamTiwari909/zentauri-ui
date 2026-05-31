import type { CopyButtonAnimationPresets } from "./types";

export const copyButtonAnimationPresets: CopyButtonAnimationPresets = {
  swap: {
    initial: { opacity: 0, scale: 0.6, rotate: -45 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.6, rotate: 45 },
    transition: { type: "spring", stiffness: 520, damping: 24 },
  },
  pop: {
    initial: { opacity: 0, scale: 0.4, rotate: 0 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.4, rotate: 0 },
    transition: { type: "spring", stiffness: 600, damping: 20 },
  },
  fade: {
    initial: { opacity: 0, scale: 1, rotate: 0 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 1, rotate: 0 },
    transition: { duration: 0.16 },
  },
};
