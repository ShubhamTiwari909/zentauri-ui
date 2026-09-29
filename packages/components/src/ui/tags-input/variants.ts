import { cva } from "class-variance-authority";
import {
  zuiTagsInputAppearances,
  zuiTagsInputBase,
  zuiTagsInputSizes,
} from "../../design-system/tags-input";

export const tagsInputVariants = cva(zuiTagsInputBase, {
  variants: { appearance: zuiTagsInputAppearances, size: zuiTagsInputSizes },
  defaultVariants: { appearance: "default", size: "md" },
});
