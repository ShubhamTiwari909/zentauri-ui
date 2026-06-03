import type { MotionAnimationPreset } from "../shared";

export const shakePreset = {
  initial: { x: 0 },
  animate: { x: [0, -8, 8, -6, 6, -3, 3, 0] },
  exit: { opacity: 0, x: 0 },
  transition: {
    duration: 0.6,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 1.2,
  },
} satisfies MotionAnimationPreset;
