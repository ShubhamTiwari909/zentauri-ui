import type {
  WorldClockCardVariantProps,
  WorldClockProps,
} from "@zentauri-ui/zentauri-components/ui/world-clock";

export const WORLD_CLOCK_APPEARANCES = [
  "default",
  "surface",
  "glass",
  "outline",
  "blue",
  "green",
  "red",
  "gradient-blue",
  "gradient-purple",
] as const satisfies readonly NonNullable<
  WorldClockCardVariantProps["appearance"]
>[];

export const WORLD_CLOCK_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<WorldClockCardVariantProps["size"]>[];

export const WORLD_CLOCK_LAYOUTS = [
  "grid",
  "row",
  "list",
] as const satisfies readonly NonNullable<WorldClockProps["layout"]>[];
