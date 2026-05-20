import type { AlertProps } from "@zentauri-ui/zentauri-components/ui/alert";

export { PREVIEW_SECTION_CLASS as ALERT_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const ALERT_APPEARANCES = [
  "default",
  "success",
  "warning",
  "error",
  "info",
  "ghost",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
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
] as const satisfies readonly NonNullable<AlertProps["appearance"]>[];

export const ALERT_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<AlertProps["size"]>[];
