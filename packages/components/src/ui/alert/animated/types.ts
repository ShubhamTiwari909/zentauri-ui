import { HTMLMotionProps } from "framer-motion";
import type { AlertBaseProps, AlertAnimation } from "../types";

export type AlertAnimatedProps = Omit<AlertBaseProps, "as"> & {
  animation?: AlertAnimation;
};

export type AlertPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "transition"
>;

export type AlertAnimationPresets = Record<
  AlertAnimation,
  AlertPresetMotionProps
>;