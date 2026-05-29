import { HTMLMotionProps } from "framer-motion";
import type { CommandContentProps } from "../types";

export type CommandAnimation =
  | "none"
  | "fade"
  | "scale"
  | "slide-down"
  | "slide-up";

export type CommandContentAnimatedProps = CommandContentProps & {
  animation?: CommandAnimation;
};

export type CommandPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>;

export type CommandAnimationPresets = Record<
  CommandAnimation,
  CommandPresetMotionProps
>;
