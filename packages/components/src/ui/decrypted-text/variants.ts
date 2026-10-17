import { cva } from "class-variance-authority";
import {
  zuiDecryptedTextAppearances,
  zuiDecryptedTextBase,
  zuiDecryptedTextCell,
  zuiDecryptedTextEffects,
} from "../../design-system/decrypted-text";

export const decryptedTextVariants = cva(zuiDecryptedTextBase, {
  variants: {
    appearance: zuiDecryptedTextAppearances,
  },
  defaultVariants: { appearance: "default" },
});

export const decryptedTextCellVariants = cva(zuiDecryptedTextCell, {
  variants: {
    effect: zuiDecryptedTextEffects,
  },
  defaultVariants: { effect: "scramble" },
});
