import type { HTMLMotionProps } from "framer-motion";

import type { ProgressAnimation } from "./types";

type ProgressPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "transition" | "animate"
>;

export type ProgressAnimationPresets = Record<
  ProgressAnimation,
  ProgressPresetMotionProps
>;

export const progressAnimationPresets: ProgressAnimationPresets = {
  none: {},
  shimmer: {
    animate: { backgroundPosition: ["0% 0%", "100% 0%"] },
    transition: { repeat: Infinity, duration: 1.2, ease: "linear" },
  },
};
