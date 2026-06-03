import type { MotionAnimationPreset } from "../shared";

export const pressPreset = {
  initial: { y: 0, scale: 1 },
  animate: { y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  whileTap: { y: 1, scale: 0.96 },
  transition: { type: "spring", stiffness: 420, damping: 24 },
} satisfies MotionAnimationPreset;
