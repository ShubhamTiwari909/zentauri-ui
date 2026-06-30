import type { Transition, Variants } from "framer-motion";

export type RequestTimelineViewerAnimation = "none" | "grow" | "fade";

export type RequestTimelineViewerAnimationPresets = Record<
  RequestTimelineViewerAnimation,
  {
    transition: Transition;
    /** Per-bar variants (used by `grow`, keyed off the bar element). */
    bar: Variants;
    /** Per-row variants (used by `fade`, keyed off each row). */
    row: Variants;
    /** Stagger applied between successive rows. */
    stagger: number;
  }
>;

/** Presets for the enter motion of the timeline's bars and rows. */
export const requestTimelineViewerAnimationPresets: RequestTimelineViewerAnimationPresets =
  {
    none: {
      transition: { duration: 0 },
      bar: {
        hidden: { scaleX: 1 },
        visible: { scaleX: 1 },
      },
      row: {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      },
      stagger: 0,
    },
    grow: {
      transition: { duration: 0.4, ease: "easeOut" },
      bar: {
        hidden: { scaleX: 0 },
        visible: { scaleX: 1 },
      },
      row: {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      },
      stagger: 0.06,
    },
    fade: {
      transition: { duration: 0.25, ease: "easeOut" },
      bar: {
        hidden: { scaleX: 1 },
        visible: { scaleX: 1 },
      },
      row: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
      stagger: 0.06,
    },
  };
