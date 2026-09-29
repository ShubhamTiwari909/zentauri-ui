"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "../../lib/utils";
import { numberInputVariants } from "./variants";
import type { NumberInputProps } from "./types";

const toText = (value: number | null | undefined) =>
  value == null ? "" : String(value);
const isNumericDraft = (text: string) => /^-?(?:\d+)?(?:\.\d*)?$/.test(text);
const parseDraft = (text: string) =>
  text === "" || text === "-" || text === "." || text === "-."
    ? null
    : Number(text);
const clamp = (value: number, min?: number, max?: number) =>
  Math.min(max ?? Infinity, Math.max(min ?? -Infinity, value));

export function NumberInputBase({
  value,
  defaultValue = null,
  onValueChange,
  min,
  max,
  step = 1,
  showControls = true,
  disabled,
  readOnly,
  appearance,
  size,
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  onBlur,
  onKeyDown,
  onInput,
  ref,
  ...rest
}: NumberInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<number | null>(defaultValue);
  const current = controlled ? value : internal;
  const [draft, setDraft] = useState(toText(current));
  useEffect(() => {
    if (controlled) setDraft(toText(value));
  }, [controlled, value]);
  const validStep = Number.isFinite(step) && step > 0 ? step : 1;
  const lower = min !== undefined && Number.isFinite(min) ? min : undefined;
  const upper = max !== undefined && Number.isFinite(max) ? max : undefined;

  const publish = (next: number | null) => {
    if (!controlled) setInternal(next);
    onValueChange?.(next);
  };
  const stepBy = (direction: number) => {
    if (disabled || readOnly) return;
    const base = parseDraft(draft) ?? current ?? lower ?? 0;
    const precision = Math.max(
      (String(validStep).split(".")[1] ?? "").length,
      (String(base).split(".")[1] ?? "").length,
    );
    const multiplier = 10 ** Math.min(precision, 10);
    const next = clamp(
      Math.round((base + direction * validStep) * multiplier) / multiplier,
      lower,
      upper,
    );
    setDraft(toText(next));
    if (!Object.is(next, current)) publish(next);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const parsed = parseDraft(draft);
    const next =
      parsed == null || !Number.isFinite(parsed)
        ? current
        : clamp(parsed, lower, upper);
    setDraft(toText(next));
    if (!Object.is(next, current)) publish(next);
    onBlur?.(event);
  };
  return (
    <div
      data-slot="number-input"
      data-disabled={disabled || undefined}
      className={cn(numberInputVariants({ appearance, size }), className)}
    >
      {showControls && (
        <button
          type="button"
          data-slot="number-input-decrement"
          aria-label="Decrease value"
          disabled={
            disabled ||
            readOnly ||
            (lower !== undefined &&
              (parseDraft(draft) ?? current ?? lower) <= lower)
          }
          onClick={() => stepBy(-1)}
          className="rounded-md px-1.5 focus-visible:outline-2 disabled:opacity-40"
        >
          −
        </button>
      )}
      <input
        {...rest}
        ref={ref}
        id={inputId}
        data-slot="number-input-control"
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-valuemin={lower}
        aria-valuemax={upper}
        aria-valuenow={parseDraft(draft) ?? undefined}
        value={draft}
        disabled={disabled}
        readOnly={readOnly}
        className="w-full min-w-0 flex-1 bg-transparent text-center tabular-nums outline-none placeholder:opacity-60"
        onInput={(event) => {
          const next = event.currentTarget.value;
          if (!isNumericDraft(next)) {
            event.currentTarget.value = draft;
            return;
          }
          setDraft(next);
          const parsed = parseDraft(next);
          if (
            next !== "-" &&
            !next.endsWith(".") &&
            (parsed === null || Number.isFinite(parsed))
          ) {
            if (!Object.is(parsed, current)) publish(parsed);
          }
          onInput?.(event);
        }}
        onBlur={handleBlur}
        onKeyDown={(event) => {
          if (disabled || readOnly) {
            onKeyDown?.(event);
            return;
          }
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            stepBy(event.key === "ArrowUp" ? 1 : -1);
          } else if (event.key === "Home" && lower !== undefined) {
            event.preventDefault();
            setDraft(toText(lower));
            publish(lower);
          } else if (event.key === "End" && upper !== undefined) {
            event.preventDefault();
            setDraft(toText(upper));
            publish(upper);
          }
          onKeyDown?.(event);
        }}
      />
      {showControls && (
        <button
          type="button"
          data-slot="number-input-increment"
          aria-label="Increase value"
          disabled={
            disabled ||
            readOnly ||
            (upper !== undefined &&
              (parseDraft(draft) ?? current ?? upper) >= upper)
          }
          onClick={() => stepBy(1)}
          className="rounded-md px-1.5 focus-visible:outline-2 disabled:opacity-40"
        >
          +
        </button>
      )}
    </div>
  );
}
