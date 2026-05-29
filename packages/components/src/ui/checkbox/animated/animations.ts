export const checkboxAnimationPresets = {
  draw: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  spring: {
    initial: { scale: 0.7, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 520, damping: 30 },
  },
} as const;
