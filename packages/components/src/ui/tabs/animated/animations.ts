import type { TabsAnimationPresets, TabsOrientation, TabsPresetMotionProps } from "./types";
import type { TabsAnimation } from "./types";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const tabsContentAnimationPresets: TabsAnimationPresets = {
  none: {},
  fade: {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: easeOutExpo },
  },
  slide: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 34,
      mass: 0.82,
    },
  },
};

export function getTabsContentMotionProps(
  animation: TabsAnimation,
  orientation: TabsOrientation,
  reducedMotion: boolean,
): TabsPresetMotionProps {
  if (reducedMotion || animation === "none") {
    return {};
  }
  if (animation === "fade") {
    return tabsContentAnimationPresets.fade;
  }
  if (animation === "slide") {
    const offset = 12;
    return {
      initial:
        orientation === "horizontal"
          ? { opacity: 0, x: offset, y: 0 }
          : { opacity: 0, x: 0, y: offset },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 0.22, ease: easeOutExpo },
    };
  }
  return {};
}
