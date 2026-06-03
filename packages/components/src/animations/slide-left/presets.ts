import type { MotionAnimationPreset } from "../shared";

export const slideLeftPreset = {
  initial: { x: 24 },
  animate: { x: 0 },
  exit: { x: 12 },
  transition: { duration: 0.34, ease: "easeOut" },
} satisfies MotionAnimationPreset;
