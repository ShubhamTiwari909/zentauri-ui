"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type UseCountdownParams = {
  /** Value the countdown starts from. */
  countStart: number;
  /** Value the countdown stops at (default `0`). */
  countStop?: number;
  /** Milliseconds between ticks (default `1000`). */
  intervalMs?: number;
  /** Start counting immediately on mount (default `false`). */
  autoStart?: boolean;
  /** Called once when the countdown reaches `countStop`. */
  onComplete?: () => void;
};

export type UseCountdownResult = {
  /** Current count value. */
  count: number;
  /** Whether the countdown is actively ticking. */
  isRunning: boolean;
  /** Whether the countdown has reached `countStop`. */
  isComplete: boolean;
  /** Reset to `countStart` and begin ticking. */
  start: () => void;
  /** Stop ticking, keeping the current count. */
  pause: () => void;
  /** Continue ticking from the current count. No-op if the countdown is complete. */
  resume: () => void;
  /** Stop ticking and reset the count to `countStart`. */
  reset: () => void;
};

/**
 * Countdown timer decrementing by one each tick, with start, pause, resume, and reset controls.
 *
 * - Counts from `countStart` down to `countStop` (default `0`) every `intervalMs` (default 1s).
 * - `onComplete` fires once when the count reaches `countStop`; the timer stops automatically.
 * - `resume` on a completed countdown is a no-op; call `start` or `reset` to run it again.
 *
 * @param params - {@link UseCountdownParams}
 * @returns {@link UseCountdownResult}
 */
export function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  autoStart = false,
  onComplete,
}: UseCountdownParams): UseCountdownResult {
  const [count, setCount] = useState(countStart);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const isComplete = count <= countStop;

  // Interval effect: does NOT include `count` in deps so the timer is not recreated on every tick.
  // Completion is handled by the separate effect below.
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const id = window.setInterval(() => {
      setCount((previous) => Math.max(countStop, previous - 1));
    }, intervalMs);
    return () => {
      window.clearInterval(id);
    };
  }, [countStop, intervalMs, isRunning]);

  useEffect(() => {
    if (isRunning && count <= countStop) {
      setIsRunning(false);
      onCompleteRef.current?.();
    }
  }, [count, countStop, isRunning]);

  const start = useCallback(() => {
    setCount(countStart);
    setIsRunning(true);
  }, [countStart]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    // No-op when the countdown has already reached countStop to prevent retriggering onComplete.
    if (isComplete) {
      return;
    }
    setIsRunning(true);
  }, [isComplete]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCount(countStart);
  }, [countStart]);

  return { count, isRunning, isComplete, start, pause, resume, reset };
}
