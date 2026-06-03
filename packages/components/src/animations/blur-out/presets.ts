import type { MotionAnimationPreset } from "../shared";

export const blurOutPreset = {
  initial: { opacity: 1, filter: "blur(0px)" },
  animate: { opacity: 0, filter: "blur(12px)" },
  exit: { opacity: 0, filter: "blur(12px)" },
  transition: { duration: 0.75, ease: "easeInOut" },
} satisfies MotionAnimationPreset;
