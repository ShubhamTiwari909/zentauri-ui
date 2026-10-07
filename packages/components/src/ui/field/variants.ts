import { cva } from "class-variance-authority";
import {
  zuiFieldBase,
  zuiFieldAppearances,
  zuiFieldSizes,
  zuiFieldOrientations,
  zuiFieldContentBase,
  zuiFieldLabelBase,
  zuiFieldDescriptionBase,
  zuiFieldErrorBase,
  zuiFieldFormBase,
  zuiFieldGroupBase,
  zuiFieldLegendBase,
} from "../../design-system/field";

export const fieldVariants = cva(zuiFieldBase, {
  variants: {
    appearance: zuiFieldAppearances,
    size: zuiFieldSizes,
    orientation: zuiFieldOrientations,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    orientation: "vertical",
  },
});
export const fieldContentVariants = cva(zuiFieldContentBase);
export const fieldLabelVariants = cva(zuiFieldLabelBase);
export const fieldDescriptionVariants = cva(zuiFieldDescriptionBase);
export const fieldErrorVariants = cva(zuiFieldErrorBase);
export const formVariants = cva(zuiFieldFormBase);
export const fieldGroupVariants = cva(zuiFieldGroupBase);
export const fieldLegendVariants = cva(zuiFieldLegendBase);
