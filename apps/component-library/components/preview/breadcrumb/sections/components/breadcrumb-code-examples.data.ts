import { BreadcrumbAppearance } from "@zentauri-ui/zentauri-components/ui/breadcrumb";
import type { BreadcrumbScenario } from "./breadcrumb-code-examples.types";

export const BREADCRUMB_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

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