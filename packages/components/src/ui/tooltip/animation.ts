import type { HTMLMotionProps } from "framer-motion";
import { TooltipAnimation } from "./types";

type TooltipPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "style" | "transition"
>;

export type TooltipAnimationPresets = Record<TooltipAnimation, TooltipPresetMotionProps>;

/** Runs when TooltipContent mounts after open (e.g. trigger hover + delay), not viewport scroll. */
export const tooltipAnimationPresets: TooltipAnimationPresets = {
  none: {},
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.15, ease: "easeOut" },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.15, ease: "easeIn" },
  },
};
