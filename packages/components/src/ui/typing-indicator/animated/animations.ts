import type { Transition, Variants } from "framer-motion";

export type TypingIndicatorAnimation = "none" | "bounce" | "pulse" | "wave";

export type TypingIndicatorAnimationPresets = Record<
  TypingIndicatorAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

export const typingIndicatorAnimationPresets: TypingIndicatorAnimationPresets =
  {
    none: {
      transition: { duration: 0 },
      variants: {
        initial: { y: 0 },
        animate: { y: 0 },
      },
    },
    bounce: {
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
        mass: 0.5,
      },
      variants: {
        initial: { y: 0 },
        animate: { y: -6 },
      },
    },
    pulse: {
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
      variants: {
        initial: { scale: 1, opacity: 0.4 },
        animate: { scale: 1.3, opacity: 1 },
      },
    },
    wave: {
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 8,
        mass: 0.4,
      },
      variants: {
        initial: { y: 0, scale: 1 },
        animate: { y: -8, scale: 0.9 },
      },
    },
  };
