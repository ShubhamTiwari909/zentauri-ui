import type { MotionAnimationPreset } from "../shared";

export const fadeLeftPreset = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 8 },
  transition: { duration: 0.32, ease: "easeOut" },
} satisfies MotionAnimationPreset;
