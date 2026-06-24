import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode, Ref } from "react";

import type { typingIndicatorDotVariants } from "./variants";

export type TypingIndicatorVariantProps = VariantProps<
  typeof typingIndicatorDotVariants
>;

export type TypingIndicatorDots = 3 | 4 | 5;

export type TypingIndicatorBaseProps = TypingIndicatorVariantProps & {
  dots?: TypingIndicatorDots;
  label?: ReactNode;
  labelPosition?: "before" | "after";
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
};

export type TypingIndicatorProps = TypingIndicatorBaseProps &
  ComponentPropsWithRef<"span">;
