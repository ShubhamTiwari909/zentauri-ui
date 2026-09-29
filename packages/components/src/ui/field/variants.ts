import { cva } from "class-variance-authority";
import {
  zuiFieldAppearances,
  zuiFieldBase,
  zuiFieldSizes,
} from "../../design-system/field";

export const fieldVariants = cva(zuiFieldBase, {
  variants: { appearance: zuiFieldAppearances, size: zuiFieldSizes },
  defaultVariants: { appearance: "default", size: "md" },
});
