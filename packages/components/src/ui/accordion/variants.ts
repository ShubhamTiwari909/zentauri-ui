import { cva } from "class-variance-authority";

import {
  zuiAccordionAppearances,
  zuiAccordionBase,
  zuiAccordionContentBase,
  zuiAccordionContentSizes,
  zuiAccordionItemAppearances,
  zuiAccordionItemBase,
  zuiAccordionSizes,
  zuiAccordionTriggerBase,
  zuiAccordionTriggerSizes,
} from "../../design-system/accordion";

export const accordionVariants = cva(zuiAccordionBase, {
  variants: {
    appearance: zuiAccordionAppearances,
    size: zuiAccordionSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const accordionItemVariants = cva(zuiAccordionItemBase, {
  variants: {
    appearance: zuiAccordionItemAppearances,
  },
  defaultVariants: { appearance: "default" },
});

export const accordionTriggerVariants = cva(zuiAccordionTriggerBase, {
  variants: {
    size: zuiAccordionTriggerSizes,
  },
  defaultVariants: { size: "md" },
});

export const accordionContentVariants = cva(zuiAccordionContentBase, {
  variants: {
    size: zuiAccordionContentSizes,
  },
  defaultVariants: { size: "md" },
});
