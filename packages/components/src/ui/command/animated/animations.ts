import type { CommandAnimationPresets } from "./types";

export const commandOverlayAnimationPresets: CommandAnimationPresets = {
  none: {},
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.18 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 },
    transition: { type: "spring", stiffness: 440, damping: 34 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { type: "spring", stiffness: 420, damping: 32 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
    transition: { type: "spring", stiffness: 420, damping: 32 },
  },
};
