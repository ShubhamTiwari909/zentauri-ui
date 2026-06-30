import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { HttpStatusBadgeDemoProps } from "./types";

export function httpStatusBadgeSnippet(opts: HttpStatusBadgeDemoProps): string {
  const { status, appearance, size, showText } = opts;

  const appearanceAttr =
    appearance === "soft" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const showTextAttr = showText ? "" : " showText={false}";

  const lead = variantLeadComment(
    `status · ${status}, appearance · ${appearance}, size · ${size}`,
  );

  return `import { HttpStatusBadge } from "@zentauri-ui/zentauri-components/ui/http-status-badge";\n\n${lead}<HttpStatusBadge status={${status}}${appearanceAttr}${sizeAttr}${showTextAttr} />`;
}
