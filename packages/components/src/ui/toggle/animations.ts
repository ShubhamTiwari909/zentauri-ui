import type { HTMLMotionProps } from "framer-motion";

export type ToggleAnimation = "none" | "spring";

type ToggleThumbPreset = Pick<HTMLMotionProps<"span">, "transition" | "layout">;

export type ToggleAnimationPresets = Record<ToggleAnimation, ToggleThumbPreset>;

export const toggleThumbAnimationPresets: ToggleAnimationPresets = {
  none: {},
  spring: {
    layout: true,
    transition: { type: "spring", stiffness: 520, damping: 32 },
  },
};
