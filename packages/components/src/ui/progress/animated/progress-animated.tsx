"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn, clamp } from "../../../lib/utils";

import { progressAnimationPresets } from "./animations";
import type { ProgressAnimatedProps } from "./types";
import type { ProgressCtx, ProgressSectionProps } from "../types";
import {
  progressBarVariants,
  progressTrackVariants,
  progressVariants,
} from "../variants";
import {
  ProgressContext,
  ProgressLabel,
  ProgressValue,
  useProgressContext,
} from "../progress-base";

export function ProgressAnimated({
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
  animation = "none",
  busy,
  ...rest
}: ProgressAnimatedProps) {
  const clamped = clamp(value, min, max);
  const percent = max === min ? 0 : ((clamped - min) / (max - min)) * 100;
  const labelSlotId = `${useId()}-progress-label`;
  const labelSlotCountRef = useRef(0);
  const [labelSlotMounted, setLabelSlotMounted] = useState(false);
  const registerProgressLabel = useCallback(() => {
    labelSlotCountRef.current += 1;
    if (labelSlotCountRef.current === 1) {
      setLabelSlotMounted(true);
    }
    return () => {
      labelSlotCountRef.current -= 1;
      if (labelSlotCountRef.current === 0) {
        setLabelSlotMounted(false);
      }
    };
  }, []);
  const hasInlineLabelProp = Boolean(label?.trim().length);

  const labelingProps = useMemo(() => {
    if (hasInlineLabelProp) {
      return { "aria-label": label?.trim() ?? "Progress" };
    }
    if (labelSlotMounted) {
      return { "aria-labelledby": labelSlotId };
    }
    return { "aria-label": "Progress" };
  }, [hasInlineLabelProp, label, labelSlotId, labelSlotMounted]);

  const ctx = useMemo<ProgressCtx>(
    () => ({
      value: clamped,
      min,
      max,
      size: size ?? "md",
      shape: shape ?? "rounded",
      striped: Boolean(striped),
      animated: Boolean(animated),
      appearance: appearance ?? "default",
      labelSlotId,
      registerProgressLabel,
    }),
    [
      animated,
      appearance,
      clamped,
      labelSlotId,
      max,
      min,
      registerProgressLabel,
      shape,
      size,
      striped,
    ],
  );

  const motionProps = progressAnimationPresets[animation];

  return (
    <ProgressContext.Provider value={ctx}>
      <motion.div
        ref={ref}
        data-slot="progress"
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-busy={busy ? true : undefined}
        {...labelingProps}
        className={cn(
          progressVariants({ appearance, size, shape, striped, animated }),
          className,
        )}
        initial={animation === "none" ? false : undefined}
        {...motionProps}
        {...rest}
      >
        {children ?? (
          <>
            <ProgressBarAnimated
              style={{ transform: `scaleX(${percent / 100})` }}
            />
          </>
        )}
      </motion.div>
    </ProgressContext.Provider>
  );
}

ProgressAnimated.displayName = "Progress";

export function ProgressBarAnimated({
  className,
  style,
  ref,
  ...rest
}: ProgressSectionProps & {
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}) {
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
          animated ? { x: ["-30%", "0%"], opacity: [0.85, 1] } : undefined
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

ProgressBarAnimated.displayName = "ProgressBar";

export { ProgressLabel, ProgressValue };
