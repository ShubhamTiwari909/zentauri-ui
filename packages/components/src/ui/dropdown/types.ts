import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import type { zuiDropdownTriggerVariants } from "../../design-system/dropdown";

export type DropdownContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  selectedValues: string[];
  toggleSelect: (value: string) => void;
  multiSelect: boolean;
  menuId: string;
};

type Variant = keyof typeof zuiDropdownTriggerVariants;

export type DropdownProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiSelect?: boolean;
};

export type DropdownTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
};

export type DropdownContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  spacing?: "none" | "default" | "sm" | "md" | "lg" | "xl";
  divider?: boolean;
};

export type DropdownItemProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  value: string;
  onSelect?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: Variant;
};
