import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { PaginationDemoProps } from "./pagination-code-examples.types";

export function paginationSnippet(opts: PaginationDemoProps): string {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}`)}<Pagination
  pageCount={15}
  defaultPage={6}
  siblingCount={1}
  boundaryCount={1}${appearanceAttr}${sizeAttr}
/>`;
}
