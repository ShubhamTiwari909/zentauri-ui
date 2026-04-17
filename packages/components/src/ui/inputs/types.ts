import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";

import type { inputVariants } from "./variants";

export type InputAnimation =
  | "none"
  | "lift"
  | "press"
  | "glow"
  | "tilt"
  | "bounce";

type InputSharedProps = Omit<VariantProps<typeof inputVariants>, "as"> & {
  animation?: InputAnimation;
  errorMessage?: string;
};

/** Motion props applied by presets on `motion.input` / `motion.textarea`. */
type InputPresetMotionProps = Pick<
  HTMLMotionProps<"input">,
  "style" | "transition" | "whileHover" | "whileTap" | "whileFocus"
>;

/** Omit native `size` (character width) so the design-system `size` variant can use the same name. */
export type InputProps =
  | (InputSharedProps &
      Omit<HTMLMotionProps<"input">, "size" | "as"> & {
        as?: "input" | "file" | "checkbox" | "radio";
      })
  | (InputSharedProps &
      Omit<HTMLMotionProps<"textarea">, "size" | "as"> & {
        as: "textarea";
      });

export type InputAnimationPresets = Record<
  InputAnimation,
  InputPresetMotionProps
>;
