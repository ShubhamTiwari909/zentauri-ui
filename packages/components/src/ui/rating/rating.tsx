"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useId,
  useState,
} from "react";
import { FaFire, FaHeart, FaStar, FaThumbsUp } from "react-icons/fa";
import type { IconType } from "react-icons";

import {
  zuiRatingControlBase,
  zuiRatingErrorBase,
  zuiRatingGroupBase,
  zuiRatingHintBase,
  zuiRatingLabelBase,
  zuiRatingRootBase,
} from "../../design-system/rating";
import { cn } from "../../lib/utils";

import type { RatingPresetIcon, RatingProps } from "./types";
import { ratingIconVariants, ratingItemVariants } from "./variants";

const PRESET_ICONS: Record<RatingPresetIcon, IconType> = {
  star: FaStar,
  heart: FaHeart,
  flame: FaFire,
  thumb: FaThumbsUp,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function normalizeMax(max: number | undefined): number {
  const resolved = Number.isFinite(max) ? Number(max) : 5;
  return Math.max(1, Math.min(10, Math.floor(resolved)));
}

function normalizeValue(
  value: number | undefined,
  max: number,
  allowHalf: boolean,
): number {
  const resolved = Number.isFinite(value) ? Number(value) : 0;
  const step = allowHalf ? 0.5 : 1;
  return clamp(Math.round(resolved / step) * step, 0, max);
}

function defaultGetLabel(value: number, max: number): string {
  return `${value} of ${max}`;
}

function resolveIcon(icon: RatingProps["icon"]): IconType {
  if (!icon) {
    return PRESET_ICONS.star;
  }

  return typeof icon === "string" ? PRESET_ICONS[icon] : icon;
}

export function Rating(props: RatingProps) {
  const {
    allowClear = false,
    allowHalf = false,
    appearance,
    className,
    defaultValue = 0,
    disabled,
    errorMessage,
    getLabel = defaultGetLabel,
    hint,
    icon,
    iconClassName,
    id,
    label,
    max = 5,
    name,
    onValueChange,
    readOnly,
    ref,
    size,
    value,
    ...rest
  } = props;

  const generatedId = useId();
  const rootId = id ?? generatedId;
  const resolvedMax = normalizeMax(max);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    normalizeValue(defaultValue, resolvedMax, allowHalf),
  );
  const [hoverValue, setHoverValue] = useState<number | undefined>();
  const resolvedValue = normalizeValue(
    isControlled ? value : uncontrolledValue,
    resolvedMax,
    allowHalf,
  );
  const displayValue = hoverValue ?? resolvedValue;
  const Icon = resolveIcon(icon);
  const interactive = !disabled && !readOnly;
  const controlsDisabled = disabled || readOnly;
  const step = allowHalf ? 0.5 : 1;
  const labelId = `${rootId}-label`;
  const hintId = `${rootId}-hint`;
  const errorId = `${rootId}-error`;
  const describedBy = [
    hint !== undefined ? hintId : undefined,
    errorMessage !== undefined ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const commitValue = useCallback(
    (nextValue: number) => {
      const normalized = normalizeValue(nextValue, resolvedMax, allowHalf);
      const next = allowClear && normalized === resolvedValue ? 0 : normalized;

      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [
      allowClear,
      allowHalf,
      isControlled,
      onValueChange,
      resolvedMax,
      resolvedValue,
    ],
  );

  const getPointerValue = useCallback(
    (
      event: PointerEvent<HTMLButtonElement>,
      fullValue: number,
      fallbackValue: number,
    ) => {
      if (!allowHalf) {
        return fullValue;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width === 0) {
        return fallbackValue;
      }

      const midpoint = rect.left + rect.width / 2;
      return event.clientX < midpoint ? fullValue - 0.5 : fullValue;
    },
    [allowHalf],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (!interactive) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        event.preventDefault();
        commitValue(clamp(resolvedValue + step, step, resolvedMax));
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        event.preventDefault();
        commitValue(clamp(resolvedValue - step, 0, resolvedMax));
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        commitValue(step);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        commitValue(resolvedMax);
      }
    },
    [commitValue, interactive, resolvedMax, resolvedValue, step],
  );

  return (
    <div
      ref={ref}
      id={rootId}
      className={cn(zuiRatingRootBase, className)}
      data-disabled={disabled ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      data-slot="rating"
      {...rest}
    >
      {label !== undefined && (
        <p id={labelId} className={zuiRatingLabelBase}>
          {label}
        </p>
      )}
      {hint !== undefined && (
        <p id={hintId} className={zuiRatingHintBase}>
          {hint}
        </p>
      )}
      <div
        aria-describedby={describedBy || undefined}
        aria-invalid={errorMessage !== undefined ? true : undefined}
        aria-labelledby={label !== undefined ? labelId : undefined}
        aria-label={label === undefined ? "Rating" : undefined}
        className={zuiRatingGroupBase}
        data-slot="rating-group"
        onPointerLeave={() => setHoverValue(undefined)}
        role="radiogroup"
      >
        {Array.from({ length: resolvedMax }, (_, index) => {
          const fullValue = index + 1;
          const fillAmount = clamp(displayValue - index, 0, 1);
          const clipStyle = {
            clipPath: `inset(0 ${100 - fillAmount * 100}% 0 0)`,
          } satisfies CSSProperties;
          const itemOptions = allowHalf
            ? [fullValue - 0.5, fullValue]
            : [fullValue];

          return (
            <span
              key={fullValue}
              className={ratingItemVariants({ size })}
              data-interactive={interactive ? "true" : undefined}
              data-slot="rating-item"
            >
              <Icon
                aria-hidden="true"
                className={cn("col-start-1 row-start-1", iconClassName)}
              />
              <Icon
                aria-hidden="true"
                className={cn(
                  ratingIconVariants({ appearance }),
                  iconClassName,
                )}
                data-slot="rating-icon-fill"
                style={clipStyle}
              />
              {itemOptions.map((optionValue, optionIndex) => (
                <button
                  key={optionValue}
                  type="button"
                  aria-checked={resolvedValue === optionValue}
                  aria-label={getLabel(optionValue, resolvedMax)}
                  className={cn(
                    zuiRatingControlBase,
                    allowHalf
                      ? optionIndex === 0
                        ? "left-0 w-1/2"
                        : "right-0 w-1/2"
                      : "inset-x-0",
                  )}
                  data-slot="rating-control"
                  disabled={controlsDisabled}
                  onClick={() => {
                    if (interactive) {
                      commitValue(optionValue);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  onPointerEnter={(event) => {
                    if (interactive) {
                      setHoverValue(
                        getPointerValue(event, fullValue, optionValue),
                      );
                    }
                  }}
                  onPointerMove={(event) => {
                    if (interactive) {
                      setHoverValue(
                        getPointerValue(event, fullValue, optionValue),
                      );
                    }
                  }}
                  role="radio"
                  tabIndex={
                    resolvedValue === optionValue ||
                    (resolvedValue === 0 && optionValue === step)
                      ? 0
                      : -1
                  }
                />
              ))}
            </span>
          );
        })}
      </div>
      {name !== undefined && (
        <input
          type="hidden"
          name={name}
          value={resolvedValue}
          disabled={disabled}
        />
      )}
      {errorMessage !== undefined && (
        <p id={errorId} className={zuiRatingErrorBase}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

Rating.displayName = "Rating";
