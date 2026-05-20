import type { StepperAppearance } from "@zentauri-ui/zentauri-components/ui/stepper";

export { PREVIEW_SECTION_CLASS as STEPPER_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const STEPPER_APPEARANCES = [
  "complete",
  "current",
  "upcoming",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "violet",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<StepperAppearance>[];
