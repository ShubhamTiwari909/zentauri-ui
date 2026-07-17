"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { getCachedDateTimeFormat } from "../../hooks/useDateTimeFormat";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover/popover-base";
import { CalendarBase } from "../calendar/calendar-base";
import {
  isSameMonth,
  startOfDay,
  startOfMonth,
  toIsoDateString,
} from "../calendar/date-utils";
import type { DateRange } from "../calendar/date-utils";
import type { DatePickerBaseProps, DatePickerSelectionValue } from "./types";
import {
  datePickerClearButtonVariants,
  datePickerContentVariants,
  datePickerIconVariants,
  datePickerTriggerVariants,
} from "./variants";

function resolveLocale(locale?: string): string {
  if (locale) return locale;
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return "en-US";
}

/**
 * Grid math is always Gregorian, so the trigger's formatted text must match
 * it — otherwise a locale whose default calendar system is non-Gregorian
 * would show a different month/year/day than what the grid displayed for
 * the exact same `Date`. Callers can still opt into another `calendar` via
 * an explicit `formatOptions.calendar`.
 */
function resolveFormatOptions(
  formatOptions: Intl.DateTimeFormatOptions | undefined,
): Intl.DateTimeFormatOptions {
  return formatOptions
    ? { calendar: "gregory", ...formatOptions }
    : { calendar: "gregory", dateStyle: "medium" };
}

function CalendarGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={datePickerIconVariants()}
    >
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" />
    </svg>
  );
}

export const DatePickerBase = (props: DatePickerBaseProps) => {
  const {
    mode = "single",
    value: valueProp,
    defaultValue,
    onValueChange,
    formatOptions,
    placeholder = "Pick a date",
    closeOnSelect = true,
    clearable = false,
    disabled = false,
    disabledDates,
    name,
    open,
    defaultOpen = false,
    onOpenChange,
    locale,
    firstDayOfWeek,
    minDate,
    maxDate,
    numberOfMonths,
    captionLayout,
    showOutsideDays,
    fixedWeeks,
    today,
    fromYear,
    toYear,
    weekdayFormat,
    appearance = "default",
    size = "md",
    className,
    ref,
    onKeyDown,
    calendarComponent,
    ...rest
  } = props;

  const CalendarComponent = calendarComponent ?? CalendarBase;

  const resolvedLocale = resolveLocale(locale);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentWrapRef = useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useControllableState<DatePickerSelectionValue>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange as
      | ((next: DatePickerSelectionValue) => void)
      | undefined,
  });

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  // On open, move focus to the roving-tabindex day inside the grid.
  useEffect(() => {
    if (!isOpen) return;
    contentWrapRef.current
      ?.querySelector<HTMLButtonElement>(
        '[data-slot="calendar-day-button"][tabindex="0"]',
      )
      ?.focus({ preventScroll: true });
  }, [isOpen]);

  const formatter = useMemo(
    () =>
      getCachedDateTimeFormat(
        resolvedLocale,
        resolveFormatOptions(formatOptions),
      ),
    [resolvedLocale, formatOptions],
  );

  const singleValue =
    mode === "single" && value instanceof Date ? value : undefined;
  const rangeValue =
    mode === "range" && value && !(value instanceof Date)
      ? (value as DateRange)
      : undefined;

  const isEmpty = mode === "single" ? !singleValue : !rangeValue?.from;
  const anchorMonth = mode === "range" ? rangeValue?.from : singleValue;

  const [calendarMonth, setCalendarMonth] = useState<Date | undefined>(() =>
    anchorMonth ? startOfMonth(anchorMonth) : undefined,
  );

  // Keep the calendar's visible month in sync when the picker is CONTROLLED
  // and the consumer updates `value` while the popover stays open — without
  // this, the calendar (only unmounted/remounted on open/close, not on every
  // value change) would keep showing whatever month it last displayed.
  useEffect(() => {
    if (valueProp === undefined || !anchorMonth) return;
    setCalendarMonth((prev) =>
      prev && isSameMonth(prev, anchorMonth) ? prev : startOfMonth(anchorMonth),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp, anchorMonth?.getTime()]);

  const displayValue = useMemo(() => {
    if (singleValue) {
      return formatter.format(singleValue);
    }
    if (rangeValue?.from) {
      if (rangeValue.to) {
        if (typeof formatter.formatRange === "function") {
          return formatter.formatRange(rangeValue.from, rangeValue.to);
        }
        return `${formatter.format(rangeValue.from)} – ${formatter.format(rangeValue.to)}`;
      }
      return formatter.format(rangeValue.from);
    }
    return placeholder;
  }, [singleValue, rangeValue, formatter, placeholder]);

  const closePicker = () => {
    setIsOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  const handleCalendarChange = (next: Date | DateRange | undefined) => {
    setValue(next);
    if (!closeOnSelect) return;
    if (mode === "single" && next instanceof Date) {
      closePicker();
    }
    if (
      mode === "range" &&
      next &&
      !(next instanceof Date) &&
      next.from &&
      next.to
    ) {
      closePicker();
    }
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "ArrowDown" && !isOpen) {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const clear = () => {
    setValue(undefined);
    triggerRef.current?.focus({ preventScroll: true });
  };

  const showClear = clearable && !isEmpty && !disabled;
  const dialogLabel = mode === "range" ? "Choose date range" : "Choose date";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative w-full">
        <PopoverTrigger>
          <button
            type="button"
            ref={(node) => {
              triggerRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                (ref as { current: HTMLButtonElement | null }).current = node;
              }
            }}
            data-slot="date-picker-trigger"
            data-state={isOpen ? "open" : "closed"}
            data-empty={isEmpty ? "true" : undefined}
            disabled={disabled}
            className={cn(
              datePickerTriggerVariants({ appearance, size }),
              showClear && "pr-8",
              className,
            )}
            onKeyDown={handleTriggerKeyDown}
            {...rest}
          >
            <span data-slot="date-picker-value" className="truncate">
              {displayValue}
            </span>
            <CalendarGlyph />
          </button>
        </PopoverTrigger>

        {showClear ? (
          <button
            type="button"
            data-slot="date-picker-clear"
            aria-label="Clear date"
            className={cn(
              datePickerClearButtonVariants(),
              "absolute right-8 top-1/2 z-10 -translate-y-1/2",
            )}
            onClick={clear}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="size-3"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        ) : null}
      </div>

      {name ? (
        mode === "range" ? (
          <>
            <input
              type="hidden"
              name={name}
              value={rangeValue?.from ? toIsoDateString(rangeValue.from) : ""}
            />
            <input
              type="hidden"
              name={`${name}-end`}
              value={rangeValue?.to ? toIsoDateString(rangeValue.to) : ""}
            />
          </>
        ) : (
          <input
            type="hidden"
            name={name}
            value={singleValue ? toIsoDateString(singleValue) : ""}
          />
        )
      ) : null}

      <PopoverContent
        role="dialog"
        aria-label={dialogLabel}
        side="bottom"
        align="start"
        data-slot="date-picker-content"
        className={cn(datePickerContentVariants(), "w-max")}
      >
        <div ref={contentWrapRef} data-slot="date-picker-calendar">
          {mode === "range" ? (
            <CalendarComponent
              mode="range"
              value={rangeValue}
              onValueChange={handleCalendarChange}
              appearance={appearance}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabledDates}
              numberOfMonths={numberOfMonths}
              captionLayout={captionLayout}
              showOutsideDays={showOutsideDays}
              fixedWeeks={fixedWeeks}
              today={today}
              fromYear={fromYear}
              toYear={toYear}
              weekdayFormat={weekdayFormat}
              defaultMonth={rangeValue?.from}
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
            />
          ) : (
            <CalendarComponent
              mode="single"
              value={singleValue}
              onValueChange={handleCalendarChange}
              appearance={appearance}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabledDates}
              numberOfMonths={numberOfMonths}
              captionLayout={captionLayout}
              showOutsideDays={showOutsideDays}
              fixedWeeks={fixedWeeks}
              today={today}
              fromYear={fromYear}
              toYear={toYear}
              weekdayFormat={weekdayFormat}
              defaultMonth={singleValue}
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

DatePickerBase.displayName = "DatePicker";

/** Re-exported for consumers building custom triggers around the same value. */
export function formatDatePickerValue(
  value: DatePickerSelectionValue,
  locale?: string,
  formatOptions?: Intl.DateTimeFormatOptions,
): string {
  const formatter = getCachedDateTimeFormat(
    resolveLocale(locale),
    resolveFormatOptions(formatOptions),
  );
  if (value instanceof Date) return formatter.format(startOfDay(value));
  if (value?.from && value.to) {
    if (typeof formatter.formatRange === "function") {
      return formatter.formatRange(value.from, value.to);
    }
    return `${formatter.format(value.from)} – ${formatter.format(value.to)}`;
  }
  if (value?.from) return formatter.format(value.from);
  return "";
}
