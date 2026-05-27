import { cva } from "class-variance-authority";

import {
  zuiModalContentAppearances,
  zuiModalContentBase,
  zuiModalContentPositions,
  zuiModalContentSizes,
  zuiModalOverlayBase,
  zuiModalTriggerAppearances,
  zuiModalTriggerBase,
} from "../../design-system/modal";

export const modalOverlayVariants = cva(zuiModalOverlayBase);

export const modalTriggerVariants = cva(zuiModalTriggerBase, {
  variants: {
    appearance: zuiModalTriggerAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const modalContentVariants = cva(zuiModalContentBase, {
  variants: {
    size: zuiModalContentSizes,
    position: zuiModalContentPositions,
    appearance: zuiModalContentAppearances,
  },
  defaultVariants: {
    size: "md",
    position: "center",
    appearance: "default",
  },
});
