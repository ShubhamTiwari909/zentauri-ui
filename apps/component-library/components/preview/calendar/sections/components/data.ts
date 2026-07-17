import type { CalendarProps } from "@zentauri-ui/zentauri-components/ui/calendar";
import type { CalendarAnimation } from "@zentauri-ui/zentauri-components/ui/calendar/animated";

export const CALENDAR_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
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
] as const satisfies readonly NonNullable<CalendarProps["appearance"]>[];

export const CALENDAR_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<CalendarProps["size"]>[];

export const CALENDAR_MODES = [
  "single",
  "multiple",
  "range",
] as const satisfies readonly NonNullable<CalendarProps["mode"]>[];

export const CALENDAR_CAPTION_LAYOUTS = [
  "label",
  "dropdowns",
] as const satisfies readonly NonNullable<CalendarProps["captionLayout"]>[];

export const CALENDAR_ANIMATIONS = [
  "none",
  "slide",
  "fade",
  "zoom",
] as const satisfies readonly CalendarAnimation[];
