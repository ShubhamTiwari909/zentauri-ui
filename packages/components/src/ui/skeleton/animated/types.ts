import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import type { SkeletonAnimation } from "../types";
import type { skeletonVariants } from "../variants";

export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;

export type SkeletonPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "transition"
>;

export type SkeletonAnimationPresets = Record<
  SkeletonAnimation,
  SkeletonPresetMotionProps
>;


export type SkeletonAnimatedProps = SkeletonVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    animation?: SkeletonAnimation;
    children?: ReactNode;
    busy?: boolean;
  };

export type SkeletonCardAnimatedProps = SkeletonAnimatedProps;

export type SkeletonTextAnimatedProps = SkeletonVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    animation?: SkeletonAnimation;
    lines?: number;
    busy?: boolean;
  };

export type SkeletonAvatarAnimatedProps = SkeletonVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    animation?: SkeletonAnimation;
    avatarSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    busy?: boolean;
  };

export type SkeletonButtonAnimatedProps = SkeletonVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    animation?: SkeletonAnimation;
    buttonSize?: "sm" | "md" | "lg";
    busy?: boolean;
  };
