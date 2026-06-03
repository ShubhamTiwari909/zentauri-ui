import type { MotionAnimationPreset } from "../shared";

export const hoverScalePreset = {
  initial: { scale: 1 },
  animate: { scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  whileHover: { scale: 1.06 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 340, damping: 20 },
} satisfies MotionAnimationPreset;
