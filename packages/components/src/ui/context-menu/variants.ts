import { cva } from "class-variance-authority";

import {
  zuiContextMenuContentBase,
  zuiContextMenuItemBase,
  zuiContextMenuItemVariants,
  zuiContextMenuSpacing,
} from "../../design-system/context-menu";

export const contextMenuContentVariants = cva(zuiContextMenuContentBase, {
  variants: {
    spacing: zuiContextMenuSpacing,
  },
  defaultVariants: {
    spacing: "default",
  },
});

export const contextMenuItemVariants = cva(zuiContextMenuItemBase, {
  variants: {
    variant: zuiContextMenuItemVariants,
  },
  defaultVariants: {
    variant: "default",
  },
});
