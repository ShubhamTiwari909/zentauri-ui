"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePageVisibility } from "../usePageVisibility";

export type RelativeTimeUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export interface UseRelativeTimeOptions {
  locale?: string | string[];
  style?: Intl.RelativeTimeFormatStyle;
  numeric?: Intl.RelativeTimeFormatNumeric;
  live?: boolean;
  justNowThresholdMs?: number;
  justNowLabel?: string;
  absoluteAfter?: { unit: RelativeTimeUnit; count: number };
  absoluteFormatOptions?: Intl.DateTimeFormatOptions;
}

export interface UseRelativeTimeReturn {
  text: string;
  unit: RelativeTimeUnit | "just-now" | "absolute";
  value: number;
  isoString: string;
  refresh: () => void;
}

const MS = {
  second: 1000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
  week: 604_800_000,
  month: 2_629_746_000,
  year: 31_556_926_000,
} as const;

function computeUnit(diffMs: number): {
  unit: RelativeTimeUnit;
  value: number;
} {
  const abs = Math.abs(diffMs);
  if (abs < MS.minute)
    return { unit: "second", value: Math.trunc(diffMs / MS.second) };
  if (abs < MS.hour)
    return { unit: "minute", value: Math.trunc(diffMs / MS.minute) };
  if (abs < MS.day)
    return { unit: "hour", value: Math.trunc(diffMs / MS.hour) };
  if (abs < MS.week) return { unit: "day", value: Math.trunc(diffMs / MS.day) };
  if (abs < MS.month)
    return { unit: "week", value: Math.trunc(diffMs / MS.week) };
  if (abs < MS.year)
    return { unit: "month", value: Math.trunc(diffMs / MS.month) };
  return { unit: "year", value: Math.trunc(diffMs / MS.year) };
}

function getDelayMs(unit: RelativeTimeUnit): number {
  switch (unit) {
    case "second":
      return 1_000;
    case "minute":
      return 60_000;
    case "hour":
      return 3_600_000;
    default:
      return 3_600_000;
  }
}

export function useRelativeTime(
  date: Date | number | string,
  options: UseRelativeTimeOptions = {},
): UseRelativeTimeReturn {
  const {
    locale: localeProp,
    style = "long",
    numeric = "auto",
    live = true,
    justNowThresholdMs = 10_000,
    justNowLabel: justNowLabelOption,
    absoluteAfter,
    absoluteFormatOptions,
  } = options;

  const locale =
    localeProp ??
    (typeof navigator !== "undefined" ? navigator.language : "en-US");
  const targetDate = useMemo(() => new Date(date), [date]);
  const visibility = usePageVisibility();
  const [now, setNow] = useState(() => Date.now());
  const refreshKey = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleNext = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();
    const { unit } = computeUnit(diff);
    const delay = Math.min(getDelayMs(unit), 3_600_000);

    timerRef.current = setTimeout(() => {
      setNow(Date.now());
    }, delay);
  }, [targetDate]);

  useEffect(() => {
    if (!live || typeof document === "undefined") {
      return;
    }
    scheduleNext();
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [live, now, visibility, scheduleNext]);

  const refresh = useCallback(() => {
    setNow(Date.now());
    refreshKey.current += 1;
  }, []);

  const result = useMemo<UseRelativeTimeReturn>(() => {
    const diff = targetDate.getTime() - now;
    const absDiff = Math.abs(diff);
    const isoString = targetDate.toISOString();

    if (absDiff < justNowThresholdMs) {
      if (justNowLabelOption !== undefined) {
        return {
          text: justNowLabelOption,
          unit: "just-now",
          value: 0,
          isoString,
          refresh,
        };
      }
      try {
        const rtf = new Intl.RelativeTimeFormat(locale, {
          style,
          numeric: "auto",
        });
        const nowText = rtf.format(0, "second");
        return {
          text: nowText,
          unit: "just-now",
          value: 0,
          isoString,
          refresh,
        };
      } catch {
        return { text: "now", unit: "just-now", value: 0, isoString, refresh };
      }
    }

    if (absoluteAfter) {
      const unitMs = MS[absoluteAfter.unit];
      if (unitMs && absDiff > unitMs * absoluteAfter.count) {
        const fmt = new Intl.DateTimeFormat(locale, {
          ...absoluteFormatOptions,
        });
        return {
          text: fmt.format(targetDate),
          unit: "absolute",
          value: 0,
          isoString,
          refresh,
        };
      }
    }

    const { unit, value } = computeUnit(diff);
    try {
      const rtf = new Intl.RelativeTimeFormat(locale, { style, numeric });
      const text = rtf.format(value, unit);
      return { text, unit, value, isoString, refresh };
    } catch {
      return {
        text: String(targetDate),
        unit: "absolute",
        value: 0,
        isoString,
        refresh,
      };
    }
  }, [
    targetDate,
    now,
    locale,
    style,
    numeric,
    justNowThresholdMs,
    justNowLabelOption,
    absoluteAfter,
    absoluteFormatOptions,
    refresh,
  ]);

  return result;
}
