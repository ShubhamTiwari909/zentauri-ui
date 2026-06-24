import { cva } from "class-variance-authority";

import {
  zuiCodeDiffAppearances,
  zuiCodeDiffBase,
  zuiCodeDiffLineAdded,
  zuiCodeDiffLineContentBase,
  zuiCodeDiffLineNumberBase,
  zuiCodeDiffLineRemoved,
  zuiCodeDiffLineUnchanged,
  zuiCodeDiffSizes,
} from "../../design-system/code-diff";

export const codeDiffVariants = cva(zuiCodeDiffBase, {
  variants: {
    appearance: zuiCodeDiffAppearances,
    size: zuiCodeDiffSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const codeDiffLineNumberVariants = cva(zuiCodeDiffLineNumberBase, {
  variants: {
    type: {
      added: zuiCodeDiffLineAdded,
      removed: zuiCodeDiffLineRemoved,
      unchanged: zuiCodeDiffLineUnchanged,
    },
  },
  defaultVariants: {
    type: "unchanged",
  },
});

export const codeDiffLineContentVariants = cva(zuiCodeDiffLineContentBase, {
  variants: {
    type: {
      added: zuiCodeDiffLineAdded,
      removed: zuiCodeDiffLineRemoved,
      unchanged: zuiCodeDiffLineUnchanged,
    },
  },
  defaultVariants: {
    type: "unchanged",
  },
});
