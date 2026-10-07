import { cva } from "class-variance-authority";
import {
  zuiResizablePanelsBase,
  zuiResizablePanelsOrientations,
  zuiResizablePanelsPanelBase,
  zuiResizablePanelsPanelAppearances,
  zuiResizablePanelsPanelPaddings,
  zuiResizablePanelsHandleBase,
  zuiResizablePanelsHandleAppearances,
  zuiResizablePanelsHandleOrientations,
  zuiResizablePanelsHandleSizes,
  zuiResizablePanelsContentBase,
} from "../../design-system/resizable-panels";

export const resizablePanelsVariants = cva(zuiResizablePanelsBase, {
  variants: { orientation: zuiResizablePanelsOrientations },
  defaultVariants: { orientation: "horizontal" },
});
export const resizablePanelVariants = cva(zuiResizablePanelsPanelBase, {
  variants: {
    appearance: zuiResizablePanelsPanelAppearances,
    padding: zuiResizablePanelsPanelPaddings,
  },
  defaultVariants: { appearance: "default", padding: "none" },
});
export const resizableHandleVariants = cva(zuiResizablePanelsHandleBase, {
  variants: {
    orientation: zuiResizablePanelsHandleOrientations,
    appearance: zuiResizablePanelsHandleAppearances,
    size: zuiResizablePanelsHandleSizes,
  },
  defaultVariants: {
    orientation: "horizontal",
    appearance: "default",
    size: "md",
  },
});
export const resizablePanelContentVariants = cva(
  zuiResizablePanelsContentBase,
  {
    variants: { padding: zuiResizablePanelsPanelPaddings },
    defaultVariants: { padding: "none" },
  },
);
