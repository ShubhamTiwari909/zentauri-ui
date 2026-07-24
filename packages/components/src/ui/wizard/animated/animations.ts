import type { Transition, Variants } from "framer-motion";

export type WizardAnimation = "none" | "slide" | "fade" | "scale" | "flip";

export type WizardAnimationPresets = Record<
  WizardAnimation,
  { transition: Transition; variants: Variants }
>;

const defaultEasing: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const wizardContentAnimationPresets: WizardAnimationPresets = {
  none: {
    transition: { duration: 0 },
    variants: {
      enter: { opacity: 1 },
      exit: { opacity: 1 },
    },
  },
  slide: {
    transition: { duration: 0.3, ease: defaultEasing },
    variants: {
      enter: { x: 0, opacity: 1 },
      exit: { x: 30, opacity: 0 },
    },
  },
  fade: {
    transition: { duration: 0.25, ease: defaultEasing },
    variants: {
      enter: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  scale: {
    transition: { duration: 0.25, ease: defaultEasing },
    variants: {
      enter: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 },
    },
  },
  flip: {
    transition: { duration: 0.35, ease: defaultEasing },
    variants: {
      enter: { rotateX: 0, opacity: 1 },
      exit: { rotateX: -15, opacity: 0 },
    },
  },
};
