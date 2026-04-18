import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import type { emptyStateVariants } from "./variants";

export type EmptyStateAnimation = "none" | "float" | "fade" | "slide-up";

type EmptyStateVariantProps = VariantProps<typeof emptyStateVariants>;

export type EmptyStateProps = EmptyStateVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    animation?: EmptyStateAnimation;
    children?: ReactNode;
  };

export type EmptyStateSectionProps = {
  className?: string;
  children?: ReactNode;
};

export type EmptyStateSize = NonNullable<EmptyStateProps["size"]>;