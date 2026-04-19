import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import type { emptyStateVariants } from "../variants";
import { EmptyStateProps } from "../types";

export type EmptyStateAnimation = "none" | "float" | "fade" | "slide-up";

export type EmptyStateVariantProps = VariantProps<typeof emptyStateVariants>;

export type EmptyStateAnimatedProps = EmptyStateVariantProps &
  Omit<EmptyStateProps, "children"> & {
    animation?: EmptyStateAnimation;
    children?: ReactNode;
  };

export type EmptyStatePresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "transition" | "whileHover"
>;

export type EmptyStateAnimationPresets = Record<
  EmptyStateAnimation,
  EmptyStatePresetMotionProps
>;
