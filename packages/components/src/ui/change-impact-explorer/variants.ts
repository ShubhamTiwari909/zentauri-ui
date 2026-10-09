import { cva } from "class-variance-authority";
import {
  zuiChangeImpactExplorerBase,
  zuiChangeImpactExplorerAppearances,
  zuiChangeImpactExplorerSizes,
} from "../../design-system/change-impact-explorer";
export const changeImpactExplorerVariants = cva(zuiChangeImpactExplorerBase, {
  variants: {
    appearance: zuiChangeImpactExplorerAppearances,
    size: zuiChangeImpactExplorerSizes,
  },
  defaultVariants: { appearance: "default", size: "md" },
});
