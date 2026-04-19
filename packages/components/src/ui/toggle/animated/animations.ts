import { ToggleAnimationPresets } from "./types";

export const toggleThumbAnimationPresets: ToggleAnimationPresets = {
  none: {},
  spring: {
    layout: true,
    transition: { type: "spring", stiffness: 520, damping: 32 },
  },
};
