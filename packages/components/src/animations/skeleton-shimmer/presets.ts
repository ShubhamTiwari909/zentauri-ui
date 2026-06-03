import type { MotionAnimationPreset } from "../shared";

export const skeletonShimmerPreset = {
  initial: { opacity: 1, backgroundPosition: "200% 0" },
  animate: { opacity: 1, backgroundPosition: "-200% 0" },
  exit: { opacity: 0 },
  transition: { duration: 1.35, ease: "linear", repeat: Infinity },
} satisfies MotionAnimationPreset;
