import type { Transition, Variants } from "framer-motion";

export type ApiResponseViewerAnimation = "none" | "fade" | "slide";

export type ApiResponseViewerAnimationPresets = Record<
  ApiResponseViewerAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

/** Presets for the panel content transition when switching between Body and Headers. */
export const apiResponseViewerAnimationPresets: ApiResponseViewerAnimationPresets =
  {
    none: {
      transition: { duration: 0 },
      variants: {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
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
    slide: {
      transition: { duration: 0.22, ease: "easeOut" },
      variants: {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      },
    },
  };
