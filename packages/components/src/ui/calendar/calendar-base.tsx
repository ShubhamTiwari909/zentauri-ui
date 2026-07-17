"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { getCachedDateTimeFormat } from "../../hooks/useDateTimeFormat";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";

import {
  addDays,
  addMonths,
  addYears,
  buildMonthGrid,
  clampDate,
  differenceInDays,
  getDayNumber,
  getDefaultFirstDayOfWeek,
  getMonthName,
  getWeekdayNames,
  getYearLabel,
  isAfter,
  isBefore,
  isBetween,
  isSameDay,
  isSameMonth,
  matchesDate,
  startOfDay,
  startOfMonth,
  toIsoDateString,
  type DateRange,
} from "./date-utils";
import type {
  CalendarBaseProps,
  CalendarDayState,
  CalendarSelectionValue,
} from "./types";
import {
  calendarCaptionVariants,
  calendarDayCellVariants,
  calendarDayVariants,
  calendarDropdownVariants,
  calendarGridVariants,
  calendarHeaderVariants,
  calendarMonthVariants,
  calendarMonthsVariants,
  calendarNavButtonVariants,
  calendarVariants,
  calendarWeekNumberVariants,
  calendarWeekdayVariants,
} from "./variants";

function resolveLocale(locale?: string): string {
  if (locale) return locale;
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return "en-US";
}

function selectionMonthAnchor(value: CalendarSelectionValue): Date | undefined {
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return value[0];
  if (value && value.from instanceof Date) return value.from;
  return undefined;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      {direction === "left" ? (
        <path d="M10 3.5 5.5 8 10 12.5" />
      ) : (
        <path d="M6 3.5 10.5 8 6 12.5" />
      )}
    </svg>
  );
}

export const CalendarBase = (props: CalendarBaseProps) => {
  const {
    mode = "single",
    value: valueProp,
    defaultValue,
    onValueChange,
    required = false,
    max,
    minRangeDays,
    maxRangeDays,
    month: monthProp,
    defaultMonth,
    onMonthChange,
    numberOfMonths = 1,
    minDate,
    maxDate,
    disabled,
    hidden,
    locale,
    firstDayOfWeek,
    weekdayFormat = "short",
    showOutsideDays = true,
    fixedWeeks = false,
    showWeekNumbers = false,
    captionLayout = "label",
    fromYear,
    toYear,
    renderDay,
    today,
    appearance = "default",
    size = "md",
    className,
    ...rest
  } = props;

  const baseId = useId();
  const resolvedLocale = resolveLocale(locale);
  const monthCount = Math.min(Math.max(1, numberOfMonths), 3);
  // Outside days duplicate in-month cells of adjacent visible months.
  const renderOutsideDays = showOutsideDays && monthCount === 1;

  // "Today" computed once (lazy) so render bodies never call Date.now-like APIs.
  const [fallbackToday] = useState(() => startOfDay(new Date()));
  const resolvedToday = useMemo(
    () => startOfDay(today ?? fallbackToday),
    [today, fallbackToday],
  );

  const [value, setValue] = useControllableState<CalendarSelectionValue>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange as
      | ((next: CalendarSelectionValue) => void)
      | undefined,
  });

  const [visibleMonth, setVisibleMonth] = useControllableState<Date>({
    value: monthProp ? startOfMonth(monthProp) : undefined,
    defaultValue: startOfMonth(
      defaultMonth ??
        selectionMonthAnchor(defaultValue ?? valueProp) ??
        resolvedToday,
    ),
    onChange: onMonthChange,
  });

  const [focusDate, setFocusDate] = useState<Date>(() =>
    startOfDay(
      selectionMonthAnchor(defaultValue ?? valueProp) ?? resolvedToday,
    ),
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const dayRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const focusRequested = useRef(false);

  const fdow = useMemo(
    () => firstDayOfWeek ?? getDefaultFirstDayOfWeek(resolvedLocale),
    [firstDayOfWeek, resolvedLocale],
  );

  // Formatters are constructed once per locale via the module-level cache —
  // never inside the day-cell render path.
  const captionFormatter = useMemo(
    () =>
      getCachedDateTimeFormat(resolvedLocale, {
        month: "long",
        year: "numeric",
      }),
    [resolvedLocale],
  );
  const dayLabelFormatter = useMemo(
    () => getCachedDateTimeFormat(resolvedLocale, { dateStyle: "full" }),
    [resolvedLocale],
  );
  const weekdayNames = useMemo(
    () => getWeekdayNames(resolvedLocale, weekdayFormat, fdow),
    [resolvedLocale, weekdayFormat, fdow],
  );
  const weekdayLongNames = useMemo(
    () => getWeekdayNames(resolvedLocale, "long", fdow),
    [resolvedLocale, fdow],
  );

  const visibleMonths = useMemo(() => {
    const months: Date[] = [];
    for (let i = 0; i < monthCount; i += 1) {
      months.push(addMonths(visibleMonth, i));
    }
    return months;
  }, [visibleMonth, monthCount]);

  const firstVisible = visibleMonths[0] as Date;
  const lastVisible = visibleMonths[visibleMonths.length - 1] as Date;

  const range = mode === "range" ? (value as DateRange | undefined) : undefined;
  const rangePending = Boolean(range?.from && !range?.to);

  const isDayDisabled = (day: Date): boolean => {
    if (minDate && isBefore(day, minDate)) return true;
    if (maxDate && isAfter(day, maxDate)) return true;
    if (disabled && matchesDate(day, disabled)) return true;
    if (rangePending && range?.from && (minRangeDays || maxRangeDays)) {
      const span = Math.abs(differenceInDays(day, range.from)) + 1;
      if (minRangeDays && span < minRangeDays) return true;
      if (maxRangeDays && span > maxRangeDays) return true;
    }
    return false;
  };

  const isDayHidden = (day: Date): boolean =>
    Boolean(hidden && matchesDate(day, hidden));

  const multipleValue =
    mode === "multiple" && Array.isArray(value) ? value : undefined;
  const selectionFull = Boolean(
    mode === "multiple" &&
    max !== undefined &&
    (multipleValue?.length ?? 0) >= max,
  );

  // While a range's second date is pending, hovering paints a preview.
  const previewRange = useMemo((): DateRange | undefined => {
    if (mode !== "range") return undefined;
    if (range?.from && range.to) return range;
    if (
      range?.from &&
      hoverDate &&
      !isSameDay(hoverDate, range.from) &&
      !rangePendingHoverDisabled(hoverDate)
    ) {
      return isBefore(hoverDate, range.from)
        ? { from: hoverDate, to: range.from }
        : { from: range.from, to: hoverDate };
    }
    return range;
  }, [mode, range, hoverDate, minRangeDays, maxRangeDays]);

  function rangePendingHoverDisabled(day: Date): boolean {
    if (!range?.from || !(minRangeDays || maxRangeDays)) return false;
    const span = Math.abs(differenceInDays(day, range.from)) + 1;
    if (minRangeDays && span < minRangeDays) return true;
    if (maxRangeDays && span > maxRangeDays) return true;
    return false;
  }

  const getDayState = (day: Date, monthDate: Date): CalendarDayState => {
    const isOutside = !isSameMonth(day, monthDate);
    const isDisabled = isDayDisabled(day);
    const isHidden = isDayHidden(day);

    let isSelected = false;
    let isRangeStart = false;
    let isRangeEnd = false;
    let isRangeMiddle = false;

    if (mode === "single") {
      isSelected = value instanceof Date && isSameDay(value, day);
    } else if (mode === "multiple") {
      isSelected = Boolean(multipleValue?.some((d) => isSameDay(d, day)));
    } else {
      const from = previewRange?.from;
      const to = previewRange?.to;
      isRangeStart = Boolean(from && isSameDay(day, from));
      isRangeEnd = Boolean(
        (to && isSameDay(day, to)) || (!to && from && isSameDay(day, from)),
      );
      isRangeMiddle = Boolean(
        from &&
        to &&
        isBetween(day, from, to) &&
        !isSameDay(day, from) &&
        !isSameDay(day, to),
      );
      isSelected = isRangeStart || isRangeEnd || isRangeMiddle;
    }

    return {
      isSelected,
      isRangeStart,
      isRangeEnd,
      isRangeMiddle,
      isToday: isSameDay(day, resolvedToday),
      isOutside,
      isDisabled,
      isHidden,
      isFocused: isSameDay(day, focusDate),
    };
  };

  const selectDay = (day: Date) => {
    if (isDayDisabled(day)) return;

    if (mode === "single") {
      if (value instanceof Date && isSameDay(value, day) && !required) {
        setValue(undefined);
      } else {
        setValue(day);
      }
    } else if (mode === "multiple") {
      const current = multipleValue ?? [];
      const already = current.some((d) => isSameDay(d, day));
      if (already) {
        if (!(required && current.length === 1)) {
          setValue(current.filter((d) => !isSameDay(d, day)));
        }
      } else {
        if (max !== undefined && current.length >= max) return;
        setValue([...current, day]);
      }
    } else {
      if (!range?.from || range.to) {
        setValue({ from: day, to: undefined });
      } else {
        let from = range.from;
        let to = day;
        if (isBefore(to, from)) {
          [from, to] = [to, from];
        }
        const span = differenceInDays(to, from) + 1;
        if (minRangeDays && span < minRangeDays) return;
        if (maxRangeDays && span > maxRangeDays) return;
        setValue({ from, to });
        setHoverDate(null);
      }
    }
    setFocusDate(startOfDay(day));
  };

  const navigateMonths = (delta: number) => {
    const next = startOfMonth(addMonths(visibleMonth, delta));
    setVisibleMonth(next);
    // Keep the roving-tabindex day inside the new window.
    if (!isBetween(focusDate, next, addDays(addMonths(next, monthCount), -1))) {
      setFocusDate(clampDate(addMonths(focusDate, delta), minDate, maxDate));
    }
  };

  const goToMonth = (next: Date | ((prev: Date) => Date)) => {
    // Resolve eagerly: nesting setFocusDate inside a state updater would run
    // it during render if the updater were ever deferred to React.
    const target = startOfMonth(
      typeof next === "function" ? next(visibleMonth) : next,
    );
    setVisibleMonth(target);
    if (
      !isBetween(focusDate, target, addDays(addMonths(target, monthCount), -1))
    ) {
      setFocusDate(clampDate(target, minDate, maxDate));
    }
  };

  const moveFocus = (next: Date) => {
    const clamped = clampDate(startOfDay(next), minDate, maxDate);
    setFocusDate(clamped);
    focusRequested.current = true;
    const windowStart = startOfMonth(firstVisible);
    const windowEnd = addDays(
      addMonths(startOfMonth(firstVisible), monthCount),
      -1,
    );
    if (!isBetween(clamped, windowStart, windowEnd)) {
      setVisibleMonth(startOfMonth(clamped));
    }
  };

  useEffect(() => {
    if (!focusRequested.current) return;
    focusRequested.current = false;
    dayRefs.current
      .get(toIsoDateString(focusDate))
      ?.focus({ preventScroll: true });
  });

  const handleDayKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    day: Date,
  ) => {
    let next: Date | null = null;
    switch (event.key) {
      case "ArrowLeft":
        next = addDays(day, -1);
        break;
      case "ArrowRight":
        next = addDays(day, 1);
        break;
      case "ArrowUp":
        next = addDays(day, -7);
        break;
      case "ArrowDown":
        next = addDays(day, 7);
        break;
      case "Home":
        next = addDays(day, -((day.getDay() - fdow + 7) % 7));
        break;
      case "End":
        next = addDays(day, 6 - ((day.getDay() - fdow + 7) % 7));
        break;
      case "PageUp":
        next = event.shiftKey ? addYears(day, -1) : addMonths(day, -1);
        break;
      case "PageDown":
        next = event.shiftKey ? addYears(day, 1) : addMonths(day, 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectDay(day);
        return;
      default:
        return;
    }
    event.preventDefault();
    moveFocus(next);
  };

  // Exactly one day button keeps tabIndex=0 (roving tabindex).
  const focusTarget = useMemo(() => {
    const windowStart = startOfMonth(firstVisible);
    const windowEnd = addDays(addMonths(windowStart, monthCount), -1);
    if (isBetween(focusDate, windowStart, windowEnd)) return focusDate;
    const anchor = selectionMonthAnchor(value);
    if (anchor && isBetween(anchor, windowStart, windowEnd)) {
      return startOfDay(anchor);
    }
    if (isBetween(resolvedToday, windowStart, windowEnd)) return resolvedToday;
    return windowStart;
  }, [focusDate, firstVisible, monthCount, value, resolvedToday]);

  const prevDisabled = Boolean(
    minDate && !isAfter(startOfMonth(firstVisible), startOfMonth(minDate)),
  );
  const nextDisabled = Boolean(
    maxDate && !isBefore(startOfMonth(lastVisible), startOfMonth(maxDate)),
  );

  const dropdownYears = useMemo(() => {
    const start = fromYear ?? resolvedToday.getFullYear() - 100;
    const end = toYear ?? resolvedToday.getFullYear() + 100;
    const years: number[] = [];
    for (let y = start; y <= end; y += 1) years.push(y);
    return years;
  }, [fromYear, toYear, resolvedToday]);

  const monthLabels = useMemo(() => {
    const labels: string[] = [];
    for (let m = 0; m < 12; m += 1) {
      labels.push(
        getMonthName(
          resolvedLocale,
          new Date(resolvedToday.getFullYear(), m, 1),
        ),
      );
    }
    return labels;
  }, [resolvedLocale, resolvedToday]);

  const renderCaption = (monthDate: Date, monthIndex: number): ReactNode => {
    const captionId = `${baseId}-caption-${monthIndex}`;
    if (captionLayout === "dropdowns" && monthIndex === 0) {
      return (
        <div className={calendarCaptionVariants()} data-slot="calendar-caption">
          <select
            data-slot="calendar-month-dropdown"
            aria-label="Month"
            className={calendarDropdownVariants()}
            value={monthDate.getMonth()}
            onChange={(event) =>
              goToMonth(
                (prev) =>
                  new Date(prev.getFullYear(), Number(event.target.value), 1),
              )
            }
          >
            {monthLabels.map((label, m) => (
              <option key={label} value={m}>
                {label}
              </option>
            ))}
          </select>
          <select
            data-slot="calendar-year-dropdown"
            aria-label="Year"
            className={calendarDropdownVariants()}
            value={monthDate.getFullYear()}
            onChange={(event) =>
              goToMonth(
                (prev) =>
                  new Date(Number(event.target.value), prev.getMonth(), 1),
              )
            }
          >
            {dropdownYears.map((year) => (
              <option key={year} value={year}>
                {getYearLabel(resolvedLocale, new Date(year, 0, 1))}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return (
      <div
        id={captionId}
        className={calendarCaptionVariants()}
        data-slot="calendar-caption"
        aria-live="polite"
      >
        {captionFormatter.format(monthDate)}
      </div>
    );
  };

  return (
    <div
      className={cn(calendarVariants({ size }), className)}
      data-slot="calendar"
      data-mode={mode}
      data-selection-full={selectionFull ? "true" : undefined}
      {...rest}
    >
      <div
        className={calendarMonthsVariants()}
        data-slot="calendar-months"
        onMouseLeave={() => setHoverDate(null)}
      >
        {visibleMonths.map((monthDate, monthIndex) => {
          const weeks = buildMonthGrid({
            month: monthDate,
            firstDayOfWeek: fdow,
            fixedWeeks,
          });
          const captionId = `${baseId}-caption-${monthIndex}`;
          const usesDropdowns =
            captionLayout === "dropdowns" && monthIndex === 0;

          return (
            <div
              key={toIsoDateString(startOfMonth(monthDate))}
              className={calendarMonthVariants()}
              data-slot="calendar-month"
            >
              <div
                className={calendarHeaderVariants()}
                data-slot="calendar-header"
              >
                {monthIndex === 0 ? (
                  <button
                    type="button"
                    data-slot="calendar-prev-button"
                    className={calendarNavButtonVariants()}
                    aria-label={`Go to ${captionFormatter.format(addMonths(firstVisible, -1))}`}
                    disabled={prevDisabled}
                    onClick={() => navigateMonths(-1)}
                  >
                    <ChevronIcon direction="left" />
                  </button>
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-block size-[var(--zui-calendar-nav-size,2rem)]"
                  />
                )}
                {renderCaption(monthDate, monthIndex)}
                {monthIndex === monthCount - 1 ? (
                  <button
                    type="button"
                    data-slot="calendar-next-button"
                    className={calendarNavButtonVariants()}
                    aria-label={`Go to ${captionFormatter.format(addMonths(lastVisible, 1))}`}
                    disabled={nextDisabled}
                    onClick={() => navigateMonths(1)}
                  >
                    <ChevronIcon direction="right" />
                  </button>
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-block size-[var(--zui-calendar-nav-size,2rem)]"
                  />
                )}
              </div>

              <table
                role="grid"
                className={calendarGridVariants()}
                data-slot="calendar-grid"
                aria-labelledby={usesDropdowns ? undefined : captionId}
                aria-label={
                  usesDropdowns ? captionFormatter.format(monthDate) : undefined
                }
              >
                <thead data-slot="calendar-weekdays">
                  <tr>
                    {showWeekNumbers ? (
                      <th
                        scope="col"
                        className={calendarWeekdayVariants()}
                        data-slot="calendar-weekday"
                      >
                        <span className="sr-only">Week</span>
                        <span aria-hidden="true">#</span>
                      </th>
                    ) : null}
                    {weekdayNames.map((name, i) => (
                      <th
                        // Narrow labels repeat ("S", "T"), so the key needs the index.
                        key={`${i}-${name}`}
                        scope="col"
                        abbr={weekdayLongNames[i]}
                        className={calendarWeekdayVariants()}
                        data-slot="calendar-weekday"
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeks.map((week) => (
                    <tr
                      key={`w-${toIsoDateString(week.days[0] as Date)}`}
                      data-slot="calendar-week"
                    >
                      {showWeekNumbers ? (
                        <td
                          className={calendarWeekNumberVariants()}
                          data-slot="calendar-week-number"
                        >
                          {week.weekNumber}
                        </td>
                      ) : null}
                      {week.days.map((day) => {
                        const state = getDayState(day, monthDate);
                        const dayKey = toIsoDateString(day);

                        if (
                          state.isHidden ||
                          (state.isOutside && !renderOutsideDays)
                        ) {
                          return (
                            <td
                              key={dayKey}
                              className={calendarDayCellVariants()}
                              data-slot="calendar-day"
                            />
                          );
                        }

                        const isFocusTarget =
                          !state.isOutside && isSameDay(day, focusTarget);

                        return (
                          <td
                            key={dayKey}
                            className={calendarDayCellVariants()}
                            data-slot="calendar-day"
                            aria-selected={state.isSelected || undefined}
                          >
                            <button
                              type="button"
                              data-slot="calendar-day-button"
                              ref={(node) => {
                                if (state.isOutside) return;
                                if (node) {
                                  dayRefs.current.set(dayKey, node);
                                } else {
                                  dayRefs.current.delete(dayKey);
                                }
                              }}
                              className={calendarDayVariants({
                                appearance,
                                size,
                              })}
                              tabIndex={isFocusTarget ? 0 : -1}
                              aria-label={dayLabelFormatter.format(day)}
                              aria-disabled={state.isDisabled || undefined}
                              aria-current={state.isToday ? "date" : undefined}
                              data-selected={
                                state.isSelected ? "true" : undefined
                              }
                              data-today={state.isToday ? "true" : undefined}
                              data-outside={
                                state.isOutside ? "true" : undefined
                              }
                              data-disabled={
                                state.isDisabled ? "true" : undefined
                              }
                              data-range-start={
                                state.isRangeStart ? "true" : undefined
                              }
                              data-range-end={
                                state.isRangeEnd ? "true" : undefined
                              }
                              data-range-middle={
                                state.isRangeMiddle ? "true" : undefined
                              }
                              onClick={() => selectDay(day)}
                              onKeyDown={(event) =>
                                handleDayKeyDown(event, day)
                              }
                              onMouseEnter={
                                mode === "range" && rangePending
                                  ? () => setHoverDate(startOfDay(day))
                                  : undefined
                              }
                            >
                              {renderDay
                                ? renderDay(day, state)
                                : getDayNumber(resolvedLocale, day)}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CalendarBase.displayName = "Calendar";
