import type { MotionAnimationPreset } from "../shared";

export const rotateInPreset = {
  initial: { opacity: 0, rotate: -8, scale: 0.96 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 4, scale: 0.98 },
  transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
} satisfies MotionAnimationPreset;
