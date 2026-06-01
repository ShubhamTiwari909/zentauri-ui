import type {
  AccordionProps,
  AccordionTransition,
} from "@zentauri-ui/zentauri-components/ui/accordion";

export { PREVIEW_SECTION_CLASS as ACCORDION_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const ACCORDION_APPEARANCES = [
  "default",
  "outline",
  "ghost",
  "card",
  "separated",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<AccordionProps["appearance"]>[];

export const ACCORDION_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<AccordionProps["size"]>[];

export const ACCORDION_TRANSITIONS = [
  "none",
  "default",
  "smooth",
  "slow",
] as const satisfies readonly AccordionTransition[];
