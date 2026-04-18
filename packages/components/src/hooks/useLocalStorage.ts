"use client";

import { useCallback, useEffect, useState } from "react";

function readValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export type UseLocalStorageResult<T> = [
  T,
  (value: T | ((previous: T) => T)) => void,
  () => void,
];

/**
 * Syncs JSON-serialized state with `window.localStorage` under a fixed key.
 *
 * - Initial read runs on the client; SSR uses `initialValue`.
 * - `setValue` persists with `JSON.stringify` and updates React state; functional updates supported.
 * - `remove` clears the key and resets state to `initialValue`.
 * - Subscribes to the `storage` event so updates from other tabs (or same tab via `storage` dispatch quirks) reconcile.
 * - Read/write failures (private mode, quota) fall back silently on read; write errors are swallowed except `remove` logs on failure.
 *
 * @typeParam T - Stored value type; must be compatible with `JSON.stringify` / `parse`.
 * @param key - `localStorage` key.
 * @param initialValue - Fallback when missing, invalid JSON, or during SSR.
 * @returns `[stored, setValue, remove]` tuple mirroring `useState` plus explicit removal.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageResult<T> {
  const [stored, setStored] = useState<T>(() =>
    readValue(key, initialValue),
  );

  const setValue = useCallback(
    (value: T | ((previous: T) => T)) => {
      setStored((previous) => {
        const next =
          typeof value === "function" ? (value as (p: T) => T)(previous) : value;
        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(next));
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
        window.localStorage.removeItem(key);
      }
    } catch {
      console.error(`Failed to remove item from localStorage: ${key}`);
    }
    setStored(initialValue);
  }, [initialValue, key]);

  useEffect(() => {
    setStored(readValue(key, initialValue));
  }, [initialValue, key]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== window.localStorage) {
        return;
      }
      if (event.newValue == null) {
        setStored(initialValue);
        return;
      }
      try {
        setStored(JSON.parse(event.newValue) as T);
      } catch {
        setStored(initialValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [initialValue, key]);

  return [stored, setValue, remove];
}
