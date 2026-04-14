import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode, Ref } from "react";

import type { SelectAnimation } from "./animations";
import type { selectContentVariants, selectTriggerVariants } from "./variants";

export type { SelectAnimation };

export type SelectMode = "single" | "multiple";

type SelectTriggerVariantProps = VariantProps<typeof selectTriggerVariants>;
type SelectContentVariantProps = VariantProps<typeof selectContentVariants>;

export type SelectProps = {
  mode?: SelectMode;
  value?: string;
  values?: string[];
  defaultValue?: string;
  defaultValues?: string[];
  onValueChange?: (value: string | undefined) => void;
  onValuesChange?: (values: string[]) => void;
  disabled?: boolean;
  children?: ReactNode;
};

export type SelectTriggerProps = SelectTriggerVariantProps &
  HTMLAttributes<HTMLButtonElement> & {
    ref?: Ref<HTMLButtonElement>;
  };

export type SelectValueProps = {
  placeholder?: ReactNode;
  className?: string;
};

export type SelectContentProps = SelectContentVariantProps & {
  animation?: SelectAnimation;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
};

export type SelectItemProps = HTMLAttributes<HTMLDivElement> & {
    value: string;
    disabled?: boolean;
    ref?: Ref<HTMLDivElement>;
  };

export type SelectGroupProps = HTMLAttributes<HTMLDivElement>;
export type SelectLabelProps = HTMLAttributes<HTMLDivElement>;
export type SelectSeparatorProps = HTMLAttributes<HTMLDivElement>;
