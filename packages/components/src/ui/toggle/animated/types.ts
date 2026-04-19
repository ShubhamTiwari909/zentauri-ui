import type { HTMLMotionProps } from "framer-motion";
import type { ToggleProps } from "../types";

export type ToggleAnimation = "none" | "spring";

export type ToggleThumbPreset = Pick<HTMLMotionProps<"span">, "transition" | "layout">;

export type ToggleAnimationPresets = Record<ToggleAnimation, ToggleThumbPreset>;


export type ToggleAnimatedProps = ToggleProps & {
  animation?: ToggleAnimation;
};
