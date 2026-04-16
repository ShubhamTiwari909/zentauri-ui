import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { EMPTY_STATE_ICON_SNIPPET } from "./empty-state-code-examples.data";
import type { EmptyStateDemoProps } from "./empty-state-code-examples.types";

export function emptyStateSnippet(opts: EmptyStateDemoProps): string {
  const { appearance, size, align } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const alignAttr = align === "center" ? "" : ` align="${align}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, align · ${align}`)}<EmptyState${appearanceAttr}${sizeAttr}${alignAttr} animation="none">
${EMPTY_STATE_ICON_SNIPPET}
  <EmptyStateTitle>No uploads</EmptyStateTitle>
  <EmptyStateDescription>Drag files here to add them.</EmptyStateDescription>
</EmptyState>`;
}
