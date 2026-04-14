"use client";

import { createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { progressAnimationPresets } from "./animations";
import type { ProgressProps, ProgressSectionProps } from "./types";
import {
  progressBarVariants,
  progressTrackVariants,
  progressVariants,
} from "./variants";

type ProgressCtx = {
  value: number;
  min: number;
  max: number;
  size: NonNullable<ProgressProps["size"]>;
  shape: NonNullable<ProgressProps["shape"]>;
  striped: boolean;
  animated: boolean;
  appearance: NonNullable<ProgressProps["appearance"]>;
};

const ProgressContext = createContext<ProgressCtx | null>(null);

function useProgressContext(component: string): ProgressCtx {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Progress>`);
  }
  return ctx;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Progress(props: ProgressProps) {
  const {
    className,
    appearance = "default",
    size = "md",
    shape = "rounded",
    striped = false,
    animated = false,
    animation = "none",
    value = 0,
    min = 0,
    max = 100,
    label,
    children,
    ref,
    ...rest
  } = props;
  const motionProps = progressAnimationPresets[animation];
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
      <motion.div
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
        initial={false}
        {...motionProps}
        {...rest}
      >
        {children ?? (
          <>
            <ProgressBar style={{ transform: `scaleX(${percent / 100})` }} />
          </>
        )}
      </motion.div>
    </ProgressContext.Provider>
  );
}

Progress.displayName = "Progress";

export function ProgressBar({
  className,
  style,
  ref,
  ...rest
}: ProgressSectionProps & { style?: React.CSSProperties; ref?: React.Ref<HTMLDivElement> }) {
  const { size, shape, striped, animated } = useProgressContext("ProgressBar");

  return (
    <div
      data-slot="progress-track"
      className={cn(progressTrackVariants({ size, shape }), "text-current")}
    >
      <motion.div
        ref={ref}
        data-slot="progress-bar"
        className={cn(progressBarVariants({ striped }), className)}
        style={{
          transformOrigin: "left center",
          ...style,
        }}
        animate={
          animated
            ? { x: ["-30%", "0%"], opacity: [0.85, 1] }
            : undefined
        }
        transition={
          animated
            ? { repeat: Infinity, duration: 1.1, ease: "easeInOut" }
            : undefined
        }
        {...rest}
      />
    </div>
  );
}

ProgressBar.displayName = "ProgressBar";

export function ProgressLabel({ className, children }: ProgressSectionProps) {
  return (
    <div data-slot="progress-label" className={cn("mb-2 font-medium text-slate-200", className)}>
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
    <div data-slot="progress-value" className={cn("mt-2 text-right text-slate-400", className)}>
      {content}
    </div>
  );
}

ProgressValue.displayName = "ProgressValue";
