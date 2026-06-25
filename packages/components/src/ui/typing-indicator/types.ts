import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { typingIndicatorDotVariants } from "./variants";

export type TypingIndicatorVariantProps = VariantProps<
  typeof typingIndicatorDotVariants
>;

export type TypingIndicatorDots = 3 | 4 | 5;

export type TypingIndicatorBaseProps = TypingIndicatorVariantProps &
  ComponentPropsWithRef<"span"> & {
    dots?: TypingIndicatorDots;
    label?: ReactNode;
    labelPosition?: "before" | "after";
    children?: ReactNode;
  };

export type TypingIndicatorProps = TypingIndicatorBaseProps;
