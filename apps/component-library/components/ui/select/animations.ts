import type { HTMLMotionProps } from "framer-motion";

export type SelectAnimation = "none" | "scale" | "fade" | "slide";

type SelectPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>;

export type SelectAnimationPresets = Record<SelectAnimation, SelectPresetMotionProps>;

export const selectContentAnimationPresets: SelectAnimationPresets = {
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
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 4 },
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
};
