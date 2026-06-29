import type { Transition, Variants } from "framer-motion";

export type NetworkStatusAnimation = "none" | "pulse" | "ping" | "glow";

export type NetworkStatusAnimationPresets = Record<
  NetworkStatusAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

export const networkStatusAnimationPresets: NetworkStatusAnimationPresets = {
  none: {
    transition: { duration: 0 },
    variants: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 1, opacity: 1 },
    },
  },
  pulse: {
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
    variants: {
      initial: { scale: 1, opacity: 0.7 },
      animate: { scale: 1.25, opacity: 1 },
    },
  },
  ping: {
    transition: {
      duration: 1.4,
      repeat: Infinity,
      ease: "easeOut",
    },
    variants: {
      initial: { scale: 1, opacity: 0.7 },
      animate: { scale: 2.4, opacity: 0 },
    },
  },
  glow: {
    transition: {
      duration: 1.6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
    variants: {
      initial: { boxShadow: "0 0 0px rgba(34,197,94,0)" },
      animate: { boxShadow: "0 0 12px rgba(34,197,94,0.7)" },
    },
  },
};
