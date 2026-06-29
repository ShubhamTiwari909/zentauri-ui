import type { Transition, Variants } from "framer-motion";

export type JsonViewerAnimation = "none" | "collapse" | "fade";

export type JsonViewerAnimationPresets = Record<
  JsonViewerAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

/** Presets for the expand/collapse motion of a container's children region. */
export const jsonViewerAnimationPresets: JsonViewerAnimationPresets = {
  none: {
    transition: { duration: 0 },
    variants: {
      collapsed: { height: "auto", opacity: 1 },
      open: { height: "auto", opacity: 1 },
    },
  },
  collapse: {
    transition: { duration: 0.2, ease: "easeOut" },
    variants: {
      collapsed: { height: 0, opacity: 0 },
      open: { height: "auto", opacity: 1 },
    },
  },
  fade: {
    transition: { duration: 0.18, ease: "easeOut" },
    variants: {
      collapsed: { opacity: 0 },
      open: { opacity: 1 },
    },
  },
};
