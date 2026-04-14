import type { HTMLMotionProps } from "framer-motion";

export type PopoverAnimation = "none" | "scale" | "fade" | "slide";

type PopoverPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>;

export type PopoverAnimationPresets = Record<PopoverAnimation, PopoverPresetMotionProps>;

export const popoverAnimationPresets: PopoverAnimationPresets = {
  none: {},
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: { type: "spring", stiffness: 420, damping: 30 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 },
  },
  slide: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 6 },
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
};
