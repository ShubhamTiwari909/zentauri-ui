import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import type { progressVariants } from "../variants";
import { ProgressSectionProps } from "../types";

export type ProgressVariantProps = VariantProps<typeof progressVariants>;

export type ProgressAnimation = "none" | "shimmer";

export type ProgressPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "transition" | "animate"
>;

export type ProgressAnimationPresets = Record<
  ProgressAnimation,
  ProgressPresetMotionProps
>;

export type ProgressAnimatedProps = ProgressVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    value?: number;
    min?: number;
    max?: number;
    label?: string;
    children?: ReactNode;
    busy?: boolean;
    animation?: ProgressAnimation;
  };

export type ProgressBarAnimatedProps = ProgressSectionProps & {
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
};