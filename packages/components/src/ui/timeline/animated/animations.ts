import type { Transition } from "framer-motion";

/** Entrance presets for animated timeline items (fade + slide, connector draw). */
export type TimelineTransition = "none" | "default" | "smooth" | "slow";

export type TimelineTransitionPresets = Record<TimelineTransition, Transition>;

export const timelineItemTransitionPresets: TimelineTransitionPresets = {
  none: { duration: 0 },
  default: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  smooth: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  slow: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
};

/** Default per-item entrance delay multiplier (seconds) for staggered reveals. */
export const TIMELINE_DEFAULT_STAGGER = 0.08;
