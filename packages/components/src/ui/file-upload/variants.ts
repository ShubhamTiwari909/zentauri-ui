import { cva } from "class-variance-authority";

import {
  zuiFileUploadAppearances,
  zuiFileUploadBase,
} from "../../design-system/file-upload";

export const fileUploadVariants = cva(zuiFileUploadBase, {
  variants: {
    appearance: zuiFileUploadAppearances,
  },
  defaultVariants: {
    appearance: "idle",
  },
});
