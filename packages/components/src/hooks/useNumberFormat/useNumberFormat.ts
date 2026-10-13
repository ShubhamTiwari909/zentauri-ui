"use client";

import { useMemo } from "react";

const formatterCache = new Map<string, Intl.NumberFormat>();
const MAX_CACHE_SIZE = 50;
// Fixed ordering includes modern native options even when a consumer's TS lib is older.
const optionKeys = [
  "localeMatcher",
  "numberingSystem",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "unit",
  "unitDisplay",
  "notation",
  "compactDisplay",
  "signDisplay",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "roundingPriority",
  "roundingIncrement",
  "roundingMode",
  "trailingZeroDisplay",
] as const;

/** Pure cache helper; the existing hook export is still a client entry in Next.js. */
export function getCachedNumberFormat(
  locale: string | string[] = "en-US",
  options: Intl.NumberFormatOptions = {},
): Intl.NumberFormat {
  const locales = Intl.getCanonicalLocales(locale);
  if (!locales.includes("en-US")) locales.push("en-US");
  const snapshot: Record<string, unknown> = {};
  let cacheable = Object.keys(options).every((key) =>
    optionKeys.some((option) => option === key),
  );
  for (const key of optionKeys) {
    const value = (options as Record<string, unknown>)[key];
    if (value === undefined) continue;
    snapshot[key] = value;
    if (
      !["string", "number", "boolean"].includes(typeof value) ||
      (typeof value === "number" && !Number.isFinite(value))
    )
      cacheable = false;
  }
  // Unusual values/unknown options stay under native Intl coercion and validation.
  if (!cacheable) return new Intl.NumberFormat(locales, options);
  const key = JSON.stringify([locales, snapshot]);
  const cached = formatterCache.get(key);
  if (cached) return cached;
  const formatter = new Intl.NumberFormat(locales, snapshot);
  if (formatterCache.size >= MAX_CACHE_SIZE) {
    const first = formatterCache.keys().next().value;
    if (first !== undefined) formatterCache.delete(first);
  }
  formatterCache.set(key, formatter);
  return formatter;
}

export interface UseNumberFormatOptions extends Intl.NumberFormatOptions {
  /** Deterministic en-US default; en-US is also the final locale fallback. */
  locale?: string | string[];
}
export interface UseNumberFormatReturn {
  format: (value: number | bigint) => string;
  formatToParts: (value: number | bigint) => Intl.NumberFormatPart[];
  resolvedLocale: string;
  formatter: Intl.NumberFormat;
}
function assertValue(value: number | bigint) {
  if (typeof value !== "number" && typeof value !== "bigint")
    throw new TypeError("Expected a number or bigint");
}

export function useNumberFormat(
  options: UseNumberFormatOptions = {},
): UseNumberFormatReturn {
  const { locale = "en-US", ...formatOptions } = options;
  const formatter = getCachedNumberFormat(locale, formatOptions);
  return useMemo(
    () => ({
      format: (value: number | bigint) => {
        assertValue(value);
        return formatter.format(value);
      },
      formatToParts: (value: number | bigint) => {
        assertValue(value);
        return formatter.formatToParts(value);
      },
      resolvedLocale: formatter.resolvedOptions().locale,
      formatter,
    }),
    [formatter],
  );
}
