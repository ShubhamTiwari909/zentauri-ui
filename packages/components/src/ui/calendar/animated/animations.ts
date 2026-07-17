import type { Transition, Variants } from "framer-motion";

export type CalendarAnimation = "none" | "slide" | "fade" | "zoom";

export type CalendarAnimationPresets = Record<
  CalendarAnimation,
  {
    transition: Transition;
    /** `custom` is the navigation direction: 1 forward, -1 backward. */
    variants: Variants;
  }
>;

export const calendarAnimationPresets: CalendarAnimationPresets = {
  none: {
    transition: { duration: 0 },
    variants: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
    },
  },
  slide: {
    transition: { type: "spring", stiffness: 400, damping: 34, mass: 0.8 },
    variants: {
      initial: (direction: number) => ({
        x: direction >= 0 ? 24 : -24,
        opacity: 0,
      }),
      animate: { x: 0, opacity: 1 },
      exit: (direction: number) => ({
        x: direction >= 0 ? -24 : 24,
        opacity: 0,
      }),
    },
  },
  fade: {
    transition: { duration: 0.18, ease: "easeOut" },
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  zoom: {
    transition: { type: "spring", stiffness: 420, damping: 30, mass: 0.7 },
    variants: {
      initial: { scale: 0.96, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.98, opacity: 0 },
    },
  },
};
