import type { VariantProps } from "class-variance-authority";
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  RefObject,
} from "react";

import type { zuiComboboxContentAppearances } from "../../design-system/combobox";
import type { comboboxTriggerVariants } from "./variants";

export type ComboboxOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

export type ComboboxAppearance = keyof typeof zuiComboboxContentAppearances;

export type ComboboxContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
  selected: string[];
  toggleValue: (v: string) => void;
  isSelected: (v: string) => boolean;
  multiple: boolean;
  options: ComboboxOption[];
  registerOption: (opt: ComboboxOption) => void;
  visibleValues: string[];
  isVisible: (v: string) => boolean;
  activeValue: string | null;
  setActiveValue: (v: string | null) => void;
  triggerId: string;
  listboxId: string;
  searchRef: RefObject<HTMLInputElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export type ComboboxProps = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  multiple?: boolean;
  children: ReactNode;
  className?: string;
};

type ComboboxTriggerVariantProps = VariantProps<typeof comboboxTriggerVariants>;

export type ComboboxTriggerProps = ComboboxTriggerVariantProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> & {
    className?: string;
    ref?: React.Ref<HTMLButtonElement>;
  };

export type ComboboxValueProps = HTMLAttributes<HTMLSpanElement> & {
  placeholder?: ReactNode;
};

export type ComboboxContentProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  appearance?: ComboboxAppearance;
  size?: "sm" | "md" | "lg";
  spacing?: "none" | "default" | "sm" | "md" | "lg" | "xl";
};

export type ComboboxSearchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
> & {
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export type ComboboxListProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export type ComboboxItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  appearance?: ComboboxAppearance;
};

export type ComboboxEmptyProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};
