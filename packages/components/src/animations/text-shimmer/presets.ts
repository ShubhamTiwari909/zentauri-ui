import type { MotionAnimationPreset } from "../shared";

export const textShimmerPreset = {
  initial: { opacity: 0, backgroundPosition: "200% 0" },
  animate: { opacity: 1, backgroundPosition: "-200% 0" },
  exit: { opacity: 0, backgroundPosition: "-200% 0" },
  transition: { duration: 1.2, ease: "easeInOut" },
} satisfies MotionAnimationPreset;
