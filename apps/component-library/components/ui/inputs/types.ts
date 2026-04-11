import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { HTMLInputTypeAttribute, ReactNode } from "react";

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
        as?: "input";
      })
  | (InputSharedProps &
      Omit<HTMLMotionProps<"textarea">, "size" | "as"> & {
        as: "textarea";
      });

export type InputAnimationPresets = Record<
  InputAnimation,
  InputPresetMotionProps
>;

export type InputCodeShowcaseProps = {
  code: string;
  ring?: boolean;
  label: string;
  errorMessage?: string;
  placeholder?: string;
  appearance?: VariantProps<typeof inputVariants>["appearance"];
  size?: VariantProps<typeof inputVariants>["size"];
  as?: VariantProps<typeof inputVariants>["as"];
  rows?: number;
  animation?: InputAnimation;
  inputClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  defaultValue?: string;
  /** When set, shown in the “output” tab instead of a configured `Input` (e.g. controlled usage). */
  preview?: ReactNode;
};
