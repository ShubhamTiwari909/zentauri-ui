import type { TimezoneSelectProps } from "@zentauri-ui/zentauri-components/ui/timezone-select";

export const TIMEZONE_SELECT_APPEARANCES = [
  "default",
  "outline",
  "ghost",
] as const satisfies readonly NonNullable<TimezoneSelectProps["appearance"]>[];

export const TIMEZONE_SELECT_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<TimezoneSelectProps["size"]>[];
