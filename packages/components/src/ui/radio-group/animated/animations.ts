export const radioGroupAnimationPresets = {
  pop: {
    initial: { scale: 0.35, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 520, damping: 28 },
  },
  fade: {
    initial: { scale: 0.85, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.16, ease: "easeOut" },
  },
} as const;
