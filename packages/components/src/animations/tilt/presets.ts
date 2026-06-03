import type { MotionAnimationPreset } from "../shared";

export const tiltPreset = {
  initial: { rotateX: 0, rotateY: 0, transformPerspective: 900 },
  animate: {
    rotateX: [0, 3, -3, 0],
    rotateY: [0, -5, 5, 0],
    transformPerspective: 900,
  },
  exit: { opacity: 0, rotateX: 0, rotateY: 0, transformPerspective: 900 },
  transition: { duration: 2, ease: "easeInOut", repeat: Infinity },
} satisfies MotionAnimationPreset;
