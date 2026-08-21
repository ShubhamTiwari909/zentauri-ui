"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  KeyboardEvent,
  MutableRefObject,
  PointerEvent as ReactPointerEvent,
  Ref,
} from "react";

import { cn } from "../../lib/utils";

import type {
  SlideToCompleteContextValue,
  SlideToCompleteIconProps,
  SlideToCompleteLabelProps,
  SlideToCompleteProgressProps,
  SlideToCompleteProps,
  SlideToCompleteRootProps,
  SlideToCompleteState,
  SlideToCompleteThumbProps,
  SlideToCompleteTrackProps,
} from "./types";
import {
  slideToCompleteIconVariants,
  slideToCompleteLabelVariants,
  slideToCompleteProgressVariants,
  slideToCompleteThumbVariants,
  slideToCompleteTrackVariants,
  slideToCompleteVariants,
} from "./variants";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getThumbInsetPx(
  thumbEl: HTMLElement,
  direction: "ltr" | "rtl",
): number {
  const style = window.getComputedStyle(thumbEl);
  const raw = direction === "rtl" ? style.right : style.left;
  return parseFloat(raw) || 0;
}

function getDragBounds(
  trackEl: HTMLElement,
  thumbEl: HTMLElement,
  direction: "ltr" | "rtl",
) {
  const trackRect = trackEl.getBoundingClientRect();
  const thumbRect = thumbEl.getBoundingClientRect();
  const insetPx = getThumbInsetPx(thumbEl, direction);
  const maxX = Math.max(trackRect.width - thumbRect.width - insetPx * 2, 0);
  return { trackRect, thumbRect, maxX };
}

function composeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

const SlideToCompleteContext =
  createContext<SlideToCompleteContextValue | null>(null);

function useSlideToCompleteContext(component: string) {
  const ctx = useContext(SlideToCompleteContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <SlideToComplete.Root>`);
  }
  return ctx;
}

/**
 * The interaction lifecycle only ever holds one ephemeral phase at a time so
 * disabled/loading/error/completed can't combine into an invalid state.
 */
type Phase = "idle" | "dragging" | "resetting" | "completed";

const RESET_TRANSITION_MS = 260;
const KEYBOARD_STEP = 0.1;

export function SlideToCompleteRoot({
  appearance = "default",
  size = "md",
  threshold = 0.9,
  disabled = false,
  loading = false,
  success = false,
  error = false,
  resetOnRelease = true,
  direction = "ltr",
  value,
  defaultValue = false,
  onValueChange,
  onComplete,
  onProgressChange,
  onDragStart,
  onReset,
  className,
  style,
  children,
  ref,
  ...rest
}: SlideToCompleteRootProps) {
  const isControlled = value !== undefined;
  const [phase, setPhase] = useState<Phase>(
    defaultValue ? "completed" : "idle",
  );
  const [internalProgress, setInternalProgress] = useState(
    defaultValue ? 1 : 0,
  );
  const [maxDragDistance, setMaxDragDistance] = useState(0);
  const [labelCount, setLabelCount] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLButtonElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);
  const completingRef = useRef(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseId = useId();
  const labelId = `${baseId}-label`;

  const clampedThreshold = clamp(threshold, 0, 1);
  const isCompleted = isControlled ? value : phase === "completed";
  const progress = isCompleted ? 1 : internalProgress;
  const isDragging = phase === "dragging";

  const state: SlideToCompleteState = disabled
    ? "disabled"
    : loading
      ? "loading"
      : error
        ? "error"
        : isCompleted
          ? "completed"
          : phase === "resetting"
            ? "resetting"
            : phase;

  const measure = useCallback(() => {
    const trackEl = trackRef.current;
    const thumbEl = thumbRef.current;
    if (!trackEl || !thumbEl) return;
    setMaxDragDistance(getDragBounds(trackEl, thumbEl, direction).maxX);
  }, [direction]);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(trackEl);
    measure();
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (disabled && phase === "dragging") {
      activePointerIdRef.current = null;
      setPhase("idle");
    }
  }, [disabled, phase]);

  useEffect(() => {
    if (isControlled && !value) {
      completingRef.current = false;
      activePointerIdRef.current = null;
      setPhase("idle");
      setInternalProgress(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isControlled, value]);

  const registerLabel = useCallback(() => {
    setLabelCount((count) => count + 1);
    return () => setLabelCount((count) => Math.max(0, count - 1));
  }, []);

  const registerTrack = useCallback((node: HTMLDivElement | null) => {
    trackRef.current = node;
  }, []);

  const registerThumb = useCallback((node: HTMLButtonElement | null) => {
    thumbRef.current = node;
  }, []);

  const finishComplete = useCallback(() => {
    if (!isControlled) setPhase("completed");
    setInternalProgress(1);
    onValueChange?.(true);
    completingRef.current = false;
  }, [isControlled, onValueChange]);

  const complete = useCallback(() => {
    if (disabled || loading) return;
    if (completingRef.current || isCompleted) return;
    completingRef.current = true;
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    setInternalProgress(1);
    onProgressChange?.(1);

    const result = onComplete?.();
    if (result && typeof (result as Promise<void>).then === "function") {
      (result as Promise<void>).then(
        () => finishComplete(),
        () => {
          completingRef.current = false;
          if (!isControlled) {
            setPhase("idle");
            setInternalProgress(0);
            onProgressChange?.(0);
          }
        },
      );
      return;
    }
    finishComplete();
  }, [
    disabled,
    isControlled,
    isCompleted,
    loading,
    onComplete,
    onProgressChange,
    finishComplete,
  ]);

  const reset = useCallback(() => {
    activePointerIdRef.current = null;
    completingRef.current = false;
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    setInternalProgress(0);
    if (!isControlled) setPhase("idle");
    onProgressChange?.(0);
    onReset?.();
    onValueChange?.(false);
  }, [isControlled, onProgressChange, onReset, onValueChange]);

  const startDrag = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (disabled || loading || isCompleted) return;
      if (activePointerIdRef.current !== null) return;
      const thumbEl = event.currentTarget;
      if (!trackRef.current) return;
      activePointerIdRef.current = event.pointerId;
      thumbEl.setPointerCapture(event.pointerId);
      dragOffsetRef.current =
        event.clientX - thumbEl.getBoundingClientRect().left;
      measure();
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      setPhase("dragging");
      onDragStart?.();
    },
    [disabled, isCompleted, loading, measure, onDragStart],
  );

  const updateDrag = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (activePointerIdRef.current !== event.pointerId) return;
      const trackEl = trackRef.current;
      const thumbEl = thumbRef.current;
      if (!trackEl || !thumbEl) return;

      const { trackRect, maxX } = getDragBounds(trackEl, thumbEl, direction);
      const rawX = event.clientX - trackRect.left - dragOffsetRef.current;
      const clampedX = clamp(rawX, 0, maxX);
      const rawProgress = maxX === 0 ? 0 : clampedX / maxX;
      const nextProgress = direction === "rtl" ? 1 - rawProgress : rawProgress;

      setInternalProgress(nextProgress);
      setMaxDragDistance(maxX);
      onProgressChange?.(nextProgress);

      if (nextProgress >= clampedThreshold) {
        complete();
      }
    },
    [clampedThreshold, complete, direction, onProgressChange],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (activePointerIdRef.current !== event.pointerId) return;
      activePointerIdRef.current = null;
      if (phase !== "dragging") return;

      if (resetOnRelease) {
        setPhase("resetting");
        setInternalProgress(0);
        onProgressChange?.(0);
        resetTimeoutRef.current = setTimeout(() => {
          setPhase("idle");
          onReset?.();
        }, RESET_TRANSITION_MS);
      } else {
        setPhase("idle");
      }
    },
    [onProgressChange, onReset, phase, resetOnRelease],
  );

  const cancelDrag = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      endDrag(event);
    },
    [endDrag],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || loading || isCompleted) return;
      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          complete();
          break;
        case "ArrowRight":
        case "ArrowLeft": {
          event.preventDefault();
          const physicalDelta =
            event.key === "ArrowRight" ? KEYBOARD_STEP : -KEYBOARD_STEP;
          const logicalDelta =
            direction === "rtl" ? -physicalDelta : physicalDelta;
          const next = clamp(
            (isDragging ? internalProgress : progress) + logicalDelta,
            0,
            1,
          );
          setInternalProgress(next);
          onProgressChange?.(next);
          if (logicalDelta > 0 && next >= clampedThreshold) complete();
          break;
        }
        case "Home":
          event.preventDefault();
          setInternalProgress(0);
          onProgressChange?.(0);
          break;
        case "End":
          event.preventDefault();
          complete();
          break;
        default:
          break;
      }
    },
    [
      clampedThreshold,
      complete,
      direction,
      disabled,
      internalProgress,
      isCompleted,
      isDragging,
      loading,
      onProgressChange,
      progress,
    ],
  );

  const accessibleLabel = "Slide to complete";

  const ctx = useMemo<SlideToCompleteContextValue>(
    () => ({
      state,
      progress,
      threshold: clampedThreshold,
      isDragging,
      isCompleted,
      isDisabled: disabled,
      isLoading: loading,
      direction,
      appearance,
      size,
      labelId,
      accessibleLabel,
      hasLabel: labelCount > 0,
      maxDragDistance,
      trackRef,
      thumbRef,
      registerLabel,
      registerTrack,
      registerThumb,
      startDrag,
      updateDrag,
      endDrag,
      cancelDrag,
      handleKeyDown,
      complete,
      reset,
    }),
    [
      appearance,
      cancelDrag,
      clampedThreshold,
      complete,
      direction,
      disabled,
      endDrag,
      handleKeyDown,
      isCompleted,
      isDragging,
      labelCount,
      labelId,
      loading,
      maxDragDistance,
      progress,
      registerLabel,
      registerThumb,
      registerTrack,
      reset,
      size,
      startDrag,
      state,
      updateDrag,
    ],
  );

  const translate =
    direction === "rtl"
      ? -(progress * maxDragDistance)
      : progress * maxDragDistance;

  return (
    <SlideToCompleteContext.Provider value={ctx}>
      <div
        ref={ref}
        data-slot="slide-to-complete"
        role="group"
        aria-disabled={disabled || undefined}
        aria-busy={loading || undefined}
        dir={direction}
        data-state={state}
        data-appearance={appearance}
        data-size={size}
        data-dragging={isDragging || undefined}
        data-completed={isCompleted || undefined}
        data-disabled={disabled || undefined}
        data-success={success || undefined}
        className={cn(
          "group/slide-to-complete",
          slideToCompleteVariants({ size }),
          className,
        )}
        style={
          {
            "--slide-progress": progress,
            "--slide-threshold": clampedThreshold,
            "--slide-thumb-position": `${translate}px`,
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      >
        {children}
      </div>
    </SlideToCompleteContext.Provider>
  );
}

SlideToCompleteRoot.displayName = "SlideToCompleteRoot";

export function SlideToCompleteTrack({
  className,
  children,
  ref,
  ...rest
}: SlideToCompleteTrackProps) {
  const { appearance, registerTrack, state } = useSlideToCompleteContext(
    "SlideToComplete.Track",
  );

  return (
    <div
      ref={composeRefs(ref, registerTrack)}
      data-slot="slide-to-complete-track"
      data-state={state}
      className={cn(slideToCompleteTrackVariants({ appearance }), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

SlideToCompleteTrack.displayName = "SlideToCompleteTrack";

export function SlideToCompleteProgress({
  className,
  style,
  ref,
  ...rest
}: SlideToCompleteProgressProps) {
  const { appearance, progress } = useSlideToCompleteContext(
    "SlideToComplete.Progress",
  );

  return (
    <div
      ref={ref}
      data-slot="slide-to-complete-progress"
      aria-hidden="true"
      className={cn(slideToCompleteProgressVariants({ appearance }), className)}
      style={{ transform: `scaleX(${progress})`, ...style }}
      {...rest}
    />
  );
}

SlideToCompleteProgress.displayName = "SlideToCompleteProgress";

export function SlideToCompleteLabel({
  className,
  children,
  ref,
  ...rest
}: SlideToCompleteLabelProps) {
  const { labelId, registerLabel } = useSlideToCompleteContext(
    "SlideToComplete.Label",
  );

  useLayoutEffect(() => registerLabel(), [registerLabel]);

  return (
    <span
      ref={ref}
      id={labelId}
      data-slot="slide-to-complete-label"
      className={cn(slideToCompleteLabelVariants(), className)}
      {...rest}
    >
      {children}
    </span>
  );
}

SlideToCompleteLabel.displayName = "SlideToCompleteLabel";

export function SlideToCompleteThumb({
  className,
  children,
  style,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onKeyDown,
  ref,
  ...rest
}: SlideToCompleteThumbProps) {
  const {
    appearance,
    state,
    isDragging,
    isCompleted,
    isDisabled,
    isLoading,
    direction,
    labelId,
    accessibleLabel,
    hasLabel,
    maxDragDistance,
    progress,
    registerThumb,
    startDrag,
    updateDrag,
    endDrag,
    cancelDrag,
    handleKeyDown,
  } = useSlideToCompleteContext("SlideToComplete.Thumb");

  const translate =
    direction === "rtl"
      ? -(progress * maxDragDistance)
      : progress * maxDragDistance;

  return (
    <button
      ref={composeRefs(ref, registerThumb)}
      type="button"
      data-slot="slide-to-complete-thumb"
      data-state={state}
      data-dragging={isDragging || undefined}
      data-completed={isCompleted || undefined}
      data-disabled={isDisabled || undefined}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={isLoading || undefined}
      aria-labelledby={hasLabel ? labelId : undefined}
      aria-label={hasLabel ? undefined : accessibleLabel}
      className={cn(slideToCompleteThumbVariants({ appearance }), className)}
      style={{
        transform: `translate3d(${translate}px, 0, 0)`,
        ...style,
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!event.defaultPrevented) startDrag(event);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented) updateDrag(event);
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        if (!event.defaultPrevented) endDrag(event);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        if (!event.defaultPrevented) cancelDrag(event);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) handleKeyDown(event);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

SlideToCompleteThumb.displayName = "SlideToCompleteThumb";

export function SlideToCompleteIcon({
  className,
  children,
  ref,
  ...rest
}: SlideToCompleteIconProps) {
  return (
    <span
      ref={ref}
      data-slot="slide-to-complete-icon"
      className={cn(slideToCompleteIconVariants(), className)}
      {...rest}
    >
      {children}
    </span>
  );
}

SlideToCompleteIcon.displayName = "SlideToCompleteIcon";

function DefaultThumbIcon({ direction }: { direction: "ltr" | "rtl" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      className={cn("h-3.5 w-3.5", direction === "rtl" && "rotate-180")}
    >
      <path
        d="M3.5 8H12.5M8.5 4L12.5 8L8.5 12"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DefaultCheckIcon({ direction }: { direction: "ltr" | "rtl" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      className={cn("h-3.5 w-3.5", direction === "rtl" && "rotate-180")}
    >
      <path
        d="M3.2 8.4L6.5 11.5L12.8 4.5"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SlideToCompleteImpl({
  label,
  thumbIcon,
  children,
  success,
  ref,
  ...rest
}: SlideToCompleteProps) {
  const direction = rest.direction ?? "ltr";
  const defaultIcon = success ? (
    <DefaultCheckIcon direction={direction} />
  ) : (
    <DefaultThumbIcon direction={direction} />
  );

  return (
    <SlideToCompleteRoot ref={ref} success={success} {...rest}>
      <SlideToCompleteTrack>
        <SlideToCompleteProgress />
        {label != null && <SlideToCompleteLabel>{label}</SlideToCompleteLabel>}
        <SlideToCompleteThumb>
          <SlideToCompleteIcon>
            {thumbIcon ?? children ?? defaultIcon}
          </SlideToCompleteIcon>
        </SlideToCompleteThumb>
      </SlideToCompleteTrack>
    </SlideToCompleteRoot>
  );
}

SlideToCompleteImpl.displayName = "SlideToComplete";

export const SlideToComplete = Object.assign(SlideToCompleteImpl, {
  Root: SlideToCompleteRoot,
  Track: SlideToCompleteTrack,
  Progress: SlideToCompleteProgress,
  Label: SlideToCompleteLabel,
  Thumb: SlideToCompleteThumb,
  Icon: SlideToCompleteIcon,
});

export { useSlideToCompleteContext };
