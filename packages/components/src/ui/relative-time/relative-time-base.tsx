"use client";

import { useMemo, useRef } from "react";
import { cn } from "../../lib/utils";
import { useRelativeTime } from "../../hooks/useRelativeTime";
import { useIsMounted } from "../../hooks/useIsMounted";

import type { RelativeTimeBaseProps } from "./types";
import { relativeTimeVariants } from "./variants";

export function RelativeTimeBase({
  date,
  locale,
  formatStyle = "long",
  numeric,
  live = true,
  absoluteAfter,
  withTooltip = true,
  tooltipFormatOptions,
  ssrFallback,
  appearance,
  size,
  className,
  ref,
  ...rest
}: RelativeTimeBaseProps) {
  const isMounted = useIsMounted();
  const dateRef = useRef(new Date(date));

  const timeData = useRelativeTime(date, {
    locale,
    style: formatStyle,
    numeric,
    live,
    absoluteAfter,
    absoluteFormatOptions: tooltipFormatOptions,
  });

  const tooltipText = useMemo(() => {
    if (!withTooltip) return undefined;
    try {
      return dateRef.current.toLocaleString(locale ?? navigator.language, {
        dateStyle: "full",
        timeStyle: "medium",
        ...tooltipFormatOptions,
      });
    } catch {
      return dateRef.current.toISOString();
    }
  }, [withTooltip, locale, tooltipFormatOptions]);

  const content = isMounted()
    ? timeData.text
    : (ssrFallback ?? dateRef.current.toLocaleDateString());

  return (
    <time
      ref={ref}
      dateTime={timeData.isoString}
      title={tooltipText}
      data-slot="relative-time"
      data-unit={timeData.unit}
      className={cn(relativeTimeVariants({ appearance, size }), className)}
      {...rest}
    >
      {content}
    </time>
  );
}

RelativeTimeBase.displayName = "RelativeTime";
