import type { MotionAnimationPreset } from "../shared";

export const bouncePreset = {
  initial: { y: 0 },
  animate: { y: [0, -14, 0, -7, 0] },
  exit: { opacity: 0, y: 8 },
  transition: {
    duration: 0.85,
    ease: "easeOut",
    repeat: Infinity,
    repeatDelay: 0.8,
  },
} satisfies MotionAnimationPreset;
