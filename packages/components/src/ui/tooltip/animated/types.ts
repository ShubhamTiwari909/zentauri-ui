import { HTMLMotionProps } from "framer-motion";
import type { TooltipContentProps } from "../types";

export type TooltipAnimation = "none" | "fade" | "scale";

export type TooltipPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "style" | "transition"
>;

export type TooltipAnimationPresets = Record<
  TooltipAnimation,
  TooltipPresetMotionProps
>;


export type TooltipContentAnimatedProps = TooltipContentProps & {
  animation?: TooltipAnimation;
};
