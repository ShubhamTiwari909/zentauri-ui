"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { useTimezone } from "../../hooks/useTimezone";

import type { WorldClockBaseProps, WorldClockZone } from "./types";
import {
  worldClockCardVariants,
  worldClockDateVariants,
  worldClockDaynightVariants,
  worldClockLabelVariants,
  worldClockOffsetVariants,
  worldClockTimeVariants,
  worldClockVariants,
} from "./variants";

function normalizeZones(
  zones: Array<string | WorldClockZone>,
): WorldClockZone[] {
  return zones.map((z) => (typeof z === "string" ? { timeZone: z } : z));
}

function isDaytime(timeZone: string, now: number): boolean {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      hour12: false,
    }).formatToParts(now);
    const hourPart = parts.find((p) => p.type === "hour");
    if (!hourPart) return true;
    const hour = parseInt(hourPart.value, 10);
    return hour >= 6 && hour < 18;
  } catch {
    return true;
  }
}

function useSharedClock(showSeconds: boolean): number {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const delay = showSeconds ? 1_000 : 60_000;
    const remainder = showSeconds ? 0 : delay - (Date.now() % delay);
    const initial = setTimeout(() => {
      tick();
      const id = setInterval(tick, delay);
      cleanupRef.current = () => clearInterval(id);
    }, remainder);

    const cleanupRef = { current: () => clearTimeout(initial) };

    return () => {
      cleanupRef.current();
    };
  }, [showSeconds]);

  return now;
}

export function WorldClockBase({
  zones,
  locale: localeProp,
  hourCycle,
  showSeconds = false,
  showDate = true,
  showOffsetFromLocal = true,
  showDayNight = true,
  cardAppearance,
  cardSize,
  layout,
  className,
  ref,
  ...rest
}: WorldClockBaseProps) {
  const locale =
    localeProp ??
    (typeof navigator !== "undefined" ? navigator.language : "en-US");
  const { formatInZone, offsetFromLocal } = useTimezone({ locale });
  const now = useSharedClock(showSeconds);

  const resolvedZones = useMemo(() => normalizeZones(zones), [zones]);

  const formatTimeOptions = useMemo<Intl.DateTimeFormatOptions>(
    () => ({
      hour: "2-digit",
      minute: "2-digit",
      second: showSeconds ? "2-digit" : undefined,
      hour12: hourCycle !== "h23",
      hourCycle: hourCycle,
    }),
    [showSeconds, hourCycle],
  );

  const formatDateOptions = useMemo<Intl.DateTimeFormatOptions>(
    () => ({
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    [],
  );

  return (
    <div
      ref={ref}
      data-slot="world-clock"
      className={cn(worldClockVariants({ layout }), className)}
      {...rest}
    >
      {resolvedZones.map((zone) => {
        const daytime = isDaytime(zone.timeZone, now);
        return (
          <WorldClockCard
            key={zone.timeZone}
            zone={zone}
            now={now}
            formatTimeOptions={formatTimeOptions}
            formatDateOptions={formatDateOptions}
            showDate={showDate}
            showOffsetFromLocal={showOffsetFromLocal}
            showDayNight={showDayNight}
            offsetFromLocal={offsetFromLocal}
            formatInZone={formatInZone}
            appearance={cardAppearance}
            size={cardSize}
            daytime={daytime}
          />
        );
      })}
    </div>
  );
}

WorldClockBase.displayName = "WorldClock";

function WorldClockCard({
  zone,
  now,
  formatTimeOptions,
  formatDateOptions,
  showDate,
  showOffsetFromLocal,
  showDayNight,
  offsetFromLocal,
  formatInZone,
  appearance,
  size,
  daytime,
}: {
  zone: WorldClockZone;
  now: number;
  formatTimeOptions: Intl.DateTimeFormatOptions;
  formatDateOptions: Intl.DateTimeFormatOptions;
  showDate: boolean;
  showOffsetFromLocal: boolean;
  showDayNight: boolean;
  offsetFromLocal: (tz: string) => number;
  formatInZone: (
    date: Date | number,
    tz: string,
    opts?: Intl.DateTimeFormatOptions,
  ) => string;
  appearance?: WorldClockBaseProps["cardAppearance"];
  size?: WorldClockBaseProps["cardSize"];
  daytime: boolean;
}) {
  const timeStr = useMemo(
    () => formatInZone(now, zone.timeZone, formatTimeOptions),
    [now, zone.timeZone, formatInZone, formatTimeOptions],
  );

  const dateStr = useMemo(
    () => formatInZone(now, zone.timeZone, formatDateOptions),
    [now, zone.timeZone, formatInZone, formatDateOptions],
  );

  const offsetLabel = useMemo(() => {
    if (!showOffsetFromLocal) return null;
    const diff = offsetFromLocal(zone.timeZone);
    const sign = diff >= 0 ? "+" : "";
    const hours = Math.abs(diff) / 60;
    const label = Number.isInteger(hours)
      ? `${sign}${hours}h`
      : `${sign}${hours.toFixed(1).replace(".0", "")}h`;
    return label;
  }, [showOffsetFromLocal, offsetFromLocal, zone.timeZone]);

  const isoString = useMemo(() => new Date(now).toISOString(), [now]);

  return (
    <div
      data-slot="world-clock-zone"
      data-daytime={daytime}
      className={cn(worldClockCardVariants({ appearance, size }))}
    >
      <div className="flex items-center justify-between">
        <span className={cn(worldClockLabelVariants())}>
          {zone.label ??
            zone.timeZone.split("/").pop()?.replace(/_/g, " ") ??
            zone.timeZone}
        </span>
        <div className="flex items-center gap-1.5">
          {showDayNight && (
            <span
              className={cn(worldClockDaynightVariants())}
              title={daytime ? "Day" : "Night"}
            >
              {daytime ? "\u2600" : "\u263E"}
            </span>
          )}
          {offsetLabel && (
            <span className={cn(worldClockOffsetVariants())}>
              {offsetLabel}
            </span>
          )}
        </div>
      </div>
      <time dateTime={isoString} className={cn(worldClockTimeVariants())}>
        {timeStr}
      </time>
      {showDate && (
        <span className={cn(worldClockDateVariants())}>{dateStr}</span>
      )}
    </div>
  );
}

WorldClockCard.displayName = "WorldClockZone";
