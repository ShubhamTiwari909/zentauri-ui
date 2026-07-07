"use client";

import { useMemo } from "react";

export interface UseDurationFormatOptions {
  locale?: string | string[];
  style?: "long" | "short" | "narrow";
  units?: Array<"day" | "hour" | "minute" | "second" | "millisecond">;
  maxUnits?: number;
  showZeroUnits?: boolean;
}

export interface DurationPart {
  unit: string;
  value: number;
  text: string;
}

export interface UseDurationFormatReturn {
  format: (durationMs: number) => string;
  formatParts: (durationMs: number) => DurationPart[];
}

const UNIT_MS: Record<string, number> = {
  day: 86_400_000,
  hour: 3_600_000,
  minute: 60_000,
  second: 1_000,
  millisecond: 1,
};

function breakDownDuration(
  durationMs: number,
  units: Array<"day" | "hour" | "minute" | "second" | "millisecond">,
): Array<{ unit: string; value: number }> {
  let remaining = Math.abs(durationMs);
  const result: Array<{ unit: string; value: number }> = [];

  for (const unit of units) {
    const ms = UNIT_MS[unit];
    if (ms === undefined) continue;
    const value = Math.floor(remaining / ms);
    remaining -= value * ms;
    result.push({ unit, value });
  }

  return result;
}

export function useDurationFormat(
  options: UseDurationFormatOptions = {},
): UseDurationFormatReturn {
  const {
    locale: localeProp,
    style = "narrow",
    units = ["hour", "minute", "second"],
    maxUnits,
    showZeroUnits = false,
  } = options;

  const locale =
    localeProp ??
    (typeof navigator !== "undefined" ? navigator.language : "en-US");

  const format = useMemo(() => {
    return (durationMs: number): string => {
      const parts = breakDownDuration(durationMs, units);

      const filtered = showZeroUnits ? parts : parts.filter((p) => p.value > 0);

      const limited = maxUnits ? filtered.slice(0, maxUnits) : filtered;

      if (limited.length === 0) {
        const smallestUnit = units[units.length - 1] ?? "second";
        try {
          const nf = new Intl.NumberFormat(locale, {
            style: "unit",
            unit: smallestUnit as string,
            unitDisplay: style,
          });
          return nf.format(0);
        } catch {
          return `0 ${smallestUnit}`;
        }
      }

      if (style === "narrow") {
        return limited
          .map(({ unit, value }) => {
            try {
              const nf = new Intl.NumberFormat(locale, {
                style: "unit",
                unit: unit,
                unitDisplay: "narrow",
              });
              return nf.format(value);
            } catch {
              return `${value}${unit[0]}`;
            }
          })
          .join(" ");
      }

      const formatted = limited.map(({ unit, value }) => {
        try {
          const nf = new Intl.NumberFormat(locale, {
            style: "unit",
            unit: unit as string,
            unitDisplay: style,
          });
          return nf.format(value);
        } catch {
          return `${value} ${unit}`;
        }
      });

      try {
        const lf = new Intl.ListFormat(locale, {
          style: style === "long" ? "long" : "short",
          type: "conjunction",
        });
        return lf.format(formatted);
      } catch {
        return formatted.join(", ");
      }
    };
  }, [locale, style, units, maxUnits, showZeroUnits]);

  const formatParts = useMemo(() => {
    return (durationMs: number): DurationPart[] => {
      const parts = breakDownDuration(durationMs, units);

      const filtered = showZeroUnits ? parts : parts.filter((p) => p.value > 0);

      const limited = maxUnits ? filtered.slice(0, maxUnits) : filtered;

      return limited.map(({ unit, value }) => {
        let text: string;
        try {
          const nf = new Intl.NumberFormat(locale, {
            style: "unit",
            unit: unit as string,
            unitDisplay: style,
          });
          text = nf.format(value);
        } catch {
          text = `${value} ${unit}`;
        }
        return { unit, value, text };
      });
    };
  }, [locale, style, units, maxUnits, showZeroUnits]);

  return { format, formatParts };
}
