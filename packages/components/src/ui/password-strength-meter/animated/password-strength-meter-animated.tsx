"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn, clamp } from "../../../lib/utils";

import { passwordStrengthMeterAnimationPresets } from "./animations";
import type { PasswordStrengthMeterAnimatedProps } from "./types";
import type {
  PasswordStrengthMeterCtx,
  PasswordStrengthMeterSectionProps,
} from "../types";
import {
  passwordStrengthMeterBarVariants,
  passwordStrengthMeterTrackVariants,
  passwordStrengthMeterVariants,
} from "../variants";
import {
  getStrengthColor,
  getStrengthLabel,
  PasswordStrengthMeterContext,
  usePasswordStrengthMeterContext,
} from "../password-strength-meter-base";

export function PasswordStrengthMeterAnimated({
  className,
  appearance = "default",
  size = "md",
  shape = "rounded",
  animated = false,
  segmented = false,
  value = 0,
  min = 0,
  max = 100,
  label,
  scoreLabel,
  showScoreLabel = true,
  children,
  ref,
  animation = "none",
  ...rest
}: PasswordStrengthMeterAnimatedProps) {
  const clamped = clamp(value, min, max);
  const percent = max === min ? 0 : ((clamped - min) / (max - min)) * 100;
  const labelSlotId = `${useId()}-password-strength-meter-label`;
  const labelSlotCountRef = useRef(0);
  const [labelSlotMounted, setLabelSlotMounted] = useState(false);
  const registerLabel = useCallback(() => {
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
      return { "aria-label": label?.trim() ?? "Password strength" };
    }
    if (labelSlotMounted) {
      return { "aria-labelledby": labelSlotId };
    }
    return { "aria-label": `Password strength: ${getStrengthLabel(percent)}` };
  }, [hasInlineLabelProp, label, labelSlotId, labelSlotMounted, percent]);

  const ctx = useMemo<PasswordStrengthMeterCtx>(
    () => ({
      value: clamped,
      min,
      max,
      size: size ?? "md",
      shape: shape ?? "rounded",
      animated: Boolean(animated),
      segmented: Boolean(segmented),
      appearance: appearance ?? "default",
      labelSlotId,
      registerLabel,
    }),
    [
      animated,
      appearance,
      clamped,
      labelSlotId,
      max,
      min,
      registerLabel,
      shape,
      size,
      segmented,
    ],
  );

  const motionProps = passwordStrengthMeterAnimationPresets[animation];

  return (
    <PasswordStrengthMeterContext.Provider value={ctx}>
      <motion.div
        ref={ref}
        data-slot="password-strength-meter"
        role="meter"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamped}
        {...labelingProps}
        className={cn(
          passwordStrengthMeterVariants({ appearance, size, shape }),
          className,
        )}
        initial={animation === "none" ? false : undefined}
        {...motionProps}
        {...rest}
      >
        {children ?? (
          <>
            <div className="flex items-center justify-between mb-1.5">
              {label && (
                <span
                  data-slot="password-strength-meter-label"
                  className="text-xs font-medium"
                >
                  {label}
                </span>
              )}
              {showScoreLabel && (
                <span
                  data-slot="password-strength-meter-score-label"
                  className={cn(
                    "text-xs font-semibold",
                    getStrengthColor(percent),
                  )}
                >
                  {scoreLabel ?? getStrengthLabel(percent)}
                </span>
              )}
            </div>
            <PasswordStrengthMeterBarAnimated
              style={{ transform: `scaleX(${percent / 100})` }}
            />
          </>
        )}
      </motion.div>
    </PasswordStrengthMeterContext.Provider>
  );
}

PasswordStrengthMeterAnimated.displayName = "PasswordStrengthMeter";

export function PasswordStrengthMeterBarAnimated({
  className,
  style,
  ref,
  ...rest
}: PasswordStrengthMeterSectionProps & {
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const { size, shape, animated, segmented } = usePasswordStrengthMeterContext(
    "PasswordStrengthMeterBar",
  );

  return (
    <div
      data-slot="password-strength-meter-track"
      className={cn(
        passwordStrengthMeterTrackVariants({ size, shape }),
        "text-current",
      )}
    >
      <motion.div
        ref={ref}
        data-slot="password-strength-meter-bar"
        className={cn(
          passwordStrengthMeterBarVariants({ segmented }),
          className,
        )}
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

PasswordStrengthMeterBarAnimated.displayName = "PasswordStrengthMeterBar";
