import type { Transition, Variants } from "framer-motion";

export type QrCodeAnimation =
  | "none"
  | "fade-in"
  | "zoom-in"
  | "slide-up"
  | "rotate-in";

export type QrCodeAnimationPresets = Record<
  QrCodeAnimation,
  { transition: Transition; variants: Variants }
>;

export const qrCodeAnimationPresets: QrCodeAnimationPresets = {
  none: {
    transition: { duration: 0 },
    variants: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
    },
  },
  "fade-in": {
    transition: { duration: 0.3, ease: "easeOut" },
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  },
  "zoom-in": {
    transition: { type: "spring", stiffness: 300, damping: 24 },
    variants: {
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
    },
  },
  "slide-up": {
    transition: { type: "spring", stiffness: 280, damping: 22 },
    variants: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  },
  "rotate-in": {
    transition: { type: "spring", stiffness: 200, damping: 18 },
    variants: {
      initial: { opacity: 0, rotate: -90, scale: 0.8 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
    },
  },
};
