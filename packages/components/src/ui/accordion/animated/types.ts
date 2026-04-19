import type { AccordionBaseProps, AccordionContentProps, AccordionTransition } from "../types";

export type AccordionAnimatedProps = AccordionBaseProps;

export type AccordionContentAnimatedProps = AccordionContentProps & {
  transitionVariant?: AccordionTransition;
};