import type { MotionAnimationPreset } from "../shared";

export const wigglePreset = {
  initial: { rotate: 0 },
  animate: { rotate: [0, -4, 4, -3, 3, 0] },
  exit: { opacity: 0, rotate: 0 },
  transition: {
    duration: 0.75,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 1,
  },
} satisfies MotionAnimationPreset;
