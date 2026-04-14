import type { HTMLMotionProps } from "framer-motion";

export type TabsAnimation = "none" | "fade" | "slide";

type TabsPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "transition"
>;

export type TabsAnimationPresets = Record<TabsAnimation, TabsPresetMotionProps>;

export const tabsContentAnimationPresets: TabsAnimationPresets = {
  none: {},
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.18, ease: "easeOut" },
  },
  slide: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 380, damping: 30 },
  },
};
