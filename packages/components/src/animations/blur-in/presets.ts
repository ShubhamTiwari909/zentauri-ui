import type { MotionAnimationPreset } from "../shared";

export const blurInPreset = {
  initial: { opacity: 0, filter: "blur(12px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(8px)" },
  transition: { duration: 0.34, ease: "easeOut" },
} satisfies MotionAnimationPreset;
