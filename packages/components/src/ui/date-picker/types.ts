import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ComponentType } from "react";

import type { CalendarBaseProps, CalendarCommonProps } from "../calendar/types";
import type { DateMatcher, DateRange } from "../calendar/date-utils";
import type { datePickerTriggerVariants } from "./variants";

export type { DateRange };

export type DatePickerVariantProps = VariantProps<
  typeof datePickerTriggerVariants
>;

export type DatePickerAppearance = NonNullable<
  DatePickerVariantProps["appearance"]
>;
export type DatePickerSize = NonNullable<DatePickerVariantProps["size"]>;

/** Calendar props threaded through the picker unchanged. */
export type DatePickerCalendarProps = Pick<
  CalendarCommonProps,
  | "locale"
  | "firstDayOfWeek"
  | "minDate"
  | "maxDate"
  | "numberOfMonths"
  | "captionLayout"
  | "showOutsideDays"
  | "fixedWeeks"
  | "today"
  | "fromYear"
  | "toYear"
  | "weekdayFormat"
>;

type DatePickerSingleSelectionProps = {
  /** Selection mode (no "multiple" — the calendar covers it inline). */
  mode?: "single";
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (value: Date | undefined) => void;
};

type DatePickerRangeSelectionProps = {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange | undefined) => void;
};

export type DatePickerSelectionProps =
  | DatePickerSingleSelectionProps
  | DatePickerRangeSelectionProps;

export type DatePickerSelectionValue = Date | DateRange | undefined;

export interface DatePickerCommonProps
  extends
    DatePickerVariantProps,
    DatePickerCalendarProps,
    Omit<
      ComponentPropsWithRef<"button">,
      "value" | "defaultValue" | "onChange" | "disabled" | "name" | "children"
    > {
  /** Intl options for the trigger text. Default `{ dateStyle: "medium" }`. */
  formatOptions?: Intl.DateTimeFormatOptions;
  /** Trigger text when nothing is selected. */
  placeholder?: string;
  /**
   * Close the popover on selection. Default true: single closes on pick,
   * range closes once `to` is set.
   */
  closeOnSelect?: boolean;
  /** Show a clear affordance in the trigger. Default false. */
  clearable?: boolean;
  /** Whole-control disabled (the calendar day matcher is `disabledDates`). */
  disabled?: boolean;
  /** Day matcher threaded to the calendar's `disabled` prop. */
  disabledDates?: DateMatcher | DateMatcher[];
  /** Renders hidden input(s) with local `yyyy-MM-dd` value(s) for form posts. */
  name?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * @internal Swaps the embedded calendar implementation — used by the
   * animated entry to inject `CalendarAnimated` without pulling framer-motion
   * into this static entry.
   */
  calendarComponent?: ComponentType<CalendarBaseProps>;
}

export type DatePickerBaseProps = DatePickerCommonProps &
  DatePickerSelectionProps;

export type DatePickerProps = DatePickerBaseProps;
