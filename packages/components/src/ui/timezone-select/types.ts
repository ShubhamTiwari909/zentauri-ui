import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { TimezoneInfo } from "../../hooks/useTimezone";

import type { timezoneSelectVariants } from "./variants";

export type TimezoneSelectVariantProps = VariantProps<
  typeof timezoneSelectVariants
>;

export interface TimezoneSelectBaseProps
  extends
    TimezoneSelectVariantProps,
    Omit<ComponentPropsWithRef<"div">, "onChange" | "value" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (timeZone: string, info: TimezoneInfo) => void;
  locale?: string;
  groupByRegion?: boolean;
  showTime?: boolean;
  showOffset?: boolean;
  pinnedTimezones?: string[];
  placeholder?: string;
  disabled?: boolean;
}

export type TimezoneSelectProps = TimezoneSelectBaseProps;
