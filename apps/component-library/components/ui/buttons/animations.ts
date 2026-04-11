import type { AnimationPresets } from "./types";

export const animationPresets: AnimationPresets = {
  none: {},
  lift: {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
  press: {
    whileTap: { scale: 0.96 },
    transition: { type: "spring", stiffness: 520, damping: 30 },
  },
  glow: {
    whileHover: {
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.25), 0 18px 42px rgba(15,23,42,0.35)",
      scale: 1.01,
    },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tilt: {
    whileHover: { rotateX: 6, rotateY: -6, scale: 1.01 },
    whileTap: { scale: 0.98, rotateX: 0, rotateY: 0 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
    style: { transformStyle: "preserve-3d" },
  },
  bounce: {
    whileHover: { y: -4, scale: 1.03 },
    whileTap: { y: 0, scale: 0.97 },
    transition: { type: "spring", bounce: 0.45, duration: 0.45 },
  },
};
