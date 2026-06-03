import type { MotionAnimationPreset } from "../shared";

export const revealBlurPreset = {
  initial: { opacity: 0, y: 12, filter: "blur(16px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: 6, filter: "blur(10px)" },
  transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
} satisfies MotionAnimationPreset;
