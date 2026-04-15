import type { InputAnimationPresets } from "./types";

export const inputAnimationPresets: InputAnimationPresets = {
  none: {},
  lift: {
    whileHover: { y: -1 },
    whileFocus: { y: -1 },
    transition: { type: "spring", stiffness: 480, damping: 32 },
  },
  press: {
    whileTap: { scale: 0.99 },
    transition: { type: "spring", stiffness: 520, damping: 30 },
  },
  glow: {
    whileFocus: {
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.2), 0 12px 28px rgba(15,23,42,0.35)",
    },
    whileHover: {
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.12), 0 8px 20px rgba(15,23,42,0.25)",
    },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tilt: {
    whileHover: { scale: 1.005 },
    whileFocus: { scale: 1.008 },
    whileTap: { scale: 0.995 },
    transition: { type: "spring", stiffness: 380, damping: 24 },
  },
  bounce: {
    whileFocus: { y: -2, scale: 1.01 },
    whileHover: { y: -1, scale: 1.005 },
    transition: { type: "spring", bounce: 0.35, duration: 0.4 },
  },
};
