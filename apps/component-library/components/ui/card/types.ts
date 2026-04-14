import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { HTMLAttributes, ReactNode, Ref } from "react";

import type { cardVariants } from "./variants";

export type CardAnimation = "none" | "lift" | "glow" | "tilt";

type CardVariantProps = VariantProps<typeof cardVariants>;

export type CardProps = CardVariantProps &
  Omit<HTMLMotionProps<"article">, "children"> & {
    animation?: CardAnimation;
    children?: ReactNode;
  };

export type CardSectionProps = {
  className?: string;
  children?: ReactNode;
};

export type CardTitleProps = {
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "className" | "children">;

export type CardDescriptionProps = {
  as?: "p" | "span" | "div";
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;
