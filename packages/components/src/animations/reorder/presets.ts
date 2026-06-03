import type { MotionAnimationPreset } from "../shared";

export const reorderPreset = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  layout: true,
  whileHover: { y: -2 },
  transition: { type: "spring", stiffness: 360, damping: 30 },
} satisfies MotionAnimationPreset;
