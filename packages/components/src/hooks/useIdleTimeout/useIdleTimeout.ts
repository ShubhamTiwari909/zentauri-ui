"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_ACTIVITY_EVENTS = [
  "pointerdown",
  "pointermove",
  "keydown",
  "wheel",
  "touchstart",
  "scroll",
] as const;

export type UseIdleTimeoutParams = {
  /** Inactivity duration in milliseconds before the user counts as idle. */
  timeoutMs: number;
  /** Window events treated as activity (default: pointer, key, wheel, touch, scroll). */
  events?: readonly string[];
  /** Start in the idle state (default `false`). */
  initiallyIdle?: boolean;
  /** Called when the user becomes idle. */
  onIdle?: () => void;
  /** Called when activity resumes after being idle. */
  onActive?: () => void;
};

export type UseIdleTimeoutResult = {
  /** Whether the user is currently idle. */
  isIdle: boolean;
  /** Mark the user active and restart the inactivity timer (e.g. after programmatic activity). */
  reset: () => void;
};

/**
 * Detects user inactivity: `isIdle` flips to `true` after `timeoutMs` without any of the
 * activity events on `window`, and back to `false` on the next activity.
 *
 * - `onIdle` / `onActive` fire on transitions only (not on mount), and are read from refs
 *   so inline callbacks stay fresh.
 * - Useful for session expiry warnings, pausing media or polling, and presence indicators.
 *
 * @param params - {@link UseIdleTimeoutParams}
 * @returns {@link UseIdleTimeoutResult}
 */
export function useIdleTimeout({
  timeoutMs,
  events,
  initiallyIdle = false,
  onIdle,
  onActive,
}: UseIdleTimeoutParams): UseIdleTimeoutResult {
  const [isIdle, setIsIdle] = useState(initiallyIdle);
  const onIdleRef = useRef(onIdle);
  const onActiveRef = useRef(onActive);
  const restartRef = useRef<() => void>(() => {});
  const firstRunRef = useRef(true);

  useEffect(() => {
    onIdleRef.current = onIdle;
    onActiveRef.current = onActive;
  }, [onActive, onIdle]);

  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }
    if (isIdle) {
      onIdleRef.current?.();
    } else {
      onActiveRef.current?.();
    }
  }, [isIdle]);

  const eventsKey = (events ?? DEFAULT_ACTIVITY_EVENTS).join(" ");

  useEffect(() => {
    const eventNames = eventsKey.split(" ").filter(Boolean);
    let timeoutId: number | undefined;

    const startTimer = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsIdle(true);
      }, timeoutMs);
    };

    const onActivity = () => {
      setIsIdle(false);
      startTimer();
    };

    restartRef.current = onActivity;
    startTimer();
    for (const name of eventNames) {
      window.addEventListener(name, onActivity, { passive: true });
    }
    return () => {
      window.clearTimeout(timeoutId);
      for (const name of eventNames) {
        window.removeEventListener(name, onActivity);
      }
    };
  }, [eventsKey, timeoutMs]);

  const reset = useCallback(() => {
    restartRef.current();
  }, []);

  return { isIdle, reset };
}
