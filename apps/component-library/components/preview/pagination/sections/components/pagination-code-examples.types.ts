import type { PaginationProps } from "@zentauri-ui/zentauri-components/ui/pagination";

export type PaginationAppearance = NonNullable<PaginationProps["appearance"]>;
export type PaginationSize = NonNullable<PaginationProps["size"]>;

export type PaginationDemoProps = {
  appearance: PaginationAppearance;
  size: PaginationSize;
};
