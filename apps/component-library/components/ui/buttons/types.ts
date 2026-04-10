import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { buttonVariants } from "./variants";

export type ButtonAnimation =
  | "none"
  | "lift"
  | "press"
  | "glow"
  | "tilt"
  | "bounce"
  | "pulse"
  | "spin";

export type ButtonProps = HTMLMotionProps<"button"> &
  HTMLMotionProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    animation?: ButtonAnimation;
    as?: "button" | "link";
  };

export type AnimationPresets = Record<
  ButtonAnimation,
  HTMLMotionProps<"button"> & HTMLMotionProps<"a">
>;

export type CodeShowcaseProps = {
  code: string;
  appearance: ButtonProps["appearance"];
  animation: ButtonProps["animation"];
  label: string;
  buttonClassName?: string;
  size?: ButtonProps["size"];
};
