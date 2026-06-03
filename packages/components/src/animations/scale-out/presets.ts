import type { MotionAnimationPreset } from "../shared";

export const scaleOutPreset = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 0, scale: 0.96 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.65, ease: "easeInOut" },
} satisfies MotionAnimationPreset;
