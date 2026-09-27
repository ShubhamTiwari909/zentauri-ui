import { cva } from "class-variance-authority";
import { zuiProduct3DAppearances, zuiProduct3DBase, zuiProduct3DSizes } from "../../design-system/product-3d";

export const product3DVariants = cva(zuiProduct3DBase, {
  variants: { appearance: zuiProduct3DAppearances, size: zuiProduct3DSizes },
  defaultVariants: { appearance: "default", size: "md" },
});
