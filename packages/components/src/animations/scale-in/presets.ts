import type { MotionAnimationPreset } from "../shared";

export const scaleInPreset = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.28, ease: "easeOut" },
} satisfies MotionAnimationPreset;
