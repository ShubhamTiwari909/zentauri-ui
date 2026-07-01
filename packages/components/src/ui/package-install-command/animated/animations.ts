import type { Transition, Variants } from "framer-motion";

export type PackageInstallCommandAnimation = "none" | "fade" | "slide";

export type PackageInstallCommandAnimationPresets = Record<
  PackageInstallCommandAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

export const packageInstallCommandAnimationPresets: PackageInstallCommandAnimationPresets =
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
    slide: {
      transition: { duration: 0.3, ease: "easeOut" },
      variants: {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      },
    },
  };
