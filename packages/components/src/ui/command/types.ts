import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, ReactNode, Ref, RefObject } from "react";

import type { commandContentVariants } from "./variants";

export type CommandContentVariantProps = VariantProps<
  typeof commandContentVariants
>;

export type CommandProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * When set, binds a global shortcut that toggles the palette: this key plus
   * meta (⌘) or ctrl. Defaults to "k" when `hotkey` is `true`.
   */
  hotkey?: string | boolean;
  /** Accessible label for the dialog. */
  label?: string;
  children?: ReactNode;
};

export type CommandTriggerProps = {
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type CommandContentProps = CommandContentVariantProps & {
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  id?: string;
  style?: CSSProperties;
};

export type CommandInputProps = {
  className?: string;
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
};

export type CommandListProps = {
  className?: string;
  children?: ReactNode;
};

export type CommandGroupProps = {
  className?: string;
  heading?: ReactNode;
  children?: ReactNode;
};

export type CommandItemProps = {
  className?: string;
  /** Stable identifier used for filtering, keyboard nav, and onSelect. */
  value: string;
  /** Extra terms used by the filter in addition to the rendered text. */
  keywords?: string[];
  disabled?: boolean;
  onSelect?: (value: string) => void;
  children?: ReactNode;
};

export type CommandSectionProps = {
  className?: string;
  children?: ReactNode;
};


export type ItemMeta = {
  keywords?: string[];
  disabled?: boolean;
  onSelect?: (value: string) => void;
  searchText?: string;
};

export type RegisteredItem = {
  value: string;
  metaRef: RefObject<ItemMeta>;
};

export type CommandCtx = {
  open: boolean;
  setOpen: (next: boolean) => void;
  labelId: string;
  query: string;
  setQuery: (next: string) => void;
  activeValue: string | null;
  setActiveValue: (next: string | null) => void;
  visibleValues: string[];
  isVisible: (value: string) => boolean;
  registerItem: (item: RegisteredItem) => () => void;
  invalidateRegistry: () => void;
  selectValue: (value: string) => boolean;
  contentRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
};