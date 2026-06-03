import type { MotionAnimationPreset } from "../shared";

export const revealRightPreset = {
  initial: { opacity: 0, x: -18, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -8, scale: 0.99 },
  transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
} satisfies MotionAnimationPreset;
