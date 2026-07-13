import type { Ref } from "react";

import type { BentoGridBaseProps, BentoGridItemBaseProps } from "../types";
import type { BentoGridTransitionPreset } from "./animations";

export type { BentoGridTransitionPreset };

export type BentoGridAnimatedProps = BentoGridBaseProps & {
  transitionPreset?: BentoGridTransitionPreset;
  ref?: Ref<HTMLDivElement>;
};

/** React's DOM animation/drag handlers clash with framer-motion's motion props. */
type MotionConflictingHandlers =
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd";

export type BentoGridItemAnimatedProps = Omit<
  BentoGridItemBaseProps,
  MotionConflictingHandlers
> & {
  ref?: Ref<HTMLDivElement>;
};
