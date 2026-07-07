import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import type { worldClockCardVariants, worldClockVariants } from "./variants";

export type WorldClockVariantProps = VariantProps<typeof worldClockVariants>;
export type WorldClockCardVariantProps = VariantProps<
  typeof worldClockCardVariants
>;

export interface WorldClockZone {
  timeZone: string;
  label?: string;
}

export interface WorldClockBaseProps
  extends WorldClockVariantProps, ComponentPropsWithRef<"div"> {
  zones: Array<string | WorldClockZone>;
  locale?: string;
  hourCycle?: "h12" | "h23";
  showSeconds?: boolean;
  showDate?: boolean;
  showOffsetFromLocal?: boolean;
  showDayNight?: boolean;
  cardAppearance?: WorldClockCardVariantProps["appearance"];
  cardSize?: WorldClockCardVariantProps["size"];
}

export type WorldClockProps = WorldClockBaseProps;
