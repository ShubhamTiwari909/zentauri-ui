"use client";

import type { RefObject } from "react";
import { useEffect } from "react";
import { useBodyScrollLock } from "./useBodyScrollLock";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Composes modal-like behavior for an open overlay: body scroll lock, Escape to close, and focus trapping.
 *
 * - Delegates scroll locking to {@link useBodyScrollLock} while `open` is true.
 * - Listens for `Escape` on `window` and calls `setOpen(false)`.
 * - When `open` becomes true, focuses the first visible focusable inside `contentRef`, or the container itself.
 * - Traps focus within `contentRef` via a capturing `focusin` listener on `document` that redirects focus back inside.
 * - On close/unmount of the open effect, restores focus to the element that was focused before the trap ran.
 *
 * @param params.open - Whether the overlay is visible.
 * @param params.setOpen - Setter used for Escape and cleanup paths.
 * @param params.contentRef - Root of the dialog/drawer content (must point at a focusable container or include focusables).
 * @param params.focusableSelector - Query selector for tabbable elements; defaults to a common interactive set.
 */
export const useFocusManagement = ({
  open,
  setOpen,
  contentRef,
  focusableSelector = FOCUSABLE_SELECTOR,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentRef: RefObject<HTMLDivElement | null>;
  focusableSelector?: string;
}) => {
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const node = contentRef.current;
    if (!node) {
      return;
    }
    const focusables = Array.from(
      node.querySelectorAll<HTMLElement>(focusableSelector),
    ).filter((element) => element.offsetParent !== null || element === node);
    const target = focusables[0] ?? node;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    target.focus();

    const handleFocusIn = (event: FocusEvent) => {
      if (!node.contains(event.target as Node)) {
        event.stopPropagation();
        target.focus();
      }
    };
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      previouslyFocused?.focus?.();
    };
  }, [contentRef, open]);
};
