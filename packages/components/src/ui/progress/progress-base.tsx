"use client";

import { createContext, useContext, useMemo } from "react";

import { cn, clamp } from "../../lib/utils";

import type { ProgressProps, ProgressSectionProps, ProgressCtx } from "./types";
import {
  progressBarVariants,
  progressTrackVariants,
  progressVariants,
} from "./variants";

export const ProgressContext = createContext<ProgressCtx | null>(null);

export function useProgressContext(component: string): ProgressCtx {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Progress>`);
  }
  return ctx;
}

export function ProgressBase(props: ProgressProps) {
  const {
    className,
    appearance = "default",
    size = "md",
    shape = "rounded",
    striped = false,
    animated = false,
    value = 0,
    min = 0,
    max = 100,
    label,
    children,
    ref,
    as:Wrapper = "div",
    ...rest
  } = props;
  const clamped = clamp(value, min, max);
  const percent = max === min ? 0 : ((clamped - min) / (max - min)) * 100;

  const ctx = useMemo(
    () => ({
      value: clamped,
      min,
      max,
      size: size ?? "md",
      shape: shape ?? "rounded",
      striped: Boolean(striped),
      animated: Boolean(animated),
      appearance: appearance ?? "default",
    }),
    [animated, appearance, clamped, max, min, shape, size, striped],
  );

  return (
    <ProgressContext.Provider value={ctx}>
      <Wrapper
        ref={ref}
        data-slot="progress"
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-label={label}
        className={cn(
          progressVariants({ appearance, size, shape, striped, animated }),
          className,
        )}
        {...rest}
      >
        {children ?? (
          <>
            <ProgressBar style={{ transform: `scaleX(${percent / 100})` }} />
          </>
        )}
      </Wrapper>
    </ProgressContext.Provider>
  );
}

ProgressBase.displayName = "Progress";

export function ProgressBar({
  className,
  style,
  ref,
  as:Wrapper = "div",
  ...rest
}: ProgressSectionProps & {
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const { size, shape, striped, animated } = useProgressContext("ProgressBar");

  return (
    <Wrapper
      data-slot="progress-track"
      className={cn(progressTrackVariants({ size, shape }), "text-current")}
    >
      <div
        ref={ref}
        data-slot="progress-bar"
        className={cn(
          progressBarVariants({ striped }),
          animated ? "animate-pulse" : undefined,
          className,
        )}
        style={{
          transformOrigin: "left center",
          ...style,
        }}
        {...rest}
      />
    </Wrapper>
  );
}

ProgressBar.displayName = "ProgressBar";

export function ProgressLabel({ className, children }: ProgressSectionProps) {
  return (
    <div
      data-slot="progress-label"
      className={cn("mb-2 font-medium text-slate-200", className)}
    >
      {children}
    </div>
  );
}

ProgressLabel.displayName = "ProgressLabel";

export function ProgressValue({ className, children }: ProgressSectionProps) {
  const { value, min, max } = useProgressContext("ProgressValue");
  const range = max - min;
  const pct = range === 0 ? 0 : Math.round(((value - min) / range) * 100);
  const content = children ?? `${pct}%`;
  return (
    <div
      data-slot="progress-value"
      className={cn("mt-2 text-right text-slate-400", className)}
    >
      {content}
    </div>
  );
}

ProgressValue.displayName = "ProgressValue";
