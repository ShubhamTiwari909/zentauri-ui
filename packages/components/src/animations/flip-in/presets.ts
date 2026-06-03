import type { MotionAnimationPreset } from "../shared";

export const flipInPreset = {
  initial: { opacity: 0, rotateY: -90, transformPerspective: 900 },
  animate: { opacity: 1, rotateY: 0, transformPerspective: 900 },
  exit: { opacity: 0, rotateY: 70, transformPerspective: 900 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
} satisfies MotionAnimationPreset;
