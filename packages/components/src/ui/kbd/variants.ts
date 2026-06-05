import { cva } from "class-variance-authority";

import {
  zuiKbdKeyAppearances,
  zuiKbdKeyBase,
  zuiKbdKeySizes,
  zuiKbdSeparatorBase,
  zuiKbdSeparatorSizes,
} from "../../design-system/kbd";

export const kbdKeyVariants = cva(zuiKbdKeyBase, {
  variants: {
    appearance: zuiKbdKeyAppearances,
    size: zuiKbdKeySizes,
  },
  defaultVariants: {
    appearance: "outline",
    size: "md",
  },
});

export const kbdSeparatorVariants = cva(zuiKbdSeparatorBase, {
  variants: {
    size: zuiKbdSeparatorSizes,
  },
  defaultVariants: {
    size: "md",
  },
});
