import type { Variants } from "framer-motion";

export type RelativeTimeAnimation = "fade" | "slide-up" | "blur";

export const relativeTimeAnimationVariants: Record<
  RelativeTimeAnimation,
  Variants
> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
};

export const relativeTimeTransition = {
  duration: 0.2,
  ease: "easeInOut" as const,
};
