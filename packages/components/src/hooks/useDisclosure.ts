"use client";

import { useCallback } from "react";

import { useControllableState } from "./useControllableState";

export type UseDisclosureParams = {
  /** Controlled open flag; omit for uncontrolled usage with `defaultOpen`. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Fired whenever open state changes from user-driven `setOpen` / `open` / `close` / `toggle`. */
  onOpenChange?: (open: boolean) => void;
};

export type UseDisclosureResult = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (open: boolean) => void;
};

/**
 * Boolean open/close state for overlays (dialogs, menus, collapsible regions) with optional control from the parent.
 * Built on {@link useControllableState}; semantics match common headless UI libraries.
 *
 * @param params - Optional `open`, `defaultOpen`, and `onOpenChange`.
 * @returns Helpers `open`, `close`, `toggle`, `setOpen`, and the current `isOpen` flag.
 */
export function useDisclosure({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: UseDisclosureParams = {}): UseDisclosureResult {
  const [isOpen, setOpenState] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const setOpen = useCallback(
    (open: boolean) => {
      setOpenState(open);
    },
    [setOpenState],
  );

  const open = useCallback(() => {
    setOpenState(true);
  }, [setOpenState]);

  const close = useCallback(() => {
    setOpenState(false);
  }, [setOpenState]);

  const toggle = useCallback(() => {
    setOpenState(!isOpen);
  }, [isOpen, setOpenState]);

  return { isOpen, open, close, toggle, setOpen };
}
