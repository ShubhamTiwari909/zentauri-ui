import { cva } from "class-variance-authority";

import {
  zuiCodeBlockAppearances,
  zuiCodeBlockBase,
  zuiCodeBlockSizes,
} from "../../design-system/code-block";

export const codeBlockVariants = cva(zuiCodeBlockBase, {
  variants: {
    appearance: zuiCodeBlockAppearances,
    size: zuiCodeBlockSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export {
  zuiCodeBlockActionBase,
  zuiCodeBlockBodyBase,
  zuiCodeBlockHeaderBase,
  zuiCodeBlockLangBase,
  zuiCodeBlockLineNumber,
  zuiCodeBlockPre,
} from "../../design-system/code-block";
