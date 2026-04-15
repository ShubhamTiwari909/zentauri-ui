import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import type { progressVariants } from "./variants";

export type ProgressAnimation = "none" | "shimmer";

type ProgressVariantProps = VariantProps<typeof progressVariants>;

export type ProgressProps = ProgressVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    value?: number;
    min?: number;
    max?: number;
    animation?: ProgressAnimation;
    label?: string;
    children?: ReactNode;
  };

export type ProgressSectionProps = {
  className?: string;
  children?: ReactNode;
};
