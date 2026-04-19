import { HTMLMotionProps } from "framer-motion";
import type { ModalContentProps } from "../types";

export type ModalAnimation =
  | "none"
  | "fade"
  | "scale"
  | "slide-up"
  | "slide-down";

export type ModalContentAnimatedProps = ModalContentProps & {
  animation?: ModalAnimation;
};

export type ModalPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>;

export type ModalAnimationPresets = Record<
  ModalAnimation,
  ModalPresetMotionProps
>;
