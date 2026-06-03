import type { MotionAnimationPreset } from "../shared";

export const progressPreset = {
  initial: { opacity: 1, scaleX: 0 },
  animate: { opacity: 1, scaleX: 1 },
  exit: { opacity: 0, scaleX: 0 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
} satisfies MotionAnimationPreset;
