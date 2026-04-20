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

/**
 * Restricts a numeric value to the inclusive interval [min, max].
 *
 * Values below `min` become `min`; values above `max` become `max`.
 * This is used after pointer math and keyboard deltas so the slider
 * never reports values outside the configured domain.
 *
 * Examples (min = 0, max = 100):
 * - clamp(120, 0, 100) → 100 (capped at max)
 * - clamp(-10, 0, 100) → 0 (raised to min)
 * - clamp(42, 0, 100) → 42 (unchanged)
 */
const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

/**
 * Maps an arbitrary number to the closest value aligned with `step`
 * relative to `min` (the “anchor” of the step grid).
 *
 * How it works:
 * 1. Measure how far `value` is from `min` in “step units”:
 *    (value - min) / step
 * 2. Round to the nearest whole number of steps.
 * 3. Reconstruct: min + (rounded steps) * step
 *
 * Example: min = 0, step = 10, value = 23
 * - steps = round((23 - 0) / 10) = round(2.3) = 2
 * - result = 0 + 2 * 10 = 20
 *
 * Note: This does not enforce [min, max]; pair with `clamp` when needed.
 */
const snapToStep = (value: number, min: number, step: number) => {
  const steps = Math.round((value - min) / step);
  return min + steps * step;
};

const SliderContext = createContext<SliderCtx | null>(null);

/**
 * Reads slider context; throws a descriptive error if a sub-part is used
 * outside `<Slider>` (helps catch invalid composition early).
 */
const useSliderContext = (component: string): SliderCtx => {
  const ctx = useContext(SliderContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Slider>`);
  }
  return ctx;
};

/**
 * Converts a horizontal pointer position (viewport X) into a slider value
 * in [min, max], snapped to `step`.
 *
 * Pipeline:
 * 1. Read the track’s bounding box so all math uses the same coordinate
 *    space as `clientX` (viewport coordinates from pointer events).
 * 2. Compute how far along the track the pointer sits as a ratio in [0, 1]:
 *    (clientX - trackLeft) / trackWidth. If width is 0, ratio is 0 to avoid
 *    division by zero.
 * 3. Linearly interpolate that ratio into the value domain:
 *    raw = min + ratio * (max - min).
 * 4. Clamp `raw` to [min, max], then snap to the nearest valid step so the
 *    result always matches discrete thumb positions.
 *
 * Worked example: track left = 100px, width = 200px, min = 0, max = 100,
 * pointer clientX = 150px
 * - ratio = (150 - 100) / 200 = 0.25
 * - raw = 0 + 0.25 * (100 - 0) = 25
 * - After clamp + snap (e.g. step 1), result stays 25
 */
const computeValueFromPointer = (
  clientX: number,
  track: HTMLDivElement,
  min: number,
  max: number,
  step: number,
) => {
  const rect = track.getBoundingClientRect();

  const ratio = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;

  const raw = min + ratio * (max - min);

  return snapToStep(clamp(raw, min, max), min, step);
};

/**
 * Root primitive for a single-value slider. Provides context (bounds, value,
 * disabled state, track ref) to `SliderTrack`, `SliderRange`, and `SliderThumb`.
 */
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

  /**
   * Mode selection (React’s standard controlled/uncontrolled pattern):
   *
   * - Controlled: `value` is passed from the parent. The parent is the source
   *   of truth; local state is not updated on drag. Use `onValueChange` to
   *   persist updates upward (e.g. into React state or a form library).
   *
   * - Uncontrolled: `value` is omitted. `defaultValue` (or `min` if absent)
   *   seeds internal state; drags and keyboard updates write to that state
   *   directly. `onValueChange` is still optional for side effects.
   *
   * Examples:
   * - Controlled: `<Slider value={50} onValueChange={setX} />`
   * - Uncontrolled: `<Slider defaultValue={50} />`
   */

  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? min);

  const value = isControlled ? (valueProp as number) : uncontrolled;

  const setValue = useCallback(
    (next: number) => {
      /**
       * Normalizes a candidate value before committing it:
       * 1. Snap to the nearest step anchored at `min`.
       * 2. Clamp into [min, max] so overshoots from keyboard or programmatic
       *    calls cannot escape the domain.
       * 3. If uncontrolled, mirror the result into local state so the thumb
       *    and range visuals stay in sync.
       * 4. Always invoke `onValueChange` when provided so parents receive the
       *    canonical value (even in controlled mode, after normalization).
       *
       * Example: min = 0, max = 100, step = 10, next = 27
       * → snap to 30 → clamp still 30 → emitted value 30
       */

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

      /**
       * Context consumers always see a value that is on-step and in-range.
       * If a controlled parent passes an out-of-band number (e.g. stale props
       * or a bug), we still render thumbs and ARIA attributes consistently
       * with the same snap/clamp rules as pointer and keyboard input.
       */
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

/**
 * The interactive rail whose geometry defines how pointer X maps to values.
 * Assigns the DOM node to context `trackRef` so thumbs can measure it.
 */
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

/** Filled portion from the start of the track up to the current value (width %). */
export function SliderRange({
  className,
  ref,
  ...rest
}: SliderRangeProps & { ref?: Ref<HTMLDivElement> }) {
  const { min, max, value, appearance } = useSliderContext("SliderRange");

  /**
   * Percentage along the track (0–100) representing the current value.
   *
   * Formula: ((value - min) / (max - min)) * 100. When min === max the range
   * is degenerate; we treat the percentage as 0 to avoid NaN.
   *
   * For the single-thumb slider, this percentage becomes the **width** of
   * the filled range segment (from the start of the track to the thumb).
   * The thumb itself uses the same mapping in `SliderThumb` for `left`.
   */
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

/**
 * Draggable thumb with ARIA `role="slider"`. Handles pointer drag (via window
 * listeners) and keyboard increments consistent with `min` / `max` / `step`.
 */
export function SliderThumb({
  className,
  ref: refProp,
  ...rest
}: SliderThumbProps & { ref?: Ref<HTMLDivElement> }) {
  const { min, max, value, step, setValue, disabled, size, trackRef } =
    useSliderContext("SliderThumb");
  /** Horizontal thumb position; same mapping as `SliderRange` width uses. */
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled) return;

      event.preventDefault();

      const track = trackRef.current;
      if (!track) return;

      /**
       * Keep receiving pointer events for this pointer id even when the
       * cursor leaves the thumb. Without capture, dragging quickly could
       * “drop” the thumb when the pointer exits the small hit target.
       */
      event.currentTarget.setPointerCapture(event.pointerId);

      const move = (e: PointerEvent) => {
        /**
         * On each move, project the pointer X onto the track geometry, then
         * run the same snap/clamp pipeline as a click would. `setValue`
         * deduplicates invalid states for controlled parents.
         */
        setValue(computeValueFromPointer(e.clientX, track, min, max, step));
      };

      const up = () => {
        /** Tear down window listeners once the gesture ends (any button). */
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
      if (disabled) return;

      /**
       * Page Up / Page Down move by one tenth of the value span (not one
       * tenth of the thumb travel). This scales with custom min/max ranges.
       */
      const big = (max - min) / 10;

      let delta = 0;

      /**
       * Keyboard model (WAI-ARIA slider conventions, adapted to our step):
       * - Arrow Right / Up: increase by one `step`.
       * - Arrow Left / Down: decrease by one `step`.
       * - Page Up / Down: coarse adjust by `big` (±10% of range).
       * - Home / End: jump to min or max (bypasses incremental delta).
       * Unrecognized keys are ignored without calling `preventDefault`.
       */
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

      /**
       * Apply the accumulated delta on top of the current value; `setValue`
       * performs snap + clamp so the outcome is always valid.
       *
       * Illustration with min = 0, max = 100, step = 10, value = 40:
       * - ArrowRight: delta +10 → candidate 50 → stays 50
       * - ArrowLeft: delta -10 → candidate 30
       * - PageUp: delta +10 (when big = 10) → 50; PageDown → 30
       * - Home / End handled above with direct `setValue(min|max)`
       */
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

/**
 * Two-thumb range control on one track. Inlines track/range for layout speed;
 * thumbs delegate drag math through `moveThumb` / `setPair` to keep ordering
 * and snapping identical to the single slider helpers.
 */
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

    /**
     * Initial pair: normalize each endpoint independently so both ends sit
     * on the step grid and respect [min, max] before any ordering logic runs.
     *
     * Example: min = 0, max = 100, step = 10, seed[0] = 85
     * → snap to 80 → clamp still 80.
     */
    const lo = clamp(snapToStep(seed[0], min, step), min, max);
    const hi = clamp(snapToStep(seed[1], min, step), min, max);

    /**
     * Canonical order is always [lower, higher]. If the consumer passes
     * reversed defaults (e.g. [80, 20]), we swap so downstream math assumes
     * lo ≤ hi for range width and thumb assignment.
     */
    return lo <= hi ? [lo, hi] : [hi, lo];
  });

  const value = isControlled ? (valueProp as [number, number]) : uncontrolled;

  /**
   * Derive ordered endpoints for rendering and hit-testing math. Controlled
   * parents might briefly pass reversed tuples; we normalize every render so
   * `lo` is the left/low thumb and `hi` is the right/high thumb.
   */
  const [lo, hi] =
    value[0] <= value[1] ? [value[0], value[1]] : [value[1], value[0]];

  /**
   * Commits a new [low, high] pair: used by drags, keyboard nudges, and
   * internal clamping. Each thumb only mutates its own side, but we always
   * pass through here so both values stay snapped and ordered.
   *
   * Example: current [20, 80], dragging the low thumb
   * → calls like setPair([newLow, 80]); the high endpoint is preserved until
   *   the other thumb moves.
   */
  const setPair = useCallback(
    (next: [number, number]) => {
      /**
       * Per-endpoint snap + clamp, same rules as the single slider. Handles
       * overshoot from pointer projection or programmatic updates.
       *
       * Example: min = 0, max = 100, step = 10, next = [27, 85]
       * → [30, 80] after snap/clamp (85 cannot exceed max but also snaps down).
       */
      const a = clamp(snapToStep(next[0], min, step), min, max);
      const b = clamp(snapToStep(next[1], min, step), min, max);

      /**
       * Re-order after independent normalization so the tuple is always
       * [smaller, larger], keeping the range bar width non-negative.
       */
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
      if (!track) return;

      const raw = computeValueFromPointer(clientX, track, min, max, step);

      /**
       * Which thumb is active is explicit (`index`), so we only replace that
       * side of the pair and keep the opposite endpoint fixed. `setPair` will
       * still snap/clamp and may collapse the range if thumbs cross (handled
       * by ordering inside `setPair`).
       *
       * index 0: low thumb → `[raw, hi]`
       * index 1: high thumb → `[lo, raw]`
       */
      if (index === 0) {
        setPair([raw, hi]);
      } else {
        setPair([lo, raw]);
      }
    },
    [hi, lo, max, min, setPair, step],
  );

  /**
   * Map both endpoints to percentages along the track for layout:
   * - `left` on the range fill uses `loPct` (where the selected interval starts).
   * - `width` uses `hiPct - loPct` (how wide the interval is), floored at 0
   *   if the thumbs coincide.
   *
   * Example: min = 0, max = 100, lo = 20, hi = 80
   * - loPct = 20%, hiPct = 80%
   * - Range bar: left 20%, width 60%
   */
  const loPct = ((lo - min) / (max - min)) * 100;
  const hiPct = ((hi - min) / (max - min)) * 100;

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
  /** Called on pointer move with viewport X; parent decides which bound updates. */
  onMoveClientX: (clientX: number) => void;
  /** Relative keyboard adjustment in value units; parent merges into the pair. */
  onNudge: (delta: number) => void;
};

/** Private thumb implementation shared by the low and high endpoints. */
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
      /** Same capture strategy as `SliderThumb` for reliable dragging. */
      event.currentTarget.setPointerCapture(event.pointerId);
      const move = (e: PointerEvent) => {
        /** Parent maps X → new value for this thumb only. */
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
      /**
       * Keyboard deltas mirror the single-thumb slider, but we express jumps
       * as `onNudge(min - value)` / `onNudge(max - value)` so Home/End move
       * **this** thumb to the domain edge without hardcoding sibling values.
       */
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
