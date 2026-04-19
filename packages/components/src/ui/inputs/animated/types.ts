import type { HTMLMotionProps } from "framer-motion";
import type { VariantProps } from "class-variance-authority";

import type { inputVariants } from "../variants";

export type InputSharedAnimatedProps = Omit<
  VariantProps<typeof inputVariants>,
  "as"
> & {
  animation?: InputAnimation;
  errorMessage?: string;
};

export type InputAnimatedProps =
  | (InputSharedAnimatedProps &
      Omit<HTMLMotionProps<"input">, "size" | "as"> & {
        as?: "input" | "file" | "checkbox" | "radio";
      })
  | (InputSharedAnimatedProps &
      Omit<HTMLMotionProps<"textarea">, "size" | "as"> & {
        as: "textarea";
      });

export type InputAnimation =
  | "none"
  | "lift"
  | "press"
  | "glow"
  | "tilt"
  | "bounce";

export type InputPresetMotionProps = Pick<
  HTMLMotionProps<"input">,
  "style" | "transition" | "whileHover" | "whileTap" | "whileFocus"
>;

export type InputAnimationPresets = Record<
  InputAnimation,
  InputPresetMotionProps
>;
