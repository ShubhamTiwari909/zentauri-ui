import { cva } from "class-variance-authority";

import {
  zuiEmptyStateAlignments,
  zuiEmptyStateAppearances,
  zuiEmptyStateBase,
  zuiEmptyStateDescriptionBase,
  zuiEmptyStateDescriptionSizes,
  zuiEmptyStateSizes,
  zuiEmptyStateTitleBase,
  zuiEmptyStateTitleSizes,
} from "../../design-system/empty-state";

export const emptyStateVariants = cva(zuiEmptyStateBase, {
  variants: {
    size: zuiEmptyStateSizes,
    appearance: zuiEmptyStateAppearances,
    align: zuiEmptyStateAlignments,
  },
  defaultVariants: {
    size: "md",
    appearance: "default",
    align: "center",
  },
});

export const emptyStateTitleVariants = cva(zuiEmptyStateTitleBase, {
  variants: {
    size: zuiEmptyStateTitleSizes,
  },
  defaultVariants: { size: "md" },
});

export const emptyStateDescriptionVariants = cva(zuiEmptyStateDescriptionBase, {
  variants: {
    size: zuiEmptyStateDescriptionSizes,
  },
  defaultVariants: { size: "md" },
});
