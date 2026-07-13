import type { Transition } from "framer-motion";

export type BentoGridTransitionPreset = "default" | "gentle" | "snappy";

export const bentoGridTransitionPresets: Record<
  BentoGridTransitionPreset,
  Transition
> = {
  default: { type: "spring", stiffness: 350, damping: 30 },
  gentle: { type: "spring", stiffness: 200, damping: 28 },
  snappy: { type: "spring", stiffness: 500, damping: 34 },
};

export const bentoGridInstantTransition: Transition = { duration: 0 };
