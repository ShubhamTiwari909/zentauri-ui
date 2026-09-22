"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

import { cn } from "../../lib/utils";

import type { ImageCompareCssProperties, ImageCompareProps } from "./types";
import {
  imageCompareDividerVariants,
  imageCompareHandleVariants,
  imageCompareLabelVariants,
  imageCompareLayerVariants,
  imageCompareVariants,
} from "./variants";

function clampPosition(value: number, fallback = 50) {
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : fallback;
}

export function ImageCompareBase({
  before,
  after,
  position,
  defaultPosition = 50,
  onPositionChange,
  step = 1,
  beforeLabel = "Before",
  afterLabel = "After",
  separatorLabel = "Image comparison position",
  appearance = "default",
  size = "md",
  radius = "md",
  disabled = false,
  className,
  style,
  ref,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  ...rest
}: ImageCompareProps) {
  const [uncontrolledPosition, setUncontrolledPosition] = useState(() =>
    clampPosition(defaultPosition),
  );
  const activePointer = useRef<number | null>(null);
  const controlled = position !== undefined;
  const currentPosition = clampPosition(
    controlled ? position : uncontrolledPosition,
  );
  const resolvedStep = Number.isFinite(step) && step > 0 ? step : 1;

  const updatePosition = useCallback(
    (next: number) => {
      const clamped = clampPosition(next);
      if (!controlled) setUncontrolledPosition(clamped);
      if (clamped !== currentPosition) onPositionChange?.(clamped);
    },
    [controlled, currentPosition, onPositionChange],
  );

  const updateFromPointer = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width <= 0) return;
      updatePosition(((event.clientX - rect.left) / rect.width) * 100);
    },
    [updatePosition],
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event);
    if (event.defaultPrevented || disabled) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateFromPointer(event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (disabled || activePointer.current !== event.pointerId) return;
    updateFromPointer(event);
  };

  const finishPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    activePointer.current = null;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    onPointerUp?.(event);
    finishPointer(event);
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(event);
    finishPointer(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    let next = currentPosition;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next -= resolvedStep;
        break;
      case "ArrowRight":
      case "ArrowUp":
        next += resolvedStep;
        break;
      case "PageDown":
        next -= resolvedStep * 10;
        break;
      case "PageUp":
        next += resolvedStep * 10;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = 100;
        break;
      default:
        return;
    }
    event.preventDefault();
    updatePosition(next);
  };

  const rootStyle: ImageCompareCssProperties = {
    ...style,
    "--image-compare-position": `${currentPosition}%`,
  };

  return (
    <div
      {...rest}
      ref={ref}
      data-slot="image-compare"
      data-disabled={disabled || undefined}
      className={cn(
        imageCompareVariants({ appearance, size, radius, disabled }),
        "aspect-video",
        className,
      )}
      style={rootStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div
        data-slot="image-compare-after"
        className={imageCompareLayerVariants({ side: "after" })}
      >
        {after}
      </div>
      <div
        data-slot="image-compare-before"
        className={imageCompareLayerVariants({ side: "before" })}
        style={{ clipPath: `inset(0 ${100 - currentPosition}% 0 0)` }}
      >
        {before}
      </div>

      {beforeLabel ? (
        <span
          data-slot="image-compare-before-label"
          className={imageCompareLabelVariants({ side: "before" })}
        >
          {beforeLabel}
        </span>
      ) : null}
      {afterLabel ? (
        <span
          data-slot="image-compare-after-label"
          className={imageCompareLabelVariants({ side: "after" })}
        >
          {afterLabel}
        </span>
      ) : null}

      <div
        data-slot="image-compare-divider"
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={separatorLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(currentPosition)}
        aria-valuetext={`${Math.round(currentPosition)}% before`}
        aria-disabled={disabled || undefined}
        className={imageCompareDividerVariants()}
        style={{ left: `${currentPosition}%` }}
        onKeyDown={handleKeyDown}
      >
        <span
          data-slot="image-compare-handle"
          className={imageCompareHandleVariants()}
          aria-hidden="true"
        >
          <span className="-translate-x-0.5">‹</span>
          <span className="translate-x-0.5">›</span>
        </span>
      </div>
    </div>
  );
}

ImageCompareBase.displayName = "ImageCompare";
