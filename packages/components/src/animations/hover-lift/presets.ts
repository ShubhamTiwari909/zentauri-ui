import type { MotionAnimationPreset } from "../shared";

export const hoverLiftPreset = {
  initial: { y: 0, scale: 1 },
  animate: { y: 0, scale: 1 },
  exit: { opacity: 0, y: 6, scale: 0.98 },
  whileHover: { y: -8, scale: 1.02 },
  whileTap: { y: -2, scale: 0.99 },
  transition: { type: "spring", stiffness: 320, damping: 22 },
} satisfies MotionAnimationPreset;
