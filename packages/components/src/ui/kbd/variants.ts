import { cva } from "class-variance-authority";

import {
  zuiKbdKeyAppearances,
  zuiKbdKeyBase,
  zuiKbdKeySizes,
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

export const kbdSeparatorVariants = cva(
  "text-[color:var(--zui-kbd-separator-fg,#94a3b8)] dark:text-[color:var(--zui-kbd-separator-fg-dark,#64748b)]",
  {
    variants: {
      size: zuiKbdSeparatorSizes,
    },
    defaultVariants: {
      size: "md",
    },
  },
);
