import { cva } from "class-variance-authority";

import {
  zuiSortableListAppearances,
  zuiSortableListBase,
  zuiSortableListHandleBase,
  zuiSortableListItemBase,
  zuiSortableListItemSizes,
  zuiSortableListSizes,
} from "../../design-system/sortable-list";

export const sortableListVariants = cva(zuiSortableListBase, {
  variants: {
    appearance: zuiSortableListAppearances,
    size: zuiSortableListSizes,
  },
  defaultVariants: { appearance: "default", size: "md" },
});

export const sortableListItemVariants = cva(zuiSortableListItemBase, {
  variants: {
    appearance: zuiSortableListAppearances,
    size: zuiSortableListItemSizes,
  },
  defaultVariants: { appearance: "default", size: "md" },
});

export const sortableListHandleVariants = cva(zuiSortableListHandleBase);
