import type { MotionAnimationPreset } from "../shared";

export const fadeOutPreset = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  exit: { opacity: 0 },
  transition: { duration: 1, ease: "easeIn" },
} satisfies MotionAnimationPreset;
