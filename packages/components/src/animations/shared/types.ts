import type {
  HTMLMotionProps,
  TargetAndTransition,
  Transition,
} from "framer-motion";

export type MotionAnimationPreset = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit?: TargetAndTransition;
  layout?: HTMLMotionProps<"div">["layout"];
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
  transition: Transition;
};

export type MotionAnimationTargetOverrides = {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  blur?: number | string;
};

export type MotionAnimationWhileInView =
  | true
  | HTMLMotionProps<"div">["whileInView"];

export type MotionAnimationProps = Omit<
  HTMLMotionProps<"div">,
  "whileInView"
> & {
  from?: MotionAnimationTargetOverrides;
  to?: MotionAnimationTargetOverrides;
  exitTo?: MotionAnimationTargetOverrides;
  whileInView?: MotionAnimationWhileInView;
};
