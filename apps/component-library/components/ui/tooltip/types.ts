import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";

import type { TooltipAnimation } from "./animations";
import type { tooltipContentVariants } from "./variants";

export type { TooltipAnimation };

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

type TooltipContentVariantProps = VariantProps<typeof tooltipContentVariants>;

export type TooltipProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayMs?: number;
  children?: ReactNode;
};

export type TooltipTriggerProps = HTMLAttributes<HTMLSpanElement> & {
  ref?: Ref<HTMLSpanElement>;
};

export type TooltipContentProps = TooltipContentVariantProps & {
  placement?: TooltipPlacement;
  animation?: TooltipAnimation;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  style?: CSSProperties;
};

export type TooltipArrowProps = {
  className?: string;
};
