import type { Transition } from "framer-motion";

/** Easing and duration presets for accordion panel open/close (opacity only). */
export type AccordionTransition = "none" | "default" | "smooth" | "slow";

export type AccordionTransitionPresets = Record<
  AccordionTransition,
  Transition
>;

export const accordionContentTransitionPresets: AccordionTransitionPresets = {
  none: { duration: 0 },
  default: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  smooth: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  slow: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
};
