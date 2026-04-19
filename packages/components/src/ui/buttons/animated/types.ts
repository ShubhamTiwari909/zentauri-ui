import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";

import type { buttonVariants } from "../variants";

export type ButtonAnimation =
  | "none"
  | "lift"
  | "press"
  | "glow"
  | "tilt"
  | "bounce";

export type ButtonSharedAnimated = VariantProps<typeof buttonVariants> & {
  animation?: ButtonAnimation;
};

export type ButtonAnimatedProps =
  | (ButtonSharedAnimated & HTMLMotionProps<"button"> & { as?: "button" })
  | (ButtonSharedAnimated & HTMLMotionProps<"a"> & { as: "link" });

/** Motion props applied by presets; valid on both `motion.button` and `motion.a`. */
export type ButtonPresetMotionProps = Pick<
  HTMLMotionProps<"button">,
  "style" | "transition" | "whileHover" | "whileTap"
>;


export type AnimationPresets = Record<ButtonAnimation, ButtonPresetMotionProps>;
