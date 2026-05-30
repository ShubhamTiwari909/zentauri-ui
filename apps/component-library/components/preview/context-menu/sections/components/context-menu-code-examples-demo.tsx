import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@zentauri-ui/zentauri-components/ui/context-menu";

import type { ContextMenuDemoProps } from "./context-menu-code-examples.types";

export function ContextMenuDemo({
  itemVariant = "default",
  pattern = "basic",
  spacing = "default",
}: ContextMenuDemoProps) {
  const showSubMenu = pattern === "sub-menu";
  const showDisabled = pattern === "disabled";
  const showDestructive = pattern === "destructive";

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="cursor-context-menu rounded-2xl border border-slate-900/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold text-slate-950 dark:text-white">
            Right-click preview surface
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Item variant: {itemVariant}. Content spacing: {spacing}.
          </p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent spacing={spacing}>
        <ContextMenuLabel>Workspace</ContextMenuLabel>
        <ContextMenuItem variant={itemVariant}>Open details</ContextMenuItem>
        <ContextMenuItem variant={itemVariant}>Copy link</ContextMenuItem>
        {showSubMenu ? (
          <ContextMenuSub>
            <ContextMenuSubTrigger variant={itemVariant}>
              Share
            </ContextMenuSubTrigger>
            <ContextMenuSubContent spacing={spacing}>
              <ContextMenuItem variant={itemVariant}>Email digest</ContextMenuItem>
              <ContextMenuItem variant={itemVariant}>Slack channel</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        ) : null}
        {showDisabled ? (
          <ContextMenuItem disabled variant={itemVariant}>
            Locked action
          </ContextMenuItem>
        ) : null}
        <ContextMenuSeparator />
        <ContextMenuItem variant={showDestructive ? "rose" : itemVariant}>
          {showDestructive ? "Delete workspace" : "Archive"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
