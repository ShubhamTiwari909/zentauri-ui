import { BreadcrumbAppearance } from "@zentauri-ui/zentauri-components/ui/breadcrumb";
import type { BreadcrumbScenario } from "./types";

export { PREVIEW_SECTION_CLASS as BREADCRUMB_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const BREADCRUMB_SCENARIOS: readonly BreadcrumbScenario[] = [
  "default",
  "dots",
  "smallSeparator",
];

export const BREADCRUMB_APPEARANCES = [
  "default",
  "muted",
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
  "amber",
  "violet",
] as const satisfies readonly NonNullable<BreadcrumbAppearance>[];
