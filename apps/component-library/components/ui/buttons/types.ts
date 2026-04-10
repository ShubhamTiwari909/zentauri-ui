import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { buttonVariants } from "./variants";

export type ButtonAnimation =
  | "none"
  | "lift"
  | "press"
  | "glow"
  | "tilt"
  | "bounce";

type ButtonSharedProps = VariantProps<typeof buttonVariants> & {
  animation?: ButtonAnimation;
};

/** Motion props applied by presets; valid on both `motion.button` and `motion.a`. */
type ButtonPresetMotionProps = Pick<
  HTMLMotionProps<"button">,
  "style" | "transition" | "whileHover" | "whileTap"
>;

export type ButtonProps =
  | (ButtonSharedProps & HTMLMotionProps<"button"> & { as?: "button" })
  | (ButtonSharedProps & HTMLMotionProps<"a"> & { as: "link" });

export type AnimationPresets = Record<ButtonAnimation, ButtonPresetMotionProps>;

export type CodeShowcaseProps = {
  code: string;
  appearance: ButtonProps["appearance"];
  animation: ButtonProps["animation"];
  label: string;
  buttonClassName?: string;
  size?: ButtonProps["size"];
};
