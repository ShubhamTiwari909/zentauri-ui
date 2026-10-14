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

/**
 * Pure cache helper with no client directive. Imported through the
 * `hooks/useNumberFormat` entry it is still a client reference in Next.js, so
 * Server Components should vendor or import this module directly.
 */
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

/** Stable key for memoizing formatter creation, including non-cacheable options. */
export function getNumberFormatKey(
  locale: string | string[],
  options: Intl.NumberFormatOptions,
): string {
  return JSON.stringify(
    [
      locale,
      Object.keys(options)
        .sort()
        .map((key) => [key, (options as Record<string, unknown>)[key]]),
    ],
    (_key, value: unknown) =>
      typeof value === "bigint"
        ? `${value}n`
        : typeof value === "number" && !Number.isFinite(value)
          ? String(value)
          : value,
  );
}
