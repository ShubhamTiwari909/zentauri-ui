import { cva } from "class-variance-authority";
import {
  zuiToolbarBase,
  zuiToolbarAppearances,
  zuiToolbarOrientations,
  zuiToolbarWrap,
  zuiToolbarItemBase,
  zuiToolbarItemSizes,
  zuiToolbarGroupBase,
  zuiToolbarGroupOrientations,
  zuiToolbarSeparatorBase,
} from "../../design-system/toolbar";

export const toolbarVariants = cva(zuiToolbarBase, {
  variants: {
    appearance: zuiToolbarAppearances,
    orientation: zuiToolbarOrientations,
    wrap: zuiToolbarWrap,
  },
  defaultVariants: {
    appearance: "default",
    orientation: "horizontal",
    wrap: true,
  },
});
export const toolbarItemVariants = cva(zuiToolbarItemBase, {
  variants: { size: zuiToolbarItemSizes },
  defaultVariants: { size: "md" },
});
export const toolbarGroupVariants = cva(zuiToolbarGroupBase, {
  variants: { orientation: zuiToolbarGroupOrientations },
  defaultVariants: { orientation: "horizontal" },
});
export const toolbarSeparatorVariants = cva(zuiToolbarSeparatorBase);
