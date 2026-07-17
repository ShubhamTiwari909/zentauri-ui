import type { DatePickerProps } from "@zentauri-ui/zentauri-components/ui/date-picker";
import type { DatePickerAnimation } from "@zentauri-ui/zentauri-components/ui/date-picker/animated";

export const DATE_PICKER_APPEARANCES = [
  "default",
  "outline",
  "ghost",
  "glass",
  "blue",
  "cyan",
  "green",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "red",
  "slate",
  "gradient-blue",
  "gradient-purple",
  "gradient-teal",
] as const satisfies readonly NonNullable<DatePickerProps["appearance"]>[];

export const DATE_PICKER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<DatePickerProps["size"]>[];

export const DATE_PICKER_MODES = [
  "single",
  "range",
] as const satisfies readonly NonNullable<DatePickerProps["mode"]>[];

export const DATE_PICKER_ANIMATIONS = [
  "none",
  "slide",
  "fade",
  "zoom",
] as const satisfies readonly DatePickerAnimation[];
