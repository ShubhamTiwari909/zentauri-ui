import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import type { skeletonVariants } from "./variants";

export type SkeletonAnimation = "none" | "shimmer" | "pulse";

export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;

export type SkeletonProps = SkeletonVariantProps &
  (Omit<ComponentPropsWithRef<ElementType>, "children"> & {
    animation?: SkeletonAnimation;
    children?: ReactNode;
    /** When true, parent regions can expose busy state to assistive tech. */
    busy?: boolean;
  });

export type SkeletonTextProps = SkeletonProps & {
  lines?: number;
};

export type SkeletonAvatarProps = SkeletonProps & {
  /** Mirrors Avatar sizes for layout parity. */
  avatarSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
};

export type SkeletonCardProps = SkeletonProps;

export type SkeletonButtonProps = SkeletonProps & {
  buttonSize?: "sm" | "md" | "lg";
};
