import type { Variants } from "framer-motion";

export type WorldClockAnimation = "fade" | "slide-up" | "flip";

export const worldClockAnimationVariants: Record<
  WorldClockAnimation,
  Variants
> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  },
  flip: {
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: 90 },
  },
};

export const worldClockTransition = {
  duration: 0.3,
  ease: "easeInOut" as const,
};
