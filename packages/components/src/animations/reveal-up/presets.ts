import type { MotionAnimationPreset } from "../shared";

export const revealUpPreset = {
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.99 },
  transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
} satisfies MotionAnimationPreset;
