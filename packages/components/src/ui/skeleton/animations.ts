import type { HTMLMotionProps } from "framer-motion";

import type { SkeletonAnimation } from "./types";

type SkeletonPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "transition"
>;

export type SkeletonAnimationPresets = Record<
  SkeletonAnimation,
  SkeletonPresetMotionProps
>;

export const skeletonAnimationPresets: SkeletonAnimationPresets = {
  none: {},
  shimmer: {
    initial: { backgroundPosition: "100% 0%" },
    animate: { backgroundPosition: ["100% 0%", "0% 0%"] },
    transition: { repeat: Infinity, duration: 1.35, ease: "linear" },
  },
  pulse: {
    initial: { opacity: 1 },
    animate: { opacity: [1, 0.5, 1] },
    transition: { repeat: Infinity, duration: 1.35, ease: "easeInOut" },
  },
};
