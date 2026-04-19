import type {
  AccordionProps,
  AccordionTransition,
} from "@zentauri-ui/zentauri-components/ui/accordion";

export type AccordionAppearance = NonNullable<AccordionProps["appearance"]>;
export type AccordionSize = NonNullable<AccordionProps["size"]>;
export type AccordionDemoType = "single" | "multiple";

export type AccordionDemoProps = {
  appearance: AccordionAppearance;
  size: AccordionSize;
  type: AccordionDemoType;
  transition: AccordionTransition;
};
