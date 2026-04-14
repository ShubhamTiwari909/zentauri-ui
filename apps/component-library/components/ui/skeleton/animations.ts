import type { HTMLMotionProps } from "framer-motion";

import type { SkeletonAnimation } from "./types";

type SkeletonPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "animate" | "transition" | "style"
>;

export type SkeletonAnimationPresets = Record<
  SkeletonAnimation,
  SkeletonPresetMotionProps
>;

export const skeletonAnimationPresets: SkeletonAnimationPresets = {
  none: {},
  shimmer: {
    style: {
      backgroundImage:
        "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.22), rgba(255,255,255,0.04))",
      backgroundSize: "220% 100%",
    },
    animate: { backgroundPosition: ["100% 0%", "0% 0%"] },
    transition: { repeat: Infinity, duration: 1.35, ease: "linear" },
  },
};
