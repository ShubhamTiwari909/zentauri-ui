import { DrawerAnimationPresets } from "./types";

export const drawerPanelPresets = (
  side: "left" | "right" | "top" | "bottom",
): DrawerAnimationPresets => ({
  none: {},
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { type: "spring", stiffness: 420, damping: 32 },
  },
  slide: {
    initial:
      side === "left"
        ? { x: -24, opacity: 0 }
        : side === "right"
          ? { x: 24, opacity: 0 }
          : side === "top"
            ? { y: -24, opacity: 0 }
            : { y: 24, opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit:
      side === "left"
        ? { x: -16, opacity: 0 }
        : side === "right"
          ? { x: 16, opacity: 0 }
          : side === "top"
            ? { y: -16, opacity: 0 }
            : { y: 16, opacity: 0 },
    transition: { type: "spring", stiffness: 380, damping: 30 },
  },
});
