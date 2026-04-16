import type { AccordionProps } from "@zentauri-ui/zentauri-components/ui";

export const ACCORDION_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

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
] as const satisfies readonly NonNullable<AccordionProps["transition"]>[];
