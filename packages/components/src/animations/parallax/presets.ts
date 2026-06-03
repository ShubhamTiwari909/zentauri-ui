import type { MotionAnimationPreset } from "../shared";

export const parallaxPreset = {
  initial: { opacity: 1, y: 18 },
  animate: { opacity: 1, y: [18, -18, 18] },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
} satisfies MotionAnimationPreset;
