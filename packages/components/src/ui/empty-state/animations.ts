import type { HTMLMotionProps } from "framer-motion";

import type { EmptyStateAnimation } from "./types";

type EmptyStatePresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "transition" | "whileHover"
>;

export type EmptyStateAnimationPresets = Record<
  EmptyStateAnimation,
  EmptyStatePresetMotionProps
>;

export const emptyStateAnimationPresets: EmptyStateAnimationPresets = {
  none: {},
  float: {
    whileHover: { y: -4 },
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  fade: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  "slide-up": {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
};
