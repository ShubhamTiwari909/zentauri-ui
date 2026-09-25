import { cva } from "class-variance-authority";
import {
  zuiGlassCardBase,
  zuiGlassCardAppearances,
  zuiGlassCardMaterials,
  zuiGlassCardSizes,
  zuiGlassCardContentBase,
  zuiGlassCardContentPadding,
} from "../../design-system/glass-card";

export const glassCardVariants = cva(zuiGlassCardBase, {
  variants: {
    appearance: zuiGlassCardAppearances,
    variant: zuiGlassCardMaterials,
    size: zuiGlassCardSizes,
  },
  defaultVariants: { appearance: "default", variant: "glass", size: "md" },
});
export const glassCardContentVariants = cva([
  zuiGlassCardContentBase,
  zuiGlassCardContentPadding,
]);
