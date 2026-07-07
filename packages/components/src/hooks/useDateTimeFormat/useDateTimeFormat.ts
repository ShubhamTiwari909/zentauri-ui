"use client";

import { useMemo } from "react";

const formatterCache = new Map<string, Intl.DateTimeFormat>();
const MAX_CACHE_SIZE = 50;

function cacheKey(
  locale: string | string[],
  options?: Intl.DateTimeFormatOptions,
): string {
  return `${JSON.stringify(locale)}_${JSON.stringify(options ?? {})}`;
}

export function getCachedDateTimeFormat(
  locale: string | string[],
  options?: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const key = cacheKey(locale, options);
  const cached = formatterCache.get(key);
  if (cached) {
    return cached;
  }
  if (formatterCache.size >= MAX_CACHE_SIZE) {
    const firstKey = formatterCache.keys().next().value;
    if (firstKey !== undefined) {
      formatterCache.delete(firstKey);
    }
  }
  const formatter = new Intl.DateTimeFormat(locale, options);
  formatterCache.set(key, formatter);
  return formatter;
}

export interface UseDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  locale?: string | string[];
}

export interface UseDateTimeFormatReturn {
  format: (date: Date | number) => string;
  formatRange: (start: Date | number, end: Date | number) => string;
  formatToParts: (date: Date | number) => Intl.DateTimeFormatPart[];
  resolvedLocale: string;
  formatter: Intl.DateTimeFormat;
}

export function useDateTimeFormat(
  options?: UseDateTimeFormatOptions,
): UseDateTimeFormatReturn {
  const { locale: localeProp, ...dateTimeOptions } = options ?? {};
  const locale =
    localeProp ??
    (typeof navigator !== "undefined" ? navigator.language : "en-US");

  const cacheKeyValue = useMemo(
    () => cacheKey(locale, dateTimeOptions),
    [locale, dateTimeOptions],
  );

  const formatter = useMemo<Intl.DateTimeFormat>(() => {
    return getCachedDateTimeFormat(locale, dateTimeOptions);
  }, [cacheKeyValue]);

  const format = useMemo(() => {
    return (date: Date | number): string => formatter.format(date);
  }, [formatter]);

  const formatRange = useMemo(() => {
    return (start: Date | number, end: Date | number): string => {
      if (typeof formatter.formatRange === "function") {
        return formatter.formatRange(start, end);
      }
      return `${formatter.format(start)} \u2013 ${formatter.format(end)}`;
    };
  }, [formatter]);

  const formatToParts = useMemo(() => {
    return (date: Date | number): Intl.DateTimeFormatPart[] =>
      formatter.formatToParts(date);
  }, [formatter]);

  const resolvedLocale = useMemo(
    () => formatter.resolvedOptions().locale,
    [formatter],
  );

  return { format, formatRange, formatToParts, resolvedLocale, formatter };
}
