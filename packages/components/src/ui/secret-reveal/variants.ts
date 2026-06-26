import { cva } from "class-variance-authority";

import {
  zuiSecretRevealAppearances,
  zuiSecretRevealContainerBase,
  zuiSecretRevealLabelBase,
  zuiSecretRevealLabelSizes,
  zuiSecretRevealSizes,
  zuiSecretRevealToggleBase,
  zuiSecretRevealToggleSizes,
  zuiSecretRevealValueBase,
  zuiSecretRevealValueSizes,
} from "../../design-system/secret-reveal";

export const secretRevealVariants = cva(zuiSecretRevealContainerBase, {
  variants: {
    appearance: zuiSecretRevealAppearances,
    size: zuiSecretRevealSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const secretRevealLabelVariants = cva(zuiSecretRevealLabelBase, {
  variants: {
    size: zuiSecretRevealLabelSizes,
  },
  defaultVariants: { size: "md" },
});

export const secretRevealValueVariants = cva(zuiSecretRevealValueBase, {
  variants: {
    size: zuiSecretRevealValueSizes,
  },
  defaultVariants: { size: "md" },
});

export const secretRevealToggleVariants = cva(zuiSecretRevealToggleBase, {
  variants: {
    size: zuiSecretRevealToggleSizes,
    appearance: zuiSecretRevealAppearances,
  },
  defaultVariants: {
    size: "md",
    appearance: "default",
  },
});
