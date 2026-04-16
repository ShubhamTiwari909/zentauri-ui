import { Pagination } from "@zentauri-ui/zentauri-components/ui";

import type { PaginationDemoProps } from "./pagination-code-examples.types";

export function PaginationDemo({ appearance, size }: PaginationDemoProps) {
  return (
    <div>
      <p className="mb-5 text-xs md:text-sm">
        Appearance: <span className="font-bold">{appearance.toUpperCase()}</span>, Size:{" "}
        <span className="font-bold">{size.toUpperCase()}</span>
      </p>
      <Pagination
        appearance={appearance}
        size={size}
        pageCount={15}
        defaultPage={6}
        siblingCount={1}
        boundaryCount={1}
      />
    </div>
  );
}
