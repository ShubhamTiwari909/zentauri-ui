import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";

import type { PopoverAnimation } from "./animations";
import type { popoverContentVariants } from "./variants";

export type { PopoverAnimation };

export type PopoverPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

type PopoverContentVariantProps = VariantProps<typeof popoverContentVariants>;

export type PopoverProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export type PopoverTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
};

export type PopoverContentProps = PopoverContentVariantProps & {
  placement?: PopoverPlacement;
  animation?: PopoverAnimation;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  style?: CSSProperties;
};

export type PopoverArrowProps = {
  className?: string;
};
