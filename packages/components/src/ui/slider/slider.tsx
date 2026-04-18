"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type Ref,
  type RefObject,
} from "react";

import { cn } from "../../lib/utils";

import type {
  RangeSliderProps,
  SliderCtx,
  SliderProps,
  SliderRangeProps,
  SliderThumbProps,
  SliderTrackProps,
} from "./types";
import {
  sliderRangeVariants,
  sliderRootVariants,
  sliderThumbVariants,
  sliderTrackVariants,
} from "./variants";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function snapToStep(value: number, min: number, step: number) {
  const steps = Math.round((value - min) / step);
  return min + steps * step;
} 

const SliderContext = createContext<SliderCtx | null>(null);

function useSliderContext(component: string): SliderCtx {
  const ctx = useContext(SliderContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Slider>`);
  }
  return ctx;
}

function computeValueFromPointer(
  clientX: number,
  track: HTMLDivElement,
  min: number,
  max: number,
  step: number,
) {
  const rect = track.getBoundingClientRect();
  const ratio = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
  const raw = min + ratio * (max - min);
  return snapToStep(clamp(raw, min, max), min, step);
}

export function Slider({
  className,
  size = "md",
  min = 0,
  max = 100,
  step = 1,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled = false,
  appearance = "default",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  ref,
  ...rest
}: SliderProps & { ref?: Ref<HTMLDivElement> }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue ?? min,
  );
  const value = isControlled ? (valueProp as number) : uncontrolled;

  const setValue = useCallback(
    (next: number) => {
      const clamped = clamp(snapToStep(next, min, step), min, max);
      if (!isControlled) {
        setUncontrolled(clamped);
      }
      onValueChange?.(clamped);
    },
    [isControlled, max, min, onValueChange, step],
  );

  const ctx = useMemo(
    () => ({
      min,
      max,
      step,
      value: clamp(snapToStep(value, min, step), min, max),
      setValue,
      disabled,
      size: size ?? "md",
      appearance: appearance ?? "default",
      trackRef,
    }),
    [appearance, disabled, max, min, setValue, size, step, value],
  );

  return (
    <SliderContext.Provider value={ctx}>
      <div
        ref={ref}
        data-slot="slider"
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(sliderRootVariants({ size }), className)}
        {...rest}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
}

Slider.displayName = "Slider";

export function SliderTrack({
  className,
  ref: refProp,
  ...rest
}: SliderTrackProps & { ref?: Ref<HTMLDivElement> }) {
  const { size, trackRef } = useSliderContext("SliderTrack");

  return (
    <div
      ref={(node) => {
        trackRef.current = node;
        if (typeof refProp === "function") {
          refProp(node);
        } else if (refProp) {
          (refProp as RefObject<HTMLDivElement | null>).current = node;
        }
      }}
      data-slot="slider-track"
      className={cn(sliderTrackVariants({ size }), className)}
      {...rest}
    />
  );
}

SliderTrack.displayName = "SliderTrack";

export function SliderRange({
  className,
  ref,
  ...rest
}: SliderRangeProps & { ref?: Ref<HTMLDivElement> }) {
  const { min, max, value, appearance } = useSliderContext("SliderRange");
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
  return (
    <div
      ref={ref}
      data-slot="slider-range"
      className={cn(sliderRangeVariants({ appearance }), className)}
      style={{ width: `${pct}%` }}
      {...rest}
    />
  );
}

SliderRange.displayName = "SliderRange";

export function SliderThumb({
  className,
  ref: refProp,
  ...rest
}: SliderThumbProps & { ref?: Ref<HTMLDivElement> }) {
  const { min, max, value, step, setValue, disabled, size, trackRef } =
    useSliderContext("SliderThumb");
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }
      event.preventDefault();
      const track = trackRef.current;
      if (!track) {
        return;
      }
      event.currentTarget.setPointerCapture(event.pointerId);
      const move = (e: PointerEvent) => {
        setValue(computeValueFromPointer(e.clientX, track, min, max, step));
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [disabled, max, min, setValue, step, trackRef],
  );

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }
      const big = (max - min) / 10;
      let delta = 0;
      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        delta = step;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        delta = -step;
      } else if (event.key === "PageUp") {
        delta = big;
      } else if (event.key === "PageDown") {
        delta = -big;
      } else if (event.key === "Home") {
        event.preventDefault();
        setValue(min);
        return;
      } else if (event.key === "End") {
        event.preventDefault();
        setValue(max);
        return;
      } else {
        return;
      }
      event.preventDefault();
      setValue(value + delta);
    },
    [disabled, max, min, setValue, step, value],
  );

  return (
    <div
      ref={(node) => {
        if (typeof refProp === "function") {
          refProp(node);
        } else if (refProp) {
          (refProp as RefObject<HTMLDivElement | null>).current = node;
        }
      }}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      data-slot="slider-thumb"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled || undefined}
      className={cn(
        "absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
        sliderThumbVariants({ size }),
        className,
      )}
      style={{ left: `${pct}%` }}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      {...rest}
    />
  );
}

SliderThumb.displayName = "SliderThumb";

export function RangeSlider({
  className,
  size = "md",
  min = 0,
  max = 100,
  step = 1,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled = false,
  appearance = "default",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ref,
  ...rest
}: RangeSliderProps & { ref?: Ref<HTMLDivElement> }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState<[number, number]>(() => {
    const seed = defaultValue ?? [min, max];
    const lo = clamp(snapToStep(seed[0], min, step), min, max);
    const hi = clamp(snapToStep(seed[1], min, step), min, max);
    return lo <= hi ? [lo, hi] : [hi, lo];
  });

  const value = isControlled ? (valueProp as [number, number]) : uncontrolled;
  const [lo, hi] =
    value[0] <= value[1]
      ? [value[0], value[1]]
      : [value[1], value[0]];

  const setPair = useCallback(
    (next: [number, number]) => {
      const a = clamp(snapToStep(next[0], min, step), min, max);
      const b = clamp(snapToStep(next[1], min, step), min, max);
      const ordered: [number, number] = a <= b ? [a, b] : [b, a];
      if (!isControlled) {
        setUncontrolled(ordered);
      }
      onValueChange?.(ordered);
    },
    [isControlled, max, min, onValueChange, step],
  );

  const moveThumb = useCallback(
    (index: 0 | 1, clientX: number) => {
      const track = trackRef.current;
      if (!track) {
        return;
      }
      const raw = computeValueFromPointer(clientX, track, min, max, step);
      if (index === 0) {
        setPair([raw, hi]);
      } else {
        setPair([lo, raw]);
      }
    },
    [hi, lo, max, min, setPair, step],
  );

  const loPct = max === min ? 0 : ((lo - min) / (max - min)) * 100;
  const hiPct = max === min ? 0 : ((hi - min) / (max - min)) * 100;
  const resolvedSize = size ?? "md";

  return (
    <div
      ref={ref}
      data-slot="range-slider"
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-valuetext={`${lo} – ${hi}`}
      className={cn(sliderRootVariants({ size: resolvedSize }), className)}
      {...rest}
    >
      <div
        ref={trackRef}
        data-slot="slider-track"
        className={cn(sliderTrackVariants({ size: resolvedSize }), "relative")}
      >
        <div
          data-slot="slider-range"
          className={cn(sliderRangeVariants({ appearance }), "absolute")}
          style={{
            left: `${loPct}%`,
            width: `${Math.max(hiPct - loPct, 0)}%`,
          }}
        />
        <RangeThumb
          disabled={disabled}
          size={resolvedSize}
          value={lo}
          min={min}
          max={max}
          step={step}
          positionPct={loPct}
          trackRef={trackRef}
          onMoveClientX={(x) => moveThumb(0, x)}
          onNudge={(delta) => setPair([lo + delta, hi])}
        />
        <RangeThumb
          disabled={disabled}
          size={resolvedSize}
          value={hi}
          min={min}
          max={max}
          step={step}
          positionPct={hiPct}
          trackRef={trackRef}
          onMoveClientX={(x) => moveThumb(1, x)}
          onNudge={(delta) => setPair([lo, hi + delta])}
        />
      </div>
    </div>
  );
}

RangeSlider.displayName = "RangeSlider";

type RangeThumbProps = {
  disabled: boolean;
  size: "sm" | "md" | "lg";
  value: number;
  min: number;
  max: number;
  step: number;
  positionPct: number;
  trackRef: RefObject<HTMLDivElement | null>;
  onMoveClientX: (clientX: number) => void;
  onNudge: (delta: number) => void;
};

function RangeThumb({
  disabled,
  size,
  value,
  min,
  max,
  step,
  positionPct,
  trackRef,
  onMoveClientX,
  onNudge,
}: RangeThumbProps) {
  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }
      event.preventDefault();
      const track = trackRef.current;
      if (!track) {
        return;
      }
      event.currentTarget.setPointerCapture(event.pointerId);
      const move = (e: PointerEvent) => {
        onMoveClientX(e.clientX);
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [disabled, onMoveClientX, trackRef],
  );

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }
      const big = (max - min) / 10;
      let delta = 0;
      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        delta = step;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        delta = -step;
      } else if (event.key === "PageUp") {
        delta = big;
      } else if (event.key === "PageDown") {
        delta = -big;
      } else if (event.key === "Home") {
        event.preventDefault();
        onNudge(min - value);
        return;
      } else if (event.key === "End") {
        event.preventDefault();
        onNudge(max - value);
        return;
      } else {
        return;
      }
      event.preventDefault();
      onNudge(delta);
    },
    [disabled, max, min, onNudge, step, value],
  );

  return (
    <div
      role="slider"
      tabIndex={disabled ? -1 : 0}
      data-slot="range-slider-thumb"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled || undefined}
      className={cn(
        "absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
        sliderThumbVariants({ size }),
      )}
      style={{ left: `${positionPct}%` }}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
    />
  );
}
