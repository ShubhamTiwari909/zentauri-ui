import type { HTMLMotionProps } from "framer-motion";

import type { AlertAnimation } from "./types";

type AlertPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "transition"
>;

export type AlertAnimationPresets = Record<AlertAnimation, AlertPresetMotionProps>;

export const alertAnimationPresets: AlertAnimationPresets = {
  none: {},
  "slide-down": {
    initial: { y: -8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 420, damping: 30 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
  pop: {
    initial: { scale: 0.96, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 520, damping: 28 },
  },
};
