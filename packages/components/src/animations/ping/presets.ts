import type { MotionAnimationPreset } from "../shared";

export const pingPreset = {
  initial: { opacity: 0.7, scale: 1 },
  animate: { opacity: [0.7, 0.28, 0.7], scale: [1, 1.28, 1] },
  exit: { opacity: 0, scale: 1.08 },
  transition: {
    duration: 1.45,
    ease: "easeOut",
    repeat: Infinity,
    repeatDelay: 0.35,
  },
} satisfies MotionAnimationPreset;
