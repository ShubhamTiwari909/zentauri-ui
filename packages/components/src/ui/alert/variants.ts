import { cva } from "class-variance-authority";

import {
  zuiAlertAppearances,
  zuiAlertBase,
  zuiAlertDescriptionBase,
  zuiAlertSizes,
  zuiAlertTextSizes,
  zuiAlertTitleBase,
} from "../../design-system/alert";

export const alertVariants = cva(zuiAlertBase, {
  variants: {
    appearance: zuiAlertAppearances,
    size: zuiAlertSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const alertTitleVariants = cva(zuiAlertTitleBase, {
  variants: {
    size: zuiAlertTextSizes,
  },
  defaultVariants: { size: "md" },
});

export const alertDescriptionVariants = cva(zuiAlertDescriptionBase, {
  variants: {
    size: zuiAlertTextSizes,
  },
  defaultVariants: { size: "md" },
});
