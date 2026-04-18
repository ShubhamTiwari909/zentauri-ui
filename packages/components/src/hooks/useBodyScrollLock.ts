"use client";

import { useEffect } from "react";

/**
 * Locks the document body scroll while `locked` is true by setting `document.body.style.overflow`
 * to `"hidden"`. On unlock or unmount, the previous inline `overflow` value is restored so nested
 * overlays or multiple callers do not permanently change global scroll behavior.
 *
 * Typical use: modals, drawers, and full-screen overlays where background content must not scroll.
 *
 * @param locked - When `true`, body scroll is hidden; when `false`, prior overflow is restored.
 */
export const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
};
