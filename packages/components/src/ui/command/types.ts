import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, ReactNode, Ref } from "react";

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
