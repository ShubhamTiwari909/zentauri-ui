import { cva } from "class-variance-authority";

import {
  zuiTreeViewAppearances,
  zuiTreeViewBase,
  zuiTreeViewItemAppearances,
  zuiTreeViewItemBase,
  zuiTreeViewItemSizes,
  zuiTreeViewSizes,
} from "../../design-system/tree-view";

export const treeViewVariants = cva(zuiTreeViewBase, {
  variants: {
    appearance: zuiTreeViewAppearances,
    size: zuiTreeViewSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const treeViewItemVariants = cva(zuiTreeViewItemBase, {
  variants: {
    appearance: zuiTreeViewItemAppearances,
    size: zuiTreeViewItemSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});
