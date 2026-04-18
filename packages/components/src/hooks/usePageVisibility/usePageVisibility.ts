"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `document.visibilityState` (`"visible"`, `"hidden"`, or `"prerender"`) across tab visibility changes.
 *
 * Subscribes to `"visibilitychange"` so backgrounding a tab or switching windows updates state. SSR defaults to `"visible"`.
 *
 * @returns Current `DocumentVisibilityState` from the Page Visibility API.
 */
export function usePageVisibility(): DocumentVisibilityState {
  const [state, setState] = useState<DocumentVisibilityState>(() =>
    typeof document === "undefined" ? "visible" : document.visibilityState,
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const onChange = () => {
      setState(document.visibilityState);
    };
    document.addEventListener("visibilitychange", onChange);
    return () => {
      document.removeEventListener("visibilitychange", onChange);
    };
  }, []);

  return state;
}
