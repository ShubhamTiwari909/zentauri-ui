import type { Transition, Variants } from "framer-motion";

export type ApiEndpointCardAnimation = "none" | "fade" | "grow";

export type ApiEndpointCardAnimationPresets = Record<
  ApiEndpointCardAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

export const apiEndpointCardAnimationPresets: ApiEndpointCardAnimationPresets =
  {
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
    grow: {
      transition: { duration: 0.3, ease: "easeOut" },
      variants: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
      },
    },
  };
