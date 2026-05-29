import type { CheckboxProps } from "@zentauri-ui/zentauri-components/ui/checkbox";

export const CHECKBOX_APPEARANCES = [
  "default",
  "success",
  "warning",
  "error",
  "info",
  "violet",
  "amber",
  "pink",
  "indigo",
] as const satisfies readonly NonNullable<CheckboxProps["appearance"]>[];

export const CHECKBOX_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<CheckboxProps["size"]>[];
