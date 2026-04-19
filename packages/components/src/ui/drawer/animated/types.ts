import { HTMLMotionProps } from "framer-motion";
import type { DrawerContentProps } from "../types";

export type DrawerContentAnimatedProps = DrawerContentProps & {
  animation?: DrawerAnimation;
};

export type DrawerAnimation = "none" | "fade" | "scale" | "slide";

export type DrawerPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>;

export type DrawerAnimationPresets = Record<
  DrawerAnimation,
  DrawerPresetMotionProps
>;
