import type { AccordionProps } from "@zentauri-ui/zentauri-components/ui";

export type AccordionAppearance = NonNullable<AccordionProps["appearance"]>;
export type AccordionSize = NonNullable<AccordionProps["size"]>;
export type AccordionTransition = NonNullable<AccordionProps["transition"]>;
export type AccordionDemoType = "single" | "multiple";

export type AccordionDemoProps = {
  appearance: AccordionAppearance;
  size: AccordionSize;
  type: AccordionDemoType;
  transition: AccordionTransition;
};
