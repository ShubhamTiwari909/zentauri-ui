import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import type { selectTriggerVariants } from "./variants";

export type SelectOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};
export type SelectAppearance =
  | "default"
  | "glass"
  | "ghost"
  | "outline"
  | "sky"
  | "rose"
  | "purple"
  | "pink"
  | "orange"
  | "yellow"
  | "teal"
  | "indigo"
  | "emerald"
  | "gradient-blue"
  | "gradient-green"
  | "gradient-red"
  | "gradient-yellow"
  | "gradient-purple"
  | "gradient-teal"
  | "gradient-indigo"
  | "gradient-pink"
  | "gradient-orange";
export type SelectContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  selected: string[];
  toggleValue: (value: string) => void;
  isSelected: (value: string) => boolean;
  registerOption: (option: SelectOption) => void;
  options: SelectOption[];
  multiple: boolean;
};

export type SelectProps = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  multiple?: boolean;
  children: ReactNode;
  className?: string;
};

type SelectTriggerVariantProps = VariantProps<typeof selectTriggerVariants>;

export type SelectTriggerProps = SelectTriggerVariantProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
    className?: string;
  };

export type SelectContentProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  appearance?: SelectAppearance;
  size?: "sm" | "md" | "lg";
  spacing?: "none" | "default" | "sm" | "md" | "lg" | "xl";
};

export type SelectItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  appearance?: SelectAppearance;
};

export type SelectValueProps = HTMLAttributes<HTMLSpanElement> & {
  placeholder?: ReactNode;
};
