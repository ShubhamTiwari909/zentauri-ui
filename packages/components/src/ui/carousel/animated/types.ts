import type { CSSProperties, Ref } from "react";

import type {
  CarouselContentProps,
  CarouselItemProps,
  CarouselProps,
} from "../types";
import type { CarouselAnimation, CarouselReveal } from "./animations";

/**
 * Framer Motion redefines the drag and animation event handlers on
 * `motion.div`, so those DOM props are dropped here rather than clashing.
 */
type MotionUnsafeProps =
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
  | "style";

export type CarouselContentAnimatedProps = Omit<
  CarouselContentProps,
  MotionUnsafeProps
> & {
  /** Track settle physics. Defaults to `"glide"`. */
  animation?: CarouselAnimation;
  style?: CSSProperties;
};

export type CarouselItemAnimatedProps = Omit<
  CarouselItemProps,
  MotionUnsafeProps
> & {
  /** How this slide looks while it sits outside the active window. */
  reveal?: CarouselReveal;
  style?: CSSProperties;
};

export type CarouselAnimatedProps = CarouselProps & {
  /** Track settle physics. Defaults to `"glide"`. Ignored under `prefers-reduced-motion`. */
  animation?: CarouselAnimation;
  /** How inactive slides are de-emphasised. Defaults to `"none"`. */
  reveal?: CarouselReveal;
  ref?: Ref<HTMLDivElement>;
};
