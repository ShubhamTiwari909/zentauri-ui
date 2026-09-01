import type { Transition, Variants } from "framer-motion";

/** Radial open/close effects applied to each item disc. */
export type CircularMenuAnimation =
  | "none"
  | "fade"
  | "scale"
  | "pop"
  | "spiral";

export type CircularMenuAnimationPresets = Record<
  CircularMenuAnimation,
  { transition: Transition; variants: Variants }
>;

const defaultEasing: [number, number, number, number] = [0.4, 0, 0.2, 1];

/**
 * Per-item presets keyed by animation name.
 *
 * The ring's fan-out translation stays in CSS (driven by the
 * `--zui-circular-menu-open` token) so static and animated entries place items
 * identically; these presets only own the disc's own reveal.
 */
export const circularMenuItemAnimationPresets: CircularMenuAnimationPresets = {
  none: {
    transition: { duration: 0 },
    variants: {
      closed: { opacity: 1, scale: 1, rotate: 0 },
      open: { opacity: 1, scale: 1, rotate: 0 },
    },
  },
  fade: {
    transition: { duration: 0.2, ease: defaultEasing },
    variants: {
      closed: { opacity: 0, scale: 1, rotate: 0 },
      open: { opacity: 1, scale: 1, rotate: 0 },
    },
  },
  scale: {
    transition: { duration: 0.22, ease: defaultEasing },
    variants: {
      closed: { opacity: 0, scale: 0.6, rotate: 0 },
      open: { opacity: 1, scale: 1, rotate: 0 },
    },
  },
  pop: {
    transition: { type: "spring", stiffness: 420, damping: 24, mass: 0.7 },
    variants: {
      closed: { opacity: 0, scale: 0.3, rotate: 0 },
      open: { opacity: 1, scale: 1, rotate: 0 },
    },
  },
  spiral: {
    transition: { duration: 0.35, ease: defaultEasing },
    variants: {
      closed: { opacity: 0, scale: 0.2, rotate: -180 },
      open: { opacity: 1, scale: 1, rotate: 0 },
    },
  },
};
