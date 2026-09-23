"use client";

import { useId } from "react";

import {
  zuiGaugeIndicator,
  zuiGaugeLabel,
  zuiGaugeTrack,
} from "../../design-system/gauge";
import { clamp, cn } from "../../lib/utils";

import type { GaugeProps } from "./types";
import { gaugeVariants } from "./variants";

const VIEWBOX_SIZE = 120;
const CENTER = VIEWBOX_SIZE / 2;
const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function GaugeBase({
  appearance = "default",
  size = "md",
  thickness = "medium",
  variant = "radial",
  value = 0,
  min = 0,
  max = 100,
  label,
  showValue = true,
  formatValue = (_value, percentage) => `${Math.round(percentage)}%`,
  children,
  className,
  ref,
  ...rest
}: GaugeProps) {
  const lowerBound = Math.min(min, max);
  const upperBound = Math.max(min, max);
  const clampedValue = clamp(value, lowerBound, upperBound);
  const range = upperBound - lowerBound;
  const percentage =
    range === 0 ? 0 : ((clampedValue - lowerBound) / range) * 100;
  const sweep = variant === "dial" ? 270 : 360;
  const startAngle = variant === "dial" ? 135 : -90;
  const arcLength = CIRCUMFERENCE * (sweep / 360);
  const progressLength = arcLength * (percentage / 100);
  const formattedValue = formatValue(clampedValue, percentage);
  const gradientId = `${useId().replaceAll(":", "")}-gauge-gradient`;
  const strokeLinecap = variant === "dial" ? "round" : "butt";

  return (
    <div
      ref={ref}
      data-slot="gauge"
      role="meter"
      aria-label={label?.trim() || "Gauge"}
      aria-valuemin={lowerBound}
      aria-valuemax={upperBound}
      aria-valuenow={clampedValue}
      aria-valuetext={formattedValue}
      className={cn(
        gaugeVariants({ appearance, size, thickness, variant }),
        className,
      )}
      {...rest}
    >
      <svg
        data-slot="gauge-svg"
        aria-hidden="true"
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="size-full -rotate-0 overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--gauge-start)" />
            <stop offset="100%" stopColor="var(--gauge-end)" />
          </linearGradient>
        </defs>
        <circle
          data-slot="gauge-track"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          pathLength={CIRCUMFERENCE}
          strokeDasharray={`${arcLength} ${CIRCUMFERENCE - arcLength}`}
          strokeLinecap={strokeLinecap}
          transform={`rotate(${startAngle} ${CENTER} ${CENTER})`}
          className={zuiGaugeTrack}
        />
        <circle
          data-slot="gauge-indicator"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          pathLength={CIRCUMFERENCE}
          stroke={progressLength > 0 ? `url(#${gradientId})` : "none"}
          strokeDasharray={`${progressLength} ${CIRCUMFERENCE - progressLength}`}
          strokeLinecap={strokeLinecap}
          transform={`rotate(${startAngle} ${CENTER} ${CENTER})`}
          className={zuiGaugeIndicator}
        />
      </svg>

      <div
        data-slot="gauge-content"
        className="absolute inset-[18%] flex min-w-0 flex-col items-center justify-center text-center"
      >
        {children ?? (
          <>
            {showValue ? (
              <span
                data-slot="gauge-value"
                className="font-semibold leading-none tabular-nums"
              >
                {formattedValue}
              </span>
            ) : null}
            {label ? (
              <span data-slot="gauge-label" className={zuiGaugeLabel}>
                {label}
              </span>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

GaugeBase.displayName = "Gauge";
