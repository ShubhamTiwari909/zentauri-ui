import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type DropdownContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  selectedValues: string[];
  toggleSelect: (value: string) => void;
  multiSelect: boolean;
};

export type DropdownProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiSelect?: boolean;
};

export type DropdownTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost" | "sky" | "rose" | "purple" | "pink" | "orange" | "yellow" | "teal" | "indigo" | "emerald";
  size?: "sm" | "md" | "lg";
};

export type DropdownContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
};

export type DropdownItemProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  value: string;
  onSelect?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: "default" | "destructive" | "outline";
};
