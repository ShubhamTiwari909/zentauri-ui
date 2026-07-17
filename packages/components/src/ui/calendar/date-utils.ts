import { getCachedDateTimeFormat } from "../../hooks/useDateTimeFormat";

/**
 * Pure date math + Intl helpers backing the calendar and date-picker.
 * All functions treat days as local-midnight `Date` objects; time-of-day is
 * normalized away and no function ever mutates its input.
 */

const MS_PER_DAY = 86_400_000;

/**
 * Builds a local-midnight `Date` without the `new Date(year, ...)`
 * constructor's special-casing of two-digit years (0-99 silently become
 * 1900-1999). `setFullYear` has no such special case.
 */
export function makeDate(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setFullYear(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function startOfDay(d: Date): Date {
  return makeDate(d.getFullYear(), d.getMonth(), d.getDate());
}

export function startOfMonth(d: Date): Date {
  return makeDate(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(d: Date): Date {
  return makeDate(d.getFullYear(), d.getMonth() + 1, 0);
}

export function addDays(d: Date, n: number): Date {
  return makeDate(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

/** Month arithmetic that clamps the day-of-month: Jan 31 + 1mo = Feb 28/29. */
export function addMonths(d: Date, n: number): Date {
  const firstOfTarget = makeDate(d.getFullYear(), d.getMonth() + n, 1);
  const daysInTarget = makeDate(
    firstOfTarget.getFullYear(),
    firstOfTarget.getMonth() + 1,
    0,
  ).getDate();
  return makeDate(
    firstOfTarget.getFullYear(),
    firstOfTarget.getMonth(),
    Math.min(d.getDate(), daysInTarget),
  );
}

export function addYears(d: Date, n: number): Date {
  return addMonths(d, n * 12);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Day-granular strict "before". */
export function isBefore(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

/** Day-granular strict "after". */
export function isAfter(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

/** Inclusive day-granular between. */
export function isBetween(d: Date, start: Date, end: Date): boolean {
  const t = startOfDay(d).getTime();
  return t >= startOfDay(start).getTime() && t <= startOfDay(end).getTime();
}

/** Whole days from `b` to `a` (positive when `a` is later). DST-safe via rounding. */
export function differenceInDays(a: Date, b: Date): number {
  return Math.round(
    (startOfDay(a).getTime() - startOfDay(b).getTime()) / MS_PER_DAY,
  );
}

export function clampDate(d: Date, min?: Date, max?: Date): Date {
  if (min && isBefore(d, min)) return startOfDay(min);
  if (max && isAfter(d, max)) return startOfDay(max);
  return d;
}

/** Local-date `yyyy-MM-dd` (never `toISOString()`, which shifts across timezones). */
export function toIsoDateString(d: Date): string {
  const year = `${d.getFullYear()}`.padStart(4, "0");
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export interface CalendarWeek {
  weekNumber: number;
  /** Always 7 local-midnight days. */
  days: Date[];
}

/** ISO 8601 week number of the ISO week containing `d`. */
function isoWeekNumber(d: Date): number {
  const date = startOfDay(d);
  // Shift to the Thursday of this date's Monday-based week.
  const dayNumber = (date.getDay() + 6) % 7;
  const thursday = addDays(date, 3 - dayNumber);
  const firstThursdayRef = makeDate(thursday.getFullYear(), 0, 4);
  const firstThursday = addDays(
    firstThursdayRef,
    3 - ((firstThursdayRef.getDay() + 6) % 7),
  );
  return 1 + Math.round(differenceInDays(thursday, firstThursday) / 7);
}

/**
 * Builds the visible week rows for the month containing `month`.
 * The grid starts on the `firstDayOfWeek`-aligned week containing the 1st and
 * covers the whole month (6 rows when `fixedWeeks` for stable height).
 */
export function buildMonthGrid(params: {
  /** Any day in the target month. */
  month: Date;
  /** 0 = Sunday … 6 = Saturday. */
  firstDayOfWeek: number;
  /** Always render 6 rows (stable height across months). */
  fixedWeeks?: boolean;
}): CalendarWeek[] {
  const { month, firstDayOfWeek, fixedWeeks = false } = params;
  const first = startOfMonth(month);
  const leadingDays = (first.getDay() - firstDayOfWeek + 7) % 7;
  const gridStart = addDays(first, -leadingDays);
  const weekCount = fixedWeeks
    ? 6
    : Math.ceil((leadingDays + endOfMonth(month).getDate()) / 7);

  const weeks: CalendarWeek[] = [];
  for (let w = 0; w < weekCount; w += 1) {
    const days: Date[] = [];
    for (let d = 0; d < 7; d += 1) {
      days.push(addDays(gridStart, w * 7 + d));
    }
    // Week number of the ISO week containing this row's Thursday.
    const isoAnchor = days.find((day) => day.getDay() === 4) ?? days[0]!;
    weeks.push({ weekNumber: isoWeekNumber(isoAnchor), days });
  }
  return weeks;
}

function resolveLocale(locale: string | undefined): string {
  if (locale) return locale;
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return "en-US";
}

/** 2024-01-07 is a Sunday; formatting 7 consecutive days yields Sun…Sat labels. */
const REFERENCE_SUNDAY = { year: 2024, month: 0, day: 7 };

/**
 * Grid math is always Gregorian, so every label formatter forces
 * `calendar: "gregory"` — otherwise a locale whose default calendar system
 * is non-Gregorian (e.g. Islamic, Buddhist, Japanese era) would label a
 * Gregorian month grid with unrelated month/year/day values. Locale
 * numbering systems (Arabic-Indic digits, etc.) are unaffected.
 */
const GRID_CALENDAR = "gregory" as const;

/** Localized weekday labels rotated so index 0 is `firstDayOfWeek`. */
export function getWeekdayNames(
  locale: string | undefined,
  format: "long" | "short" | "narrow",
  firstDayOfWeek: number,
): string[] {
  const formatter = getCachedDateTimeFormat(resolveLocale(locale), {
    weekday: format,
    calendar: GRID_CALENDAR,
  });
  const sundayFirst: string[] = [];
  for (let i = 0; i < 7; i += 1) {
    sundayFirst.push(
      formatter.format(
        makeDate(
          REFERENCE_SUNDAY.year,
          REFERENCE_SUNDAY.month,
          REFERENCE_SUNDAY.day + i,
        ),
      ),
    );
  }
  return sundayFirst.map(
    (_, i) => sundayFirst[(i + firstDayOfWeek) % 7] as string,
  );
}

export function getMonthName(
  locale: string | undefined,
  month: Date,
  format: "long" | "short" = "long",
): string {
  return getCachedDateTimeFormat(resolveLocale(locale), {
    month: format,
    calendar: GRID_CALENDAR,
  }).format(month);
}

/** Localized year label — respects the locale's numbering system. */
export function getYearLabel(locale: string | undefined, month: Date): string {
  return getCachedDateTimeFormat(resolveLocale(locale), {
    year: "numeric",
    calendar: GRID_CALENDAR,
  }).format(month);
}

/** Localized day-of-month digits — "17" or "١٧" depending on numbering system. */
export function getDayNumber(locale: string | undefined, day: Date): string {
  return getCachedDateTimeFormat(resolveLocale(locale), {
    day: "numeric",
    calendar: GRID_CALENDAR,
  }).format(day);
}

type IntlWeekInfo = { firstDay?: number };
type IntlLocaleWithWeekInfo = Intl.Locale & {
  getWeekInfo?: () => IntlWeekInfo;
  weekInfo?: IntlWeekInfo;
};

/**
 * Locale-default first day of week as 0 = Sunday … 6 = Saturday.
 * Feature-detects both the `getWeekInfo()` method (newer) and the `weekInfo`
 * property (older); falls back to 0 (Sunday). Never throws.
 */
export function getDefaultFirstDayOfWeek(locale?: string): number {
  try {
    const intlLocale = new Intl.Locale(
      resolveLocale(locale),
    ) as IntlLocaleWithWeekInfo;
    const weekInfo =
      typeof intlLocale.getWeekInfo === "function"
        ? intlLocale.getWeekInfo()
        : intlLocale.weekInfo;
    const firstDay = weekInfo?.firstDay;
    if (typeof firstDay === "number" && firstDay >= 1 && firstDay <= 7) {
      // Intl uses 1 = Monday … 7 = Sunday.
      return firstDay % 7;
    }
  } catch {
    // Older runtimes without Intl.Locale weekInfo support.
  }
  return 0;
}

export type DateRange = { from: Date | undefined; to?: Date | undefined };

/** Any selection value the calendar can hold, across all modes. */
export type CalendarSelectionValue = Date | Date[] | DateRange | undefined;

/** The month a selection value should anchor initial calendar navigation to. */
export function selectionMonthAnchor(
  value: CalendarSelectionValue,
): Date | undefined {
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return value[0];
  if (value && value.from instanceof Date) return value.from;
  return undefined;
}

export type CalendarSelectionMode = "single" | "multiple" | "range";

export type DateMatcher =
  | Date
  | Date[]
  | DateRange
  | { before: Date }
  | { after: Date }
  | { dayOfWeek: number[] }
  | ((date: Date) => boolean);

export function matchesDate(
  date: Date,
  matcher: DateMatcher | DateMatcher[],
): boolean {
  if (!matcher) {
    return false;
  }
  if (Array.isArray(matcher)) {
    return matcher.some((m) => matchesDate(date, m));
  }
  if (matcher instanceof Date) {
    return isSameDay(date, matcher);
  }
  if (typeof matcher === "function") {
    return matcher(date);
  }
  if ("before" in matcher && matcher.before instanceof Date) {
    return isBefore(date, matcher.before);
  }
  if ("after" in matcher && matcher.after instanceof Date) {
    return isAfter(date, matcher.after);
  }
  if ("dayOfWeek" in matcher && Array.isArray(matcher.dayOfWeek)) {
    return matcher.dayOfWeek.includes(date.getDay());
  }
  if ("from" in matcher && matcher.from instanceof Date) {
    return isBetween(date, matcher.from, matcher.to ?? matcher.from);
  }
  return false;
}
