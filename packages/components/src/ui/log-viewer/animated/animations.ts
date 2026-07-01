import type { Transition, Variants } from "framer-motion";

export type LogViewerAnimation = "none" | "fade" | "stagger";

export type LogViewerAnimationPresets = Record<
  LogViewerAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

export const logViewerAnimationPresets: LogViewerAnimationPresets = {
  none: {
    transition: { duration: 0 },
    variants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    },
  },
  fade: {
    transition: { duration: 0.25, ease: "easeOut" },
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  stagger: {
    transition: { duration: 0.2, ease: "easeOut" },
    variants: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
      },
    },
  },
};

export const logViewerEntryChildVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
};
