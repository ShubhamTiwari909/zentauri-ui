"use client";

import { useEffect } from "react";

let activeLockCount = 0;
let storedOverflow: string | undefined;

const acquireBodyScrollLock = () => {
  if (activeLockCount === 0) {
    storedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  activeLockCount += 1;
};

const releaseBodyScrollLock = () => {
  if (activeLockCount <= 0) {
    return;
  }
  activeLockCount -= 1;
  if (activeLockCount === 0) {
    document.body.style.overflow = storedOverflow ?? "";
    storedOverflow = undefined;
  }
};

/**
 * Locks the document body scroll while `locked` is true by setting `document.body.style.overflow`
 * to `"hidden"`. Uses a module-level lock count so multiple concurrent callers (nested modals,
 * drawer + modal, several hook instances) only restore the original inline `overflow` after the
 * last lock releases.
 *
 * Typical use: modals, drawers, and full-screen overlays where background content must not scroll.
 *
 * @param locked - When `true`, body scroll is hidden; when `false`, this instance releases its
 *   lock; the prior overflow is restored only when no instance still holds a lock.
 */
export const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) {
      return;
    }
    acquireBodyScrollLock();
    return () => {
      releaseBodyScrollLock();
    };
  }, [locked]);
};
