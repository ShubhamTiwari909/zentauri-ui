import { variantLeadComment } from "@/components/common/variant-code-prefix";

import { TABLE_BODY_SNIPPET } from "./table-code-examples.data";
import type { TableDemoProps } from "./table-code-examples.types";

function tableOpenTag(opts: TableDemoProps): string {
  const { appearance, size, stickyHeader, textAlign } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const stickyAttr = stickyHeader ? " stickyHeader" : "";
  const textAlignAttr = textAlign === "left" ? "" : ` textAlign="${textAlign}"`;
  return `<Table${appearanceAttr}${sizeAttr}${stickyAttr} rowAnimation="none"${textAlignAttr}>
  <div data-slot="table-scroll" className="relative w-full overflow-auto">
    <table data-slot="table" role="table" class="min-w-0 w-full max-lg:overflow-x-auto max-lg:overscroll-x-contain lg:overflow-x-visible max-lg:**:data-[slot=table]:w-full max-lg:**:data-[slot=table]:min-w-max">
      ${TABLE_BODY_SNIPPET}
    </table>
  </div>
</Table>`;
}

export function tableSnippet(opts: TableDemoProps): string {
  const { appearance, size, stickyHeader } = opts;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, stickyHeader · ${stickyHeader}`)}${tableOpenTag(opts)}
${TABLE_BODY_SNIPPET}
</Table>`;
}
