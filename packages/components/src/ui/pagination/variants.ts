import { cva } from "class-variance-authority";

import {
  zuiPaginationEllipsisBase,
  zuiPaginationEllipsisSizes,
  zuiPaginationListAppearances,
  zuiPaginationListBase,
  zuiPaginationListSizes,
} from "../../design-system/pagination";

export const paginationListVariants = cva(zuiPaginationListBase, {
  variants: {
    appearance: zuiPaginationListAppearances,
    size: zuiPaginationListSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const paginationEllipsisVariants = cva(zuiPaginationEllipsisBase, {
  variants: {
    size: zuiPaginationEllipsisSizes,
  },
  defaultVariants: { size: "md" },
});
