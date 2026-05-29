import type { HTMLMotionProps } from "framer-motion";
import type { PopoverContentProps } from "../types";

export type PopoverAnimation = "none" | "fade" | "scale";

export type PopoverPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "style" | "transition"
>;

export type PopoverAnimationPresets = Record<
  PopoverAnimation,
  PopoverPresetMotionProps
>;

export type PopoverContentAnimatedProps = PopoverContentProps & {
  animation?: PopoverAnimation;
};
