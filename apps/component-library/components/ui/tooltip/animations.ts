import type { HTMLMotionProps } from "framer-motion";

export type TooltipAnimation = "none" | "fade" | "scale" | "slide";

type TooltipPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>;

export type TooltipAnimationPresets = Record<TooltipAnimation, TooltipPresetMotionProps>;

export const tooltipAnimationPresets: TooltipAnimationPresets = {
  none: {},
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.12 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 520, damping: 32 },
  },
  slide: {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 4 },
    transition: { duration: 0.16, ease: "easeOut" },
  },
};
