import type { MotionAnimationPreset } from "../shared";

export const magneticPreset = {
  initial: { x: 0, y: 0, scale: 1 },
  animate: { x: 0, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  whileHover: { x: 8, y: -6, scale: 1.04 },
  whileTap: { x: 2, y: 0, scale: 0.98 },
  transition: { type: "spring", stiffness: 260, damping: 18 },
} satisfies MotionAnimationPreset;
