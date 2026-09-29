import { cva } from "class-variance-authority";
import {
  zuiInputGroupAppearances,
  zuiInputGroupBase,
  zuiInputGroupSizes,
} from "../../design-system/input-group";

export const inputGroupVariants = cva(zuiInputGroupBase, {
  variants: { appearance: zuiInputGroupAppearances, size: zuiInputGroupSizes },
  defaultVariants: { appearance: "default", size: "md" },
});
