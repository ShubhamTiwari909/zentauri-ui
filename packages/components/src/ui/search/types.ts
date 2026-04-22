import type { InputHTMLAttributes, ReactNode, RefObject } from "react";

import type { VariantProps } from "class-variance-authority";

import type { inputVariants } from "../inputs/variants";

export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "children"> & {
  value: string;
  onValueChange?: (value: string) => void;
  leadingSlot?: ReactNode;
  inputClassName?: string;
  appearance?: VariantProps<typeof inputVariants>["appearance"];
  inputSize?: VariantProps<typeof inputVariants>["size"];
  ring?: VariantProps<typeof inputVariants>["ring"];
  ref?: RefObject<HTMLInputElement | null>;
};

export type SearchSuggestionItem = {
  id: string;
  label: string;
  description?: string;
  group?: string;
};

export type SearchSuggestionListProps = {
  items: readonly SearchSuggestionItem[];
  onSelect: (id: string) => void;
  activeId?: string;
  onActiveIdChange?: (id: string | undefined) => void;
  className?: string;
  listClassName?: string;
  emptyLabel?: ReactNode;
};

export type SearchFilterable = {
  id: string;
  label: string;
  description?: string;
  keywords?: readonly string[];
  href?: string;
};
