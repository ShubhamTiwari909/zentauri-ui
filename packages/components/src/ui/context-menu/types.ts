import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  HTMLAttributes,
  ReactNode,
  RefObject,
} from "react";

import type {
  contextMenuContentVariants,
  contextMenuItemVariants,
} from "./variants";

export type ContextMenuPosition = {
  x: number;
  y: number;
};

export type ContextMenuContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openAt: (position: ContextMenuPosition) => void;
  position: ContextMenuPosition | null;
  contentId: string;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
};

export type ContextMenuProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
};

export type ContextMenuTriggerProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

export type ContextMenuContentProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof contextMenuContentVariants> & {
    children: ReactNode;
    collisionPadding?: number;
    width?: number;
  };

export type ContextMenuItemProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof contextMenuItemVariants> & {
    children: ReactNode;
    closeOnSelect?: boolean;
    disabled?: boolean;
    inset?: boolean;
    leftIcon?: ReactNode;
    onSelect?: () => void;
    rightIcon?: ReactNode;
  };

export type ContextMenuLabelProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  inset?: boolean;
};

export type ContextMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

export type ContextMenuSubContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type ContextMenuSubProps = {
  children: ReactNode;
  defaultOpen?: boolean;
};

export type ContextMenuSubTriggerProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof contextMenuItemVariants> & {
    children: ReactNode;
    disabled?: boolean;
    inset?: boolean;
    rightIcon?: ReactNode;
  };

export type ContextMenuSubContentProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof contextMenuContentVariants> & {
    children: ReactNode;
  };
