import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import type { passwordStrengthMeterVariants } from "../variants";

export type PasswordStrengthMeterVariantProps = VariantProps<
  typeof passwordStrengthMeterVariants
>;

export type PasswordStrengthMeterAnimation = "none" | "shimmer";

export type PasswordStrengthMeterPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "transition" | "animate"
>;

export type PasswordStrengthMeterAnimationPresets = Record<
  PasswordStrengthMeterAnimation,
  PasswordStrengthMeterPresetMotionProps
>;

export type PasswordStrengthMeterAnimatedProps =
  PasswordStrengthMeterVariantProps &
    Omit<HTMLMotionProps<"div">, "children"> & {
      value: number;
      min?: number;
      max?: number;
      label?: string;
      scoreLabel?: string;
      showScoreLabel?: boolean;
      animated?: boolean;
      segmented?: boolean;
      children?: ReactNode;
      animation?: PasswordStrengthMeterAnimation;
    };
