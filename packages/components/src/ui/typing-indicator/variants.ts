import { cva } from "class-variance-authority";

import {
  zuiTypingIndicatorAppearances,
  zuiTypingIndicatorContainerBase,
  zuiTypingIndicatorDotBase,
  zuiTypingIndicatorDotDelays,
  zuiTypingIndicatorDotSizes,
  zuiTypingIndicatorDotsBase,
  zuiTypingIndicatorLabelBase,
  zuiTypingIndicatorLabelSizes,
  zuiTypingIndicatorSizes,
} from "../../design-system/typing-indicator";

export { zuiTypingIndicatorDotDelays as typingIndicatorDotDelays };

export const typingIndicatorVariants = cva(zuiTypingIndicatorContainerBase, {
  variants: {
    size: zuiTypingIndicatorSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const typingIndicatorDotsVariants = cva(zuiTypingIndicatorDotsBase, {
  variants: {
    size: zuiTypingIndicatorSizes,
  },
  defaultVariants: { size: "md" },
});

export const typingIndicatorDotVariants = cva(zuiTypingIndicatorDotBase, {
  variants: {
    appearance: zuiTypingIndicatorAppearances,
    size: zuiTypingIndicatorDotSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const typingIndicatorLabelVariants = cva(zuiTypingIndicatorLabelBase, {
  variants: {
    size: zuiTypingIndicatorLabelSizes,
  },
  defaultVariants: { size: "md" },
});
