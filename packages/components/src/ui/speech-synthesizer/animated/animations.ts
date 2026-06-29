import type { Transition, Variants } from "framer-motion";

export type SpeechSynthesizerAnimation = "none" | "pulse" | "wave" | "glow";

export type SpeechSynthesizerAnimationPresets = Record<
  SpeechSynthesizerAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

export const speechSynthesizerAnimationPresets: SpeechSynthesizerAnimationPresets =
  {
    none: {
      transition: { duration: 0 },
      variants: {
        initial: { scale: 1 },
        animate: { scale: 1 },
      },
    },
    pulse: {
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
      variants: {
        initial: { scale: 1, opacity: 0.7 },
        animate: { scale: 1.15, opacity: 1 },
      },
    },
    wave: {
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
      variants: {
        initial: { scale: 1, rotate: 0 },
        animate: { scale: 1.1, rotate: -5 },
      },
    },
    glow: {
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
      variants: {
        initial: {
          boxShadow: "0 0 0px rgba(59,130,246,0)",
        },
        animate: {
          boxShadow: "0 0 20px rgba(59,130,246,0.5)",
        },
      },
    },
  };
