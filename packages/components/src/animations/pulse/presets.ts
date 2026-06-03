import type { MotionAnimationPreset } from "../shared";

export const pulsePreset = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: [1, 0.78, 1], scale: [1, 1.04, 1] },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 1.4, ease: "easeInOut", repeat: Infinity },
} satisfies MotionAnimationPreset;
