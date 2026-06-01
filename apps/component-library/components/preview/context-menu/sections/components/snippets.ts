import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { ContextMenuDemoProps } from "./types";

function propLine(name: string, value: unknown): string {
  if (!value) {
    return "";
  }
  return `  ${name}="${String(value)}"\n`;
}

export function contextMenuSnippet({
  itemVariant = "default",
  pattern = "basic",
  spacing = "default",
}: ContextMenuDemoProps): string {
  const showSubMenu = pattern === "sub-menu";
  const showDisabled = pattern === "disabled";
  const showDestructive = pattern === "destructive";

  return `${variantLeadComment(
    `item ${itemVariant} / spacing ${spacing} / pattern ${pattern}`,
  )}<ContextMenu>
  <ContextMenuTrigger>
    <div className="cursor-context-menu rounded-2xl border p-5">
      Right-click preview surface
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent
${propLine("spacing", spacing)}  >
    <ContextMenuLabel>Workspace</ContextMenuLabel>
    <ContextMenuItem variant="${itemVariant}">Open details</ContextMenuItem>
    <ContextMenuItem variant="${itemVariant}">Copy link</ContextMenuItem>
${
  showSubMenu
    ? `    <ContextMenuSub>
      <ContextMenuSubTrigger variant="${itemVariant}">
        Share
      </ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Email digest</ContextMenuItem>
        <ContextMenuItem>Slack channel</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
`
    : ""
}${
    showDisabled
      ? `    <ContextMenuItem disabled variant="${itemVariant}">
      Locked action
    </ContextMenuItem>
`
      : ""
  }    <ContextMenuSeparator />
    <ContextMenuItem variant="${showDestructive ? "rose" : itemVariant}">
      ${showDestructive ? "Delete workspace" : "Archive"}
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;
}
