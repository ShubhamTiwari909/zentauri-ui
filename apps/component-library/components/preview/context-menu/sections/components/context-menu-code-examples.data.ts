import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
} from "@zentauri-ui/zentauri-components/ui/context-menu";

export const CONTEXT_MENU_ITEM_VARIANTS = [
  "default",
  "outline",
  "ghost",
  "white",
  "black",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "amber",
  "violet",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<ContextMenuItemProps["variant"]>[];

export const CONTEXT_MENU_SPACINGS = [
  "none",
  "default",
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly NonNullable<ContextMenuContentProps["spacing"]>[];

export const CONTEXT_MENU_PATTERNS = [
  "basic",
  "sub-menu",
  "destructive",
  "disabled",
] as const;
