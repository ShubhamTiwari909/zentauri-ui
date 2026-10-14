"use client";

import { useMemo } from "react";
import {
  getCachedNumberFormat,
  getNumberFormatKey,
} from "./getCachedNumberFormat";

export { getCachedNumberFormat };

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
  const key = getNumberFormatKey(locale, formatOptions);
  // Keyed by serialized options so non-cacheable option sets keep a stable identity.
  const formatter = useMemo(
    () => getCachedNumberFormat(locale, formatOptions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );
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
