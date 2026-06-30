import type { Transition, Variants } from "framer-motion";

export type HttpRequestViewerAnimation = "none" | "fade" | "slide";

export type HttpRequestViewerAnimationPresets = Record<
  HttpRequestViewerAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

/** Presets for the panel-switch motion when changing the active tab. */
export const httpRequestViewerAnimationPresets: HttpRequestViewerAnimationPresets =
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
      transition: { duration: 0.2, ease: "easeOut" },
      variants: {
        initial: { opacity: 0, x: 8 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -8 },
      },
    },
  };
