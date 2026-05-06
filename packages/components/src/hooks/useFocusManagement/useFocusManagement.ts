"use client";

import type { RefObject } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useBodyScrollLock } from "../useBodyScrollLock";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getFocusableElements(
  root: HTMLElement,
  focusableSelector: string,
): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(focusableSelector),
  ).filter((element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      return false;
    }
    if (typeof window === "undefined") {
      return true;
    }
    const style = getComputedStyle(element);
    if (style.visibility === "hidden" || style.display === "none") {
      return false;
    }
    return true;
  });
}

/**
 * Composes modal-like behavior for an open overlay: body scroll lock, Escape to close, focus trapping with circular Tab cycling, and restoring focus after close.
 */
export const useFocusManagement = ({
  open,
  setOpen,
  contentRef,
  triggerRef,
  focusableSelector = FOCUSABLE_SELECTOR,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentRef: RefObject<HTMLElement | null>;
  /** Last modal trigger control; used when focus cannot be inferred at open time. */
  triggerRef?: RefObject<HTMLElement | null>;
  focusableSelector?: string;
}) => {
  useBodyScrollLock(open);

  const previousFocusRef = useRef<HTMLElement | null>(null);

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

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;
    let rafId = 0;
    let trapInstalled = false;

    const detachTrap = () => {
      if (!trapInstalled) {
        return;
      }
      trapInstalled = false;
      document.removeEventListener("focusin", handleFocusIn, true);
      document.removeEventListener("keydown", handleTabKeyDown, true);
    };

    let trapRoot: HTMLElement | null = null;

    const handleFocusIn = (event: FocusEvent) => {
      const node = trapRoot;
      if (!node) {
        return;
      }
      const focused = event.target;
      if (!(focused instanceof Node)) {
        return;
      }
      if (node.contains(focused)) {
        return;
      }
      const list = getFocusableElements(node, focusableSelector);
      const redirectTarget = list[0] ?? node;
      redirectTarget.focus({ preventScroll: true });
    };

    const handleTabKeyDown = (event: KeyboardEvent) => {
      const node = trapRoot;
      if (!node) {
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      const list = getFocusableElements(node, focusableSelector);
      if (list.length === 0) {
        event.preventDefault();
        node.focus({ preventScroll: true });
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) {
        return;
      }
      const activeElement = document.activeElement as HTMLElement | undefined;

      if (!activeElement || !node.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus({ preventScroll: true });
        return;
      }

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
        return;
      }
      if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    const installTrap = () => {
      if (cancelled) {
        return;
      }
      const node = contentRef.current;
      if (!node) {
        rafId = requestAnimationFrame(installTrap);
        return;
      }

      trapRoot = node;

      const active = document.activeElement;
      if (
        active instanceof HTMLElement &&
        active !== document.body &&
        !node.contains(active)
      ) {
        previousFocusRef.current = active;
      } else {
        previousFocusRef.current = triggerRef?.current ?? null;
      }

      const focusables = getFocusableElements(node, focusableSelector);
      const initialFocus = focusables[0] ?? node;
      initialFocus.focus({ preventScroll: true });

      document.addEventListener("focusin", handleFocusIn, true);
      document.addEventListener("keydown", handleTabKeyDown, true);
      trapInstalled = true;
    };

    installTrap();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      detachTrap();
      trapRoot = null;

      const fallbackTrigger =
        triggerRef?.current &&
        document.body.contains(triggerRef.current) &&
        typeof triggerRef.current.focus === "function"
          ? triggerRef.current
          : null;

      const toRestore = previousFocusRef.current ?? fallbackTrigger;
      previousFocusRef.current = null;

      if (
        toRestore &&
        typeof toRestore.focus === "function" &&
        document.body.contains(toRestore)
      ) {
        toRestore.focus({ preventScroll: true });
      }
    };
  }, [open, contentRef, triggerRef, focusableSelector]);
};
