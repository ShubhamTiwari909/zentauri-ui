"use client";

export {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineTitle,
} from "../timeline-base";
export { TimelineItem } from "./timeline-item-animated";
export type {
  TimelineAnimatedProps,
  TimelineItemAnimatedProps,
} from "./types";
export {
  TIMELINE_DEFAULT_STAGGER,
  timelineItemTransitionPresets,
} from "./animations";
export type {
  TimelineTransition,
  TimelineTransitionPresets,
} from "./animations";
