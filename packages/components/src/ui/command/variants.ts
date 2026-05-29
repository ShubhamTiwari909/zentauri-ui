import { cva } from "class-variance-authority";

import {
  zuiCommandContentAppearances,
  zuiCommandContentBase,
  zuiCommandContentSizes,
  zuiCommandEmptyBase,
  zuiCommandFooterBase,
  zuiCommandGroupHeadingBase,
  zuiCommandInputBase,
  zuiCommandInputRowBase,
  zuiCommandItemBase,
  zuiCommandListBase,
  zuiCommandOverlayBase,
  zuiCommandSeparatorBase,
  zuiCommandTriggerBase,
} from "../../design-system/command";

export const commandOverlayVariants = cva(zuiCommandOverlayBase);

export const commandTriggerVariants = cva(zuiCommandTriggerBase);

export const commandContentVariants = cva(zuiCommandContentBase, {
  variants: {
    size: zuiCommandContentSizes,
    appearance: zuiCommandContentAppearances,
  },
  defaultVariants: {
    size: "md",
    appearance: "default",
  },
});

export const commandInputRowVariants = cva(zuiCommandInputRowBase);
export const commandInputVariants = cva(zuiCommandInputBase);
export const commandListVariants = cva(zuiCommandListBase);
export const commandGroupHeadingVariants = cva(zuiCommandGroupHeadingBase);
export const commandItemVariants = cva(zuiCommandItemBase);
export const commandSeparatorVariants = cva(zuiCommandSeparatorBase);
export const commandEmptyVariants = cva(zuiCommandEmptyBase);
export const commandFooterVariants = cva(zuiCommandFooterBase);
