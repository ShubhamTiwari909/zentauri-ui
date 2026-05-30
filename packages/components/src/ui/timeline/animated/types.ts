import type { TimelineItemProps, TimelineProps } from "../types";
import type { TimelineTransition } from "./animations";

export type TimelineAnimatedProps = TimelineProps;

/** Motion `li` uses different handler types than some React DOM events. */
export type TimelineItemMotionConflictProps =
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop";

export type TimelineItemAnimatedProps = Omit<
  TimelineItemProps,
  TimelineItemMotionConflictProps
> & {
  /** Entrance easing/duration preset. `none` renders without motion. */
  transitionVariant?: TimelineTransition;
  /** Per-item entrance delay multiplier in seconds (index × stagger). */
  stagger?: number;
};
