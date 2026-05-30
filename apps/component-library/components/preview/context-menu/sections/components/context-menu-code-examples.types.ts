import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
} from "@zentauri-ui/zentauri-components/ui/context-menu";

export type ContextMenuDemoProps = {
  itemVariant?: NonNullable<ContextMenuItemProps["variant"]>;
  spacing?: NonNullable<ContextMenuContentProps["spacing"]>;
  pattern?: "basic" | "sub-menu" | "destructive" | "disabled";
};
