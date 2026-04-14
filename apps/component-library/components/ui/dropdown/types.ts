import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode, Ref } from "react";

import type { DropdownAnimation } from "./animations";
import type { dropdownContentVariants } from "./variants";

export type { DropdownAnimation };

type DropdownContentVariantProps = VariantProps<typeof dropdownContentVariants>;

export type DropdownProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export type DropdownTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
};

export type DropdownContentProps = DropdownContentVariantProps & {
  animation?: DropdownAnimation;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
};

export type DropdownItemProps = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export type DropdownSeparatorProps = HTMLAttributes<HTMLDivElement>;
export type DropdownLabelProps = HTMLAttributes<HTMLDivElement>;
export type DropdownGroupProps = HTMLAttributes<HTMLDivElement>;

export type DropdownCheckboxItemProps = HTMLAttributes<HTMLButtonElement> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export type DropdownRadioGroupProps = HTMLAttributes<HTMLDivElement> & {
  value?: string;
  onValueChange?: (value: string) => void;
};

export type DropdownRadioItemProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export type DropdownSubMenuProps = { children?: ReactNode };
export type DropdownSubTriggerProps = HTMLAttributes<HTMLButtonElement>;
export type DropdownSubContentProps = HTMLAttributes<HTMLDivElement>;
