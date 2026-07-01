import type { Transition, Variants } from "framer-motion";

export type CodeBlockAnimation = "none" | "fade" | "slide";

export type CodeBlockAnimationPresets = Record<
  CodeBlockAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

export const codeBlockAnimationPresets: CodeBlockAnimationPresets = {
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
  slide: {
    transition: { duration: 0.3, ease: "easeOut" },
    variants: {
      hidden: { opacity: 0, y: 8 },
      visible: { opacity: 1, y: 0 },
    },
  },
};
