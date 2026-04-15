import type { HTMLMotionProps } from "framer-motion";

import type { SkeletonAnimation } from "./types";

type SkeletonPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "animate" | "transition"
>;

export type SkeletonAnimationPresets = Record<
  SkeletonAnimation,
  SkeletonPresetMotionProps
>;

export const skeletonAnimationPresets: SkeletonAnimationPresets = {
  none: {},
  shimmer: {
    animate: { backgroundPosition: ["100% 0%", "0% 0%"] },
    transition: { repeat: Infinity, duration: 1.35, ease: "linear" },
  },
};
