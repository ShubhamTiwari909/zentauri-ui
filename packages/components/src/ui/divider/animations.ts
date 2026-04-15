import type { HTMLMotionProps } from "framer-motion";

import type { DividerAnimation } from "./types";

type DividerPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "transition" | "whileHover"
>;

export type DividerAnimationPresets = Record<
  DividerAnimation,
  DividerPresetMotionProps
>;

export const dividerAnimationPresets: DividerAnimationPresets = {
  none: {},
  expand: {
    initial: { scaleX: 0.6, opacity: 0.4 },
    animate: { scaleX: 1, opacity: 1 },
    transition: { duration: 0.35, ease: "easeOut" },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.25 },
  },
};
