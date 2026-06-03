import type { MotionAnimationPreset } from "../shared";

export const textRevealPreset = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: 8, filter: "blur(4px)" },
  transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
} satisfies MotionAnimationPreset;
