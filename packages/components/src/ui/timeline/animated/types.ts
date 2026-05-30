import type { TimelineItemProps, TimelineProps } from "../types";
import type { TimelineTransition } from "./animations";

export type TimelineAnimatedProps = TimelineProps;

export type TimelineItemAnimatedProps = TimelineItemProps & {
  /** Entrance easing/duration preset. `none` renders without motion. */
  transitionVariant?: TimelineTransition;
  /** Per-item entrance delay multiplier in seconds (index × stagger). */
  stagger?: number;
};
