import type { MotionAnimationPreset } from "../shared";

export const fadeInPreset = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.28, ease: "easeOut" },
} satisfies MotionAnimationPreset;
