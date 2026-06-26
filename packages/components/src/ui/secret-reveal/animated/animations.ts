import type { Transition, Variants } from "framer-motion";

export type SecretRevealAnimation =
  | "none"
  | "fade"
  | "slide-up"
  | "scale"
  | "flip";

export type SecretRevealAnimationPresets = Record<
  SecretRevealAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

export const secretRevealAnimationPresets: SecretRevealAnimationPresets = {
  none: {
    transition: { duration: 0 },
    variants: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
    },
  },
  fade: {
    transition: { duration: 0.25, ease: "easeInOut" },
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  "slide-up": {
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
    variants: {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
    },
  },
  scale: {
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
      mass: 0.4,
    },
    variants: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
  },
  flip: {
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
      mass: 0.6,
    },
    variants: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0 },
      exit: { opacity: 0, rotateX: -90 },
    },
  },
};
