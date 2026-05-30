import type {
  TimelineProps,
  TimelineTransition,
} from "@zentauri-ui/zentauri-components/ui/timeline";

export { PREVIEW_SECTION_CLASS as TIMELINE_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const TIMELINE_APPEARANCES = [
  "default",
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
] as const satisfies readonly NonNullable<TimelineProps["appearance"]>[];

export const TIMELINE_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<TimelineProps["size"]>[];

export const TIMELINE_TRANSITIONS = [
  "none",
  "default",
  "smooth",
  "slow",
] as const satisfies readonly TimelineTransition[];
