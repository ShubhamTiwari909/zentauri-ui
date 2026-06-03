import type { MotionAnimationPreset } from "../shared";

export const popInPreset = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.94 },
  transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
} satisfies MotionAnimationPreset;
