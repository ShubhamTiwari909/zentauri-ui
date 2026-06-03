import type { MotionAnimationPreset } from "../shared";

export const slideDownPreset = {
  initial: { y: -24 },
  animate: { y: 0 },
  exit: { y: -12 },
  transition: { duration: 0.34, ease: "easeOut" },
} satisfies MotionAnimationPreset;
