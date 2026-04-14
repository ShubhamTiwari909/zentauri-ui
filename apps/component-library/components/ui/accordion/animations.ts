import type { HTMLMotionProps } from "framer-motion";

export type AccordionAnimation = "none" | "slide" | "fade" | "spring";

type AccordionPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>;

export type AccordionAnimationPresets = Record<
  AccordionAnimation,
  AccordionPresetMotionProps
>;

export const accordionContentMotionPresets: AccordionAnimationPresets = {
  none: {},
  slide: {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.22, ease: "easeInOut" },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.18 },
  },
  spring: {
    initial: { opacity: 0, y: -6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
};
