import { HTMLMotionProps } from "framer-motion";
import type { BadgeBaseProps } from "../types";

export type BadgeAnimatedProps = Omit<BadgeBaseProps, "as"> & {
  animation?: BadgeAnimation;
};
export type BadgeAnimation = "none" | "pop" | "bounce" | "fade";


type BadgePresetMotionProps = Pick<
  HTMLMotionProps<"span">,
  "style" | "transition" | "whileHover" | "whileTap" | "animate" | "initial"
>;

export type BadgeAnimationPresets = Record<
  BadgeAnimation,
  BadgePresetMotionProps
>;