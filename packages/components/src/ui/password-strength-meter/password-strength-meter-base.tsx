"use client";

import { createContext, useContext, useMemo, useId } from "react";

import { cn, clamp } from "../../lib/utils";

import type {
  PasswordStrengthMeterProps,
  PasswordStrengthMeterSectionProps,
  PasswordStrengthMeterCtx,
} from "./types";
import {
  passwordStrengthMeterBarVariants,
  passwordStrengthMeterTrackVariants,
  passwordStrengthMeterVariants,
} from "./variants";

export const PasswordStrengthMeterContext =
  createContext<PasswordStrengthMeterCtx | null>(null);

export function usePasswordStrengthMeterContext(
  component: string,
): PasswordStrengthMeterCtx {
  const ctx = useContext(PasswordStrengthMeterContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <PasswordStrengthMeter>`);
  }
  return ctx;
}

export function getStrengthLabel(percent: number): string {
  if (percent <= 20) return "Weak";
  if (percent <= 40) return "Fair";
  if (percent <= 60) return "Good";
  if (percent <= 80) return "Strong";
  return "Very strong";
}

export function getStrengthColor(percent: number): string {
  if (percent <= 20)
    return "text-[var(--zui-status-error,#dc2626)] dark:text-[var(--zui-status-error-dark,#ef4444)]";
  if (percent <= 40)
    return "text-[var(--zui-color-orange,#ea580c)] dark:text-[var(--zui-color-orange-dark,#fb923c)]";
  if (percent <= 60)
    return "text-[var(--zui-color-yellow,#ca8a04)] dark:text-[var(--zui-color-yellow-dark,#facc15)]";
  if (percent <= 80)
    return "text-[var(--zui-color-emerald,#16a34a)] dark:text-[var(--zui-color-emerald-dark,#22c55e)]";
  return "text-[var(--zui-color-indigo,#4338ca)] dark:text-[var(--zui-color-indigo-dark,#818cf8)]";
}

export function PasswordStrengthMeterBase(props: PasswordStrengthMeterProps) {
  const {
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
    as: Wrapper = "div",
    ...rest
  } = props;
  const clamped = clamp(value, min, max);
  const percent = max === min ? 0 : ((clamped - min) / (max - min)) * 100;
  const labelSlotId = `${useId()}-password-strength-meter-label`;
  const hasInlineLabelProp = Boolean(label?.trim().length);

  const labelingProps = useMemo(() => {
    if (hasInlineLabelProp) {
      return { "aria-label": label?.trim() ?? "Password strength" };
    }
    return { "aria-labelledby": labelSlotId };
  }, [hasInlineLabelProp, label, labelSlotId]);

  const ctx = useMemo(
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
    }),
    [
      animated,
      appearance,
      clamped,
      labelSlotId,
      max,
      min,
      shape,
      size,
      segmented,
    ],
  );

  return (
    <PasswordStrengthMeterContext.Provider value={ctx}>
      <Wrapper
        ref={ref}
        data-slot="password-strength-meter"
        role="meter"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-valuetext={getStrengthLabel(percent)}
        {...labelingProps}
        className={cn(
          passwordStrengthMeterVariants({ appearance, size, shape }),
          className,
        )}
        {...rest}
      >
        {children ?? (
          <>
            {(label || showScoreLabel) && (
              <div className="flex items-center justify-between mb-1.5">
                {label && (
                  <span
                    id={labelSlotId}
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
            )}
            <PasswordStrengthMeterBar
              style={{ transform: `scaleX(${percent / 100})` }}
            />
          </>
        )}
      </Wrapper>
    </PasswordStrengthMeterContext.Provider>
  );
}

PasswordStrengthMeterBase.displayName = "PasswordStrengthMeter";

export function PasswordStrengthMeterBar({
  className,
  style,
  ref,
  as: Wrapper = "div",
  ...rest
}: PasswordStrengthMeterSectionProps & {
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const { size, shape, animated, segmented } = usePasswordStrengthMeterContext(
    "PasswordStrengthMeterBar",
  );

  return (
    <Wrapper
      data-slot="password-strength-meter-track"
      className={cn(
        passwordStrengthMeterTrackVariants({ size, shape }),
        "text-current",
      )}
    >
      <div
        ref={ref}
        data-slot="password-strength-meter-bar"
        className={cn(
          passwordStrengthMeterBarVariants({ segmented }),
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

PasswordStrengthMeterBar.displayName = "PasswordStrengthMeterBar";
