import { cva } from "class-variance-authority";
import {
  zuiGridBase,
  zuiGridItemBase,
  zuiGridFlows,
  zuiGridAlignments,
  zuiGridJustifications,
  zuiGridSelfAlignments,
  zuiGridSelfJustifications,
  zuiGridItemAppearances,
  zuiGridItemPaddings,
} from "../../design-system/grid";

export const gridVariants = cva(zuiGridBase, {
  variants: {
    autoFlow: zuiGridFlows,
    alignItems: zuiGridAlignments,
    justifyItems: zuiGridJustifications,
  },
  defaultVariants: {
    autoFlow: "row",
    alignItems: "stretch",
    justifyItems: "stretch",
  },
});

export const gridItemVariants = cva(zuiGridItemBase, {
  variants: {
    appearance: zuiGridItemAppearances,
    padding: zuiGridItemPaddings,
    alignSelf: zuiGridSelfAlignments,
    justifySelf: zuiGridSelfJustifications,
  },
  defaultVariants: { appearance: "default", padding: "none" },
});
