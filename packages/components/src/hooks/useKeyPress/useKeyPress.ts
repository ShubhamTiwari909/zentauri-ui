"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether a keyboard key (or any of several keys) is currently held down.
 *
 * - Matches against `event.key`, case-insensitively (`"k"`, `"Escape"`, `"ArrowUp"`, …).
 * - Listens on `window` for `keydown` / `keyup`, and clears on window `blur` so the
 *   state cannot get stuck when focus leaves the page mid-press.
 *
 * @param targetKey - A key name or array of key names to watch.
 * @returns `true` while one of the target keys is pressed.
 */
export function useKeyPress(targetKey: string | string[]): boolean {
  const [pressed, setPressed] = useState(false);
  const normalizedKeys = (
    Array.isArray(targetKey) ? targetKey : [targetKey]
  )
    .map((key) => key.toLowerCase())
    .join("|");

  useEffect(() => {
    const keys = normalizedKeys.split("|");
    const matches = (event: KeyboardEvent) =>
      keys.includes(event.key.toLowerCase());
    const onKeyDown = (event: KeyboardEvent) => {
      if (matches(event)) {
        setPressed(true);
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (matches(event)) {
        setPressed(false);
      }
    };
    const onBlur = () => {
      setPressed(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      setPressed(false);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [normalizedKeys]);

  return pressed;
}
