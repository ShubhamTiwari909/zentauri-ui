"use client";

import { useCallback, useEffect, useState } from "react";

function readValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.sessionStorage.getItem(key);
    if (raw == null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export type UseSessionStorageResult<T> = [
  T,
  (value: T | ((previous: T) => T)) => void,
  () => void,
];

/**
 * Syncs JSON-serialized state with `window.sessionStorage` for the lifetime of the browser tab.
 *
 * Same persistence semantics as {@link useLocalStorage} but scoped to the session: data clears when the tab closes.
 * Unlike `useLocalStorage`, this hook does **not** subscribe to `storage` events (session storage is not shared across tabs).
 *
 * State is initialized from `initialValue` only so the first client render can match SSR output; the stored value is
 * applied after mount in an effect to avoid hydration mismatches.
 *
 * @typeParam T - Stored value type; must round-trip through `JSON.stringify` / `parse`.
 * @param key - `sessionStorage` key.
 * @param initialValue - Fallback when missing, invalid JSON, or during SSR; also used for the first render before hydrate.
 * @returns `[stored, setValue, remove]` tuple.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): UseSessionStorageResult<T> {
  const [stored, setStored] = useState<T>(initialValue);

  const setValue = useCallback(
    (value: T | ((previous: T) => T)) => {
      setStored((previous) => {
        const next =
          typeof value === "function" ? (value as (p: T) => T)(previous) : value;
        try {
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem(key, JSON.stringify(next));
          }
        } catch {
          /* quota or private mode */
        }
        return next;
      });
    },
    [key],
  );

  const remove = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(key);
      }
    } catch {
      /* ignore */
    }
    setStored(initialValue);
  }, [initialValue, key]);

  useEffect(() => {
    setStored(readValue(key, initialValue));
  }, [initialValue, key]);

  return [stored, setValue, remove];
}
