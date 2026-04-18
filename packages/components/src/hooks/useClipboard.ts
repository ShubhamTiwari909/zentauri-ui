"use client";

import { useCallback, useRef, useState } from "react";

export type UseClipboardResult = {
  /** `true` after a successful `copy` until the reset delay elapses or `reset` is called. */
  copied: boolean;
  /** Set when the Clipboard API is missing or `writeText` rejects (e.g. permission denied). */
  error: Error | undefined;
  /** Writes `text` via `navigator.clipboard.writeText`; returns whether the write succeeded. */
  copy: (text: string) => Promise<boolean>;
  /** Clears `copied`/`error` and cancels any pending auto-reset timeout. */
  reset: () => void;
};

/**
 * Wraps the async Clipboard API with React state for UX feedback (“Copied!”) and error surfacing.
 *
 * After a successful copy, `copied` flips to `true` for `resetDelay` ms (or stays true if `resetDelay` is 0).
 * SSR-safe: `copy` resolves `false` with an error when `navigator.clipboard` is unavailable.
 *
 * @param resetDelay - Milliseconds before `copied` auto-clears after success; `0` disables auto-clear.
 * @returns `{ copied, error, copy, reset }` for rendering and handlers.
 */
export function useClipboard(resetDelay = 2000): UseClipboardResult {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    setCopied(false);
    setError(undefined);
  }, []);

  const copy = useCallback(
    async (text: string) => {
      reset();
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        const err = new Error("Clipboard API is not available");
        setError(err);
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (resetDelay > 0) {
          timeoutRef.current = setTimeout(() => {
            setCopied(false);
          }, resetDelay);
        }
        return true;
      } catch (cause) {
        const err =
          cause instanceof Error ? cause : new Error(String(cause));
        setError(err);
        return false;
      }
    },
    [reset, resetDelay],
  );

  return { copied, error, copy, reset };
}
