import type { CSSProperties, Ref } from "react";

import type { CircularMenuListProps, CircularMenuRootProps } from "../types";
import type { CircularMenuAnimation } from "./animations";

export type CircularMenuAnimatedProps = Omit<
  CircularMenuRootProps,
  "stagger"
> & {
  /** Defaults to `"pop"`. Forced to `"none"` under `prefers-reduced-motion`. */
  animation?: CircularMenuAnimation;
  /** Per-item delay in **seconds** (the static entry's `stagger` is in ms). */
  stagger?: number;
  ref?: Ref<HTMLDivElement>;
};

/**
 * Framer Motion redefines the drag and animation event handlers on
 * `motion.div`, so those DOM props are dropped here rather than clashing.
 */
export type CircularMenuListAnimatedProps = Omit<
  CircularMenuListProps,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "style"
> & {
  animation?: CircularMenuAnimation;
  /** Per-item delay in seconds. */
  stagger?: number;
  style?: CSSProperties;
};
