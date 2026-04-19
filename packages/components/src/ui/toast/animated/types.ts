import { HTMLMotionProps } from "framer-motion";

export type ToastAnimation = "none" | "slide" | "fade";

export type ToastPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>;

export type ToastAnimationPresets = Record<
  ToastAnimation,
  ToastPresetMotionProps
>;  