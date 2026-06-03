import type { MotionAnimationPreset } from "../shared";

export const fadeUpPreset = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.32, ease: "easeOut" },
} satisfies MotionAnimationPreset;
