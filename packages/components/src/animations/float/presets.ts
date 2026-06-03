import type { MotionAnimationPreset } from "../shared";

export const floatPreset = {
  initial: { y: 0 },
  animate: { y: [0, -10, 0] },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
} satisfies MotionAnimationPreset;
