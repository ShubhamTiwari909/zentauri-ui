"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether a keyboard key (or any of several keys) is currently held down.
 *
 * - Matches against `event.key`, case-insensitively (`"k"`, `"Escape"`, `"ArrowUp"`, …).
 * - Listens on `window` for `keydown` / `keyup`, and clears on window `blur` so the
 *   state cannot get stuck when focus leaves the page mid-press.
 * - When an array of keys is watched, `pressed` remains `true` as long as ANY of the
 *   target keys are still held — releasing one watched key while another is held does
 *   not reset the state.
 *
 * @param targetKey - A key name or array of key names to watch.
 * @returns `true` while one of the target keys is pressed.
 */
export function useKeyPress(targetKey: string | string[]): boolean {
  const [pressed, setPressed] = useState(false);

  // Build a stable string key from the sorted target array.
  // Use \x00 as separator (not "|") so the literal "|" key is handled correctly.
  const normalizedKey = (Array.isArray(targetKey) ? targetKey : [targetKey])
    .map((k) => k.toLowerCase())
    .sort()
    .join("\x00");

  useEffect(() => {
    const keys = normalizedKey.split("\x00");
    // Local Set tracks which target keys are currently pressed so that releasing
    // one key while another is still held does not incorrectly clear `pressed`.
    const pressedKeys = new Set<string>();

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (keys.includes(key)) {
        pressedKeys.add(key);
        setPressed(true);
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (keys.includes(key)) {
        pressedKeys.delete(key);
        setPressed(pressedKeys.size > 0);
      }
    };
    const onBlur = () => {
      pressedKeys.clear();
      setPressed(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      pressedKeys.clear();
      setPressed(false);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [normalizedKey]);

  return pressed;
}
