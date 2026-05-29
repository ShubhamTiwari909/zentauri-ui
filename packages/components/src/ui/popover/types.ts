import { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { popoverContentVariants } from "./variants";

export type PopoverSide = "top" | "left" | "bottom" | "right";
export type PopoverAlign = "start" | "center" | "end";

export type PopoverContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggleOpen: () => void;
  contentId: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

export type PopoverProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
};

export type PopoverTriggerProps = {
  children: ReactNode;
  className?: string;
};

export type PopoverContentProps = ComponentPropsWithRef<"div"> & {
  children: ReactNode;
  variant?: VariantProps<typeof popoverContentVariants>["variant"]
  size?: VariantProps<typeof popoverContentVariants>["size"];
  width?: VariantProps<typeof popoverContentVariants>["width"];
  side?: PopoverSide;
  align?: PopoverAlign;
};