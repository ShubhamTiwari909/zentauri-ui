import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type {
  CalendarSelectionMode,
  DateMatcher,
  DateRange,
} from "./date-utils";
import type { calendarDayVariants } from "./variants";

export type { CalendarSelectionMode, DateMatcher, DateRange };

export type CalendarVariantProps = VariantProps<typeof calendarDayVariants>;

export type CalendarAppearance = NonNullable<
  CalendarVariantProps["appearance"]
>;
export type CalendarSize = NonNullable<CalendarVariantProps["size"]>;

/** Computed per-day state passed to `renderDay` and used for styling. */
export interface CalendarDayState {
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isRangeMiddle: boolean;
  isToday: boolean;
  isOutside: boolean;
  isDisabled: boolean;
  isHidden: boolean;
  isFocused: boolean;
}

/** Any selection value the calendar can hold, across all modes. */
export type CalendarSelectionValue = Date | Date[] | DateRange | undefined;

type CalendarSingleSelectionProps = {
  /** Selection mode. Default `"single"`. Discriminates the `value` types. */
  mode?: "single";
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (value: Date | undefined) => void;
  max?: never;
  minRangeDays?: never;
  maxRangeDays?: never;
};

type CalendarMultipleSelectionProps = {
  mode: "multiple";
  value?: Date[];
  defaultValue?: Date[];
  onValueChange?: (value: Date[]) => void;
  /** Maximum number of selected days; further clicks no-op. */
  max?: number;
  minRangeDays?: never;
  maxRangeDays?: never;
};

type CalendarRangeSelectionProps = {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange | undefined) => void;
  max?: never;
  /** Minimum range span in days (inclusive of both ends). */
  minRangeDays?: number;
  /** Maximum range span in days (inclusive of both ends). */
  maxRangeDays?: number;
};

export type CalendarSelectionProps =
  | CalendarSingleSelectionProps
  | CalendarMultipleSelectionProps
  | CalendarRangeSelectionProps;

export interface CalendarCommonProps
  extends
    CalendarVariantProps,
    Omit<
      ComponentPropsWithRef<"div">,
      "defaultValue" | "onSelect" | "children" | "hidden"
    > {
  /** When false (default), clicking the selected day deselects it. */
  required?: boolean;

  /** Controlled visible month (any day within it). */
  month?: Date;
  /** Default visible month: the selected value's month, else today. */
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  /** Months rendered side by side. Default 1, capped at 3. */
  numberOfMonths?: number;
  /** Navigation + selection lower bound. */
  minDate?: Date;
  /** Navigation + selection upper bound. */
  maxDate?: Date;
  /** Disabled days (distinct from min/max): focusable but not selectable. */
  disabled?: DateMatcher | DateMatcher[];
  /** Days rendered blank. */
  hidden?: DateMatcher | DateMatcher[];

  /** BCP 47 locale tag. Default: runtime locale. */
  locale?: string;
  /** 0 = Sunday … 6 = Saturday. Default: locale's `Intl` week info. */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Weekday header label format. Default `"short"`. */
  weekdayFormat?: "long" | "short" | "narrow";

  /** Show trailing/leading days of adjacent months. Default true. */
  showOutsideDays?: boolean;
  /** Always 6 rows for stable height across months. Default false. */
  fixedWeeks?: boolean;
  /** Show an ISO week number column. Default false. */
  showWeekNumbers?: boolean;
  /** Month/year title vs select dropdowns. Default `"label"`. */
  captionLayout?: "label" | "dropdowns";
  /** Dropdown year range lower bound. Default: today's year - 100. */
  fromYear?: number;
  /** Dropdown year range upper bound. Default: today's year + 100. */
  toYear?: number;

  /** Per-day custom render (dots, prices, tooltips). */
  renderDay?: (day: Date, state: CalendarDayState) => ReactNode;
  /**
   * Today's date override — required for deterministic tests/SSR snapshots.
   * Default: `new Date()` computed once on mount.
   */
  today?: Date;
}

export type CalendarBaseProps = CalendarCommonProps & CalendarSelectionProps;

export type CalendarProps = CalendarBaseProps;
