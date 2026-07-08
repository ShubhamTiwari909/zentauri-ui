"use client";

import { useMemo } from "react";

export interface TimezoneInfo {
  id: string;
  region: string;
  city: string;
  offsetLabel: string;
  offsetMinutes: number;
}

export interface UseTimezoneReturn {
  localTimezone: string;
  timezones: TimezoneInfo[];
  supported: boolean;
  formatInZone: (
    date: Date | number,
    timeZone: string,
    options?: Intl.DateTimeFormatOptions,
  ) => string;
  offsetFromLocal: (timeZone: string) => number;
  getTimezoneInfo: (timeZone: string) => TimezoneInfo | null;
}

let cachedTimezones: TimezoneInfo[] | null = null;
let cachedLocale = "";

function parseOffsetMinutes(
  timeZone: string,
  instant: number = Date.now(),
): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "longOffset",
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).formatToParts(instant);

    const offsetPart = parts.find((p) => p.type === "timeZoneName");
    if (!offsetPart) return 0;

    const match = offsetPart.value.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);
    if (!match) return 0;

    const hours = parseInt(match[1]!, 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + (hours < 0 ? -minutes : minutes);
  } catch {
    return 0;
  }
}

function buildTimezoneInfo(
  timeZone: string,
  locale: string,
  instant: number,
): TimezoneInfo {
  const parts = timeZone.split("/");
  const region = parts[0] ?? "Other";
  const city = parts.slice(1).join("/").replace(/_/g, " ");
  const offsetMinutes = parseOffsetMinutes(timeZone, instant);

  let offsetLabel = "";
  try {
    const fmt = new Intl.DateTimeFormat(locale, {
      timeZone,
      timeZoneName: "shortOffset",
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    const parts_fmt = fmt.formatToParts(instant);
    const tzPart = parts_fmt.find((p) => p.type === "timeZoneName");
    offsetLabel = tzPart?.value ?? "";
  } catch {
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const absH = Math.floor(Math.abs(offsetMinutes) / 60);
    const absM = Math.abs(offsetMinutes) % 60;
    offsetLabel = `GMT${sign}${absH}${absM ? `:${String(absM).padStart(2, "0")}` : ""}`;
  }

  return { id: timeZone, region, city, offsetLabel, offsetMinutes };
}

function now(): number {
  return Date.now();
}

function buildAllTimezones(locale: string): TimezoneInfo[] {
  if (typeof Intl.supportedValuesOf !== "function") {
    return [];
  }
  const instant = now();
  const ids: string[] = Intl.supportedValuesOf("timeZone");
  return ids
    .map((id) => buildTimezoneInfo(id, locale, instant))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function useTimezone(options?: { locale?: string }): UseTimezoneReturn {
  const locale =
    options?.locale ??
    (typeof navigator !== "undefined" ? navigator.language : "en-US");

  const supported = typeof Intl.supportedValuesOf === "function";

  const localTimezone = useMemo<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "UTC";
    }
  }, []);

  const timezones = useMemo<TimezoneInfo[]>(() => {
    if (!supported) return [];
    if (cachedTimezones && cachedLocale === locale) {
      return cachedTimezones;
    }
    cachedTimezones = buildAllTimezones(locale);
    cachedLocale = locale;
    return cachedTimezones;
  }, [locale, supported]);

  const formatInZone = useMemo(() => {
    return (
      date: Date | number,
      timeZone: string,
      formatOptions?: Intl.DateTimeFormatOptions,
    ): string => {
      try {
        return new Intl.DateTimeFormat(locale, {
          ...formatOptions,
          timeZone,
        }).format(date);
      } catch {
        return String(date);
      }
    };
  }, [locale]);

  const offsetFromLocal = useMemo(() => {
    return (timeZone: string): number => {
      const localOffset = parseOffsetMinutes(localTimezone);
      const zoneOffset = parseOffsetMinutes(timeZone);
      return zoneOffset - localOffset;
    };
  }, [localTimezone]);

  const getTimezoneInfo = useMemo(() => {
    return (timeZone: string): TimezoneInfo | null => {
      if (!supported) return null;
      const instant = now();
      return buildTimezoneInfo(timeZone, locale, instant);
    };
  }, [locale, supported]);

  return {
    localTimezone,
    timezones,
    supported,
    formatInZone,
    offsetFromLocal,
    getTimezoneInfo,
  };
}
