import type { ReactNode } from "react";

import type { zuiTooltipVariants } from "../../design-system/tooltip";

export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipVariant = keyof typeof zuiTooltipVariants;

export type TooltipContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  position: TooltipPosition;
  delay: number;
  scheduleDelayedOpen: () => void;
  cancelDelayedOpen: () => void;
  tooltipId: string;
};

export type TooltipProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: TooltipPosition;
  delay?: number;
};

export type TooltipTriggerProps = {
  children: ReactNode;
  className?: string;
};

export type TooltipContentProps = {
  children: ReactNode;
  className?: string;
  variant?: TooltipVariant;
  size?: "sm" | "md" | "lg";
  width?: "fit" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
};
