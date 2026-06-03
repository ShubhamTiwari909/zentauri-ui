import type { MotionAnimationPreset } from "../shared";

export const spinPreset = {
  initial: { rotate: 0 },
  animate: { rotate: 360 },
  exit: { opacity: 0, rotate: 360 },
  transition: { duration: 2, ease: "linear", repeat: Infinity },
} satisfies MotionAnimationPreset;
