import type { RadioGroupProps } from "@zentauri-ui/zentauri-components/ui/radio-group";

export const RADIO_GROUP_APPEARANCES = [
  "default",
  "success",
  "warning",
  "error",
  "info",
  "violet",
  "amber",
  "pink",
  "indigo",
] as const satisfies readonly NonNullable<RadioGroupProps["appearance"]>[];

export const RADIO_GROUP_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<RadioGroupProps["size"]>[];
