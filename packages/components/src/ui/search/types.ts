import type { InputHTMLAttributes, ReactNode, Ref } from "react";

import type { VariantProps } from "class-variance-authority";

import type { inputVariants } from "../inputs/variants";

export type SearchBarProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "children" | "role"
> & {
  value: string;
  onValueChange?: (value: string) => void;
  leadingSlot?: ReactNode;
  inputClassName?: string;
  appearance?: VariantProps<typeof inputVariants>["appearance"];
  inputSize?: VariantProps<typeof inputVariants>["size"];
  ring?: VariantProps<typeof inputVariants>["ring"];
  /** When set, the input exposes combobox semantics wired to a `role="listbox"` with this id. */
  comboboxListboxId?: string;
  /** Element id of the active option (from `searchSuggestionOptionDomId`) for `aria-activedescendant`. */
  comboboxActiveOptionId?: string;
  /** Whether the suggestion list is visibly expanded (controls `aria-expanded`). */
  comboboxExpanded?: boolean;
  ref?: Ref<HTMLInputElement>;
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
  /** Pass the same id as `comboboxListboxId` on `SearchBar` for ARIA wiring. */
  listboxId?: string;
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
