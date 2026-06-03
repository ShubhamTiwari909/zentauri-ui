import type { MotionAnimationPreset } from "../shared";

export const flipPreset = {
  initial: { rotateY: 0, transformPerspective: 900 },
  animate: { rotateY: [0, 180, 360], transformPerspective: 900 },
  exit: { opacity: 0, rotateY: 90, transformPerspective: 900 },
  transition: {
    duration: 1.4,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 0.6,
  },
} satisfies MotionAnimationPreset;
