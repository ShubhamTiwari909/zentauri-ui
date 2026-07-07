import type {
  WorldClockProps,
  WorldClockCardVariantProps,
} from "@zentauri-ui/zentauri-components/ui/world-clock";

export type WorldClockAppearance = NonNullable<
  WorldClockCardVariantProps["appearance"]
>;
export type WorldClockSize = NonNullable<WorldClockCardVariantProps["size"]>;
export type WorldClockLayout = NonNullable<WorldClockProps["layout"]>;
