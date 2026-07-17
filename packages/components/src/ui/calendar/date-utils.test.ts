import { describe, expect, it } from "vitest";

import {
  addDays,
  addMonths,
  addYears,
  buildMonthGrid,
  clampDate,
  differenceInDays,
  endOfMonth,
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
} from "./date-utils";

describe("day math", () => {
  it("startOfDay normalizes time-of-day away", () => {
    const d = new Date(2026, 6, 7, 15, 30, 45, 123);
    expect(startOfDay(d).getTime()).toBe(new Date(2026, 6, 7).getTime());
  });

  it("startOfMonth / endOfMonth", () => {
    expect(
      isSameDay(startOfMonth(new Date(2026, 6, 15)), new Date(2026, 6, 1)),
    ).toBe(true);
    expect(
      isSameDay(endOfMonth(new Date(2026, 6, 15)), new Date(2026, 6, 31)),
    ).toBe(true);
    expect(endOfMonth(new Date(2024, 1, 10)).getDate()).toBe(29); // leap Feb
    expect(endOfMonth(new Date(2023, 1, 10)).getDate()).toBe(28);
  });

  it("addDays crosses month and year boundaries", () => {
    expect(
      isSameDay(addDays(new Date(2026, 0, 31), 1), new Date(2026, 1, 1)),
    ).toBe(true);
    expect(
      isSameDay(addDays(new Date(2026, 11, 31), 1), new Date(2027, 0, 1)),
    ).toBe(true);
    expect(
      isSameDay(addDays(new Date(2026, 0, 1), -1), new Date(2025, 11, 31)),
    ).toBe(true);
  });

  it.each([
    // [start, months, expected]
    [new Date(2024, 0, 31), 1, new Date(2024, 1, 29)], // leap-year clamp
    [new Date(2023, 0, 31), 1, new Date(2023, 1, 28)], // non-leap clamp
    [new Date(2026, 2, 31), 1, new Date(2026, 3, 30)],
    [new Date(2026, 6, 15), 12, new Date(2027, 6, 15)],
    [new Date(2026, 6, 31), -1, new Date(2026, 5, 30)],
    [new Date(2024, 1, 29), 12, new Date(2025, 1, 28)], // Feb 29 + 1yr
  ])(
    "addMonths clamps day-of-month (%s + %s months)",
    (start, months, expected) => {
      expect(isSameDay(addMonths(start, months), expected)).toBe(true);
    },
  );

  it("addYears delegates to clamped month math", () => {
    expect(
      isSameDay(addYears(new Date(2024, 1, 29), 1), new Date(2025, 1, 28)),
    ).toBe(true);
  });

  it("comparisons are day-granular", () => {
    const morning = new Date(2026, 6, 7, 1);
    const evening = new Date(2026, 6, 7, 23);
    expect(isBefore(morning, evening)).toBe(false);
    expect(isAfter(evening, morning)).toBe(false);
    expect(isSameDay(morning, evening)).toBe(true);
    expect(isSameMonth(new Date(2026, 6, 1), new Date(2026, 6, 31))).toBe(true);
    expect(isSameMonth(new Date(2026, 6, 1), new Date(2027, 6, 1))).toBe(false);
    expect(
      isBetween(
        new Date(2026, 6, 7),
        new Date(2026, 6, 7),
        new Date(2026, 6, 9),
      ),
    ).toBe(true);
    expect(
      isBetween(
        new Date(2026, 6, 9),
        new Date(2026, 6, 7),
        new Date(2026, 6, 9),
      ),
    ).toBe(true);
    expect(
      isBetween(
        new Date(2026, 6, 10),
        new Date(2026, 6, 7),
        new Date(2026, 6, 9),
      ),
    ).toBe(false);
  });

  it("differenceInDays is DST-safe", () => {
    // Spans the US spring-forward (Mar 8 2026) and fall-back (Nov 1 2026) windows.
    expect(differenceInDays(new Date(2026, 2, 9), new Date(2026, 2, 7))).toBe(
      2,
    );
    expect(differenceInDays(new Date(2026, 10, 2), new Date(2026, 9, 31))).toBe(
      2,
    );
    expect(differenceInDays(new Date(2026, 6, 1), new Date(2026, 6, 8))).toBe(
      -7,
    );
  });

  it("clampDate", () => {
    const min = new Date(2026, 6, 5);
    const max = new Date(2026, 6, 20);
    expect(isSameDay(clampDate(new Date(2026, 6, 1), min, max), min)).toBe(
      true,
    );
    expect(isSameDay(clampDate(new Date(2026, 6, 25), min, max), max)).toBe(
      true,
    );
    expect(
      isSameDay(
        clampDate(new Date(2026, 6, 10), min, max),
        new Date(2026, 6, 10),
      ),
    ).toBe(true);
  });

  it("toIsoDateString uses local getters, never toISOString", () => {
    expect(toIsoDateString(new Date(2026, 6, 7))).toBe("2026-07-07");
    expect(toIsoDateString(new Date(2026, 0, 1, 0, 30))).toBe("2026-01-01");
    // Late-evening local time: toISOString could shift to the next/previous UTC day.
    expect(toIsoDateString(new Date(2026, 6, 7, 23, 59))).toBe("2026-07-07");
  });
});

describe("buildMonthGrid", () => {
  // July 2026 starts on a Wednesday and has 31 days.
  const july2026 = new Date(2026, 6, 1);

  it("covers the whole month with 7-day weeks", () => {
    const weeks = buildMonthGrid({ month: july2026, firstDayOfWeek: 0 });
    expect(weeks).toHaveLength(5);
    for (const week of weeks) {
      expect(week.days).toHaveLength(7);
    }
    expect(weeks[0]!.days[0]!.getDay()).toBe(0);
    expect(isSameDay(weeks[0]!.days[3]!, july2026)).toBe(true); // Wed under index 3
  });

  it.each([0, 1, 6])(
    "aligns the first column to firstDayOfWeek=%s for months starting on every weekday",
    (firstDayOfWeek) => {
      // Jan..Dec 2026 collectively start on every weekday.
      for (let m = 0; m < 12; m += 1) {
        const weeks = buildMonthGrid({
          month: new Date(2026, m, 1),
          firstDayOfWeek,
        });
        expect(weeks[0]!.days[0]!.getDay()).toBe(firstDayOfWeek);
        const first = new Date(2026, m, 1);
        const offset = (first.getDay() - firstDayOfWeek + 7) % 7;
        expect(isSameDay(weeks[0]!.days[offset]!, first)).toBe(true);
        // Last row still contains the month's final day.
        const flat = weeks.flatMap((w) => w.days);
        expect(flat.some((d) => isSameDay(d, endOfMonth(first)))).toBe(true);
      }
    },
  );

  it("fixedWeeks always renders 42 cells", () => {
    // Feb 2026 starts Sunday and has 28 days: exactly 4 natural rows.
    const natural = buildMonthGrid({
      month: new Date(2026, 1, 1),
      firstDayOfWeek: 0,
    });
    expect(natural).toHaveLength(4);
    const fixed = buildMonthGrid({
      month: new Date(2026, 1, 1),
      firstDayOfWeek: 0,
      fixedWeeks: true,
    });
    expect(fixed).toHaveLength(6);
    expect(fixed.flatMap((w) => w.days)).toHaveLength(42);
  });

  it("DST-transition weeks still contain 7 consecutive valid days", () => {
    // March + November 2026 cover both US DST transitions; assertion is
    // zone-independent: consecutive cells always differ by exactly one day.
    for (const month of [new Date(2026, 2, 1), new Date(2026, 10, 1)]) {
      const flat = buildMonthGrid({ month, firstDayOfWeek: 0 }).flatMap(
        (w) => w.days,
      );
      for (let i = 1; i < flat.length; i += 1) {
        expect(isSameDay(addDays(flat[i - 1]!, 1), flat[i]!)).toBe(true);
      }
    }
  });

  it("computes ISO week numbers", () => {
    // Week containing Thu Jan 1 2026 is ISO week 1.
    const weeks = buildMonthGrid({
      month: new Date(2026, 0, 1),
      firstDayOfWeek: 1,
    });
    expect(weeks[0]!.weekNumber).toBe(1);
  });
});

describe("Intl helpers", () => {
  it("weekday names rotate to firstDayOfWeek", () => {
    expect(getWeekdayNames("en-US", "short", 0)[0]).toBe("Sun");
    expect(getWeekdayNames("en-US", "short", 1)[0]).toBe("Mon");
    expect(getWeekdayNames("en-US", "short", 1)[6]).toBe("Sun");
    expect(getWeekdayNames("en-US", "short", 6)[0]).toBe("Sat");
    expect(getWeekdayNames("en-US", "long", 0)).toHaveLength(7);
  });

  it("localizes weekday and month names", () => {
    expect(getMonthName("en-US", new Date(2026, 6, 1))).toBe("July");
    expect(getMonthName("de-DE", new Date(2026, 6, 1))).toBe("Juli");
    expect(getWeekdayNames("de-DE", "long", 1)[0]).toBe("Montag");
  });

  it("day numbers and year labels respect the locale numbering system", () => {
    expect(getDayNumber("en-US", new Date(2026, 6, 17))).toBe("17");
    expect(getDayNumber("ar-EG", new Date(2026, 6, 17))).toBe("١٧");
    expect(getYearLabel("en-US", new Date(2026, 6, 1))).toBe("2026");
  });

  it("getDefaultFirstDayOfWeek maps Intl 1=Mon..7=Sun to 0=Sun..6=Sat", () => {
    // en-US weeks start Sunday, de-DE weeks start Monday (when weekInfo exists).
    const us = getDefaultFirstDayOfWeek("en-US");
    const de = getDefaultFirstDayOfWeek("de-DE");
    expect([0, 1, 2, 3, 4, 5, 6]).toContain(us);
    expect([0, 1, 2, 3, 4, 5, 6]).toContain(de);
    const locale = new Intl.Locale("de-DE") as Intl.Locale & {
      getWeekInfo?: () => { firstDay?: number };
      weekInfo?: { firstDay?: number };
    };
    const hasWeekInfo =
      typeof locale.getWeekInfo === "function" || locale.weekInfo !== undefined;
    if (hasWeekInfo) {
      expect(us).toBe(0);
      expect(de).toBe(1);
    }
  });

  it("getDefaultFirstDayOfWeek falls back to Sunday without weekInfo", () => {
    const intlObject = Intl as unknown as { Locale: typeof Intl.Locale };
    const original = intlObject.Locale;
    // Simulate an older runtime whose Intl.Locale lacks weekInfo entirely.
    class BareLocale {
      constructor(tag: string) {
        void tag;
      }
    }
    intlObject.Locale = BareLocale as unknown as typeof Intl.Locale;
    try {
      expect(getDefaultFirstDayOfWeek("de-DE")).toBe(0);
    } finally {
      intlObject.Locale = original;
    }
  });
});

describe("matchesDate", () => {
  const day = new Date(2026, 6, 7); // a Tuesday

  it("matches every matcher shape", () => {
    expect(matchesDate(day, new Date(2026, 6, 7))).toBe(true);
    expect(matchesDate(day, new Date(2026, 6, 8))).toBe(false);
    expect(matchesDate(day, [new Date(2026, 6, 1), new Date(2026, 6, 7)])).toBe(
      true,
    );
    expect(
      matchesDate(day, {
        from: new Date(2026, 6, 1),
        to: new Date(2026, 6, 10),
      }),
    ).toBe(true);
    expect(
      matchesDate(day, {
        from: new Date(2026, 6, 8),
        to: new Date(2026, 6, 10),
      }),
    ).toBe(false);
    expect(matchesDate(day, { from: new Date(2026, 6, 7) })).toBe(true); // to defaults to from
    expect(matchesDate(day, { before: new Date(2026, 6, 8) })).toBe(true);
    expect(matchesDate(day, { before: new Date(2026, 6, 7) })).toBe(false);
    expect(matchesDate(day, { after: new Date(2026, 6, 6) })).toBe(true);
    expect(matchesDate(day, { dayOfWeek: [0, 6] })).toBe(false);
    expect(matchesDate(day, { dayOfWeek: [2] })).toBe(true);
    expect(matchesDate(day, (d) => d.getDate() === 7)).toBe(true);
  });

  it("matches arrays of mixed matchers", () => {
    expect(
      matchesDate(day, [
        { dayOfWeek: [0, 6] },
        { before: new Date(2026, 6, 8) },
      ]),
    ).toBe(true);
    expect(
      matchesDate(day, [
        { dayOfWeek: [0, 6] },
        { after: new Date(2026, 6, 8) },
      ]),
    ).toBe(false);
  });
});
