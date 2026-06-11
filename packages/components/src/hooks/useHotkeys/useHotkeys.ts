"use client";

import { useEffect, useRef } from "react";

export type HotkeyHandler = (event: KeyboardEvent) => void;

export type UseHotkeysOptions = {
  /** Disable all bindings without unmounting (default `true`). */
  enabled?: boolean;
  /** Call `event.preventDefault()` on a match (default `true`). */
  preventDefault?: boolean;
  /** Fire even when typing in inputs, textareas, selects, or contentEditable (default `false`). */
  allowInInputs?: boolean;
};

type ParsedHotkey = {
  key: string;
  ctrl: boolean;
  meta: boolean;
  alt: boolean;
  shift: boolean;
  mod: boolean;
};

function parseHotkey(combo: string): ParsedHotkey {
  const parsed: ParsedHotkey = {
    key: "",
    ctrl: false,
    meta: false,
    alt: false,
    shift: false,
    mod: false,
  };
  for (const raw of combo.split("+")) {
    const token = raw.trim().toLowerCase();
    if (token === "ctrl" || token === "control") {
      parsed.ctrl = true;
    } else if (token === "meta" || token === "cmd" || token === "command") {
      parsed.meta = true;
    } else if (token === "alt" || token === "option") {
      parsed.alt = true;
    } else if (token === "shift") {
      parsed.shift = true;
    } else if (token === "mod") {
      parsed.mod = true;
    } else {
      parsed.key = token === "space" ? " " : token;
    }
  }
  return parsed;
}

function matchesHotkey(event: KeyboardEvent, hotkey: ParsedHotkey): boolean {
  if (hotkey.key !== event.key.toLowerCase()) {
    return false;
  }
  if (hotkey.mod) {
    if (!event.ctrlKey && !event.metaKey) {
      return false;
    }
  } else if (hotkey.ctrl !== event.ctrlKey || hotkey.meta !== event.metaKey) {
    return false;
  }
  return hotkey.alt === event.altKey && hotkey.shift === event.shiftKey;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

/**
 * Binds keyboard shortcut combos (e.g. `"mod+k"`, `"ctrl+shift+p"`, `"escape"`) to handlers on `window`.
 *
 * - Combo syntax: modifier tokens (`ctrl`/`control`, `meta`/`cmd`/`command`, `alt`/`option`, `shift`,
 *   `mod`) joined with `+` around a final key matched against `event.key` (use `space` for the spacebar).
 * - `mod` matches Cmd on macOS *or* Ctrl elsewhere (it accepts either modifier).
 * - Bindings are read from a ref on every keydown, so inline objects and closures stay fresh
 *   without re-subscribing.
 * - Shortcuts are suppressed while typing in form fields or contentEditable unless `allowInInputs`.
 *
 * @param bindings - Map of combo string → handler. The first matching combo wins per event.
 * @param options - {@link UseHotkeysOptions}
 */
export function useHotkeys(
  bindings: Record<string, HotkeyHandler>,
  options: UseHotkeysOptions = {},
): void {
  const {
    enabled = true,
    preventDefault = true,
    allowInInputs = false,
  } = options;
  const bindingsRef = useRef(bindings);

  useEffect(() => {
    bindingsRef.current = bindings;
  }, [bindings]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (!allowInInputs && isEditableTarget(event.target)) {
        return;
      }
      for (const [combo, handler] of Object.entries(bindingsRef.current)) {
        if (matchesHotkey(event, parseHotkey(combo))) {
          if (preventDefault) {
            event.preventDefault();
          }
          handler(event);
          return;
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [allowInInputs, enabled, preventDefault]);
}
