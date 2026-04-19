"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/utils";
import { useFocusManagement } from "../../hooks/useFocusManagement";

import type {
  DrawerContentProps,
  DrawerCtx,
  DrawerProps,
  DrawerSectionProps,
  DrawerTriggerProps,
} from "./types";
import {
  drawerContentVariants,
  drawerOverlayVariants,
  drawerTriggerVariants,
} from "./variants";

const DrawerContext = createContext<DrawerCtx | null>(null);

export function useDrawerContext(component: string): DrawerCtx {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Drawer>`);
  }
  return ctx;
}

export function Drawer({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: DrawerProps) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const resolvedOpen = isControlled ? Boolean(open) : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const contentRef = useRef<HTMLDivElement | null>(null);

  const ctx = useMemo(
    () => ({
      open: resolvedOpen,
      setOpen,
      titleId,
      descriptionId,
      contentRef,
    }),
    [descriptionId, resolvedOpen, setOpen, titleId],
  );

  return (
    <DrawerContext.Provider value={ctx}>{children}</DrawerContext.Provider>
  );
}

Drawer.displayName = "Drawer";

export function DrawerTrigger({
  className,
  children,
  appearance,
  onClick,
  ref,
  ...rest
}: DrawerTriggerProps) {
  const { setOpen } = useDrawerContext("DrawerTrigger");
  return (
    <button
      ref={ref}
      type="button"
      data-slot="drawer-trigger"
      className={cn(drawerTriggerVariants({ appearance }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

DrawerTrigger.displayName = "DrawerTrigger";

export function DrawerContent({
  className,
  side = "right",
  size,
  appearance,
  children,
  ref,
  id,
  style,
}: DrawerContentProps) {
  const { open, setOpen, titleId, descriptionId, contentRef } =
    useDrawerContext("DrawerContent");
  const resolvedSide = side ?? "right";

  useFocusManagement({
    open,
    setOpen,
    contentRef,
  });

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) {
    return null;
  }

  return createPortal(
    open ? (
      <div className="fixed inset-0 z-50" data-slot="drawer-portal">
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          data-slot="drawer-overlay"
          className={drawerOverlayVariants()}
          onClick={() => setOpen(false)}
        />
        <div
          ref={(node) => {
            contentRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as RefObject<HTMLDivElement | null>).current = node;
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          data-slot="drawer-content"
          tabIndex={-1}
          className={cn(
            drawerContentVariants({ side: resolvedSide, size, appearance }),
            className,
          )}
          id={id}
          style={style}
        >
          {children}
        </div>
      </div>
    ) : null,
    portalTarget,
  );
}

DrawerContent.displayName = "DrawerContent";

export function DrawerHeader({ className, children }: DrawerSectionProps) {
  return (
    <header
      data-slot="drawer-header"
      className={cn("mb-4 flex flex-col gap-2", className)}
    >
      {children}
    </header>
  );
}

DrawerHeader.displayName = "DrawerHeader";

export function DrawerBody({ className, children }: DrawerSectionProps) {
  return (
    <div
      data-slot="drawer-body"
      className={cn("flex-1 text-sm text-slate-300", className)}
    >
      {children}
    </div>
  );
}

DrawerBody.displayName = "DrawerBody";

export function DrawerFooter({ className, children }: DrawerSectionProps) {
  return (
    <footer
      data-slot="drawer-footer"
      className={cn("mt-6 flex justify-end gap-2", className)}
    >
      {children}
    </footer>
  );
}

DrawerFooter.displayName = "DrawerFooter";

export function DrawerTitle({ className, children }: DrawerSectionProps) {
  const { titleId } = useDrawerContext("DrawerTitle");
  return (
    <h2
      id={titleId}
      data-slot="drawer-title"
      className={cn("text-lg font-semibold", className)}
    >
      {children}
    </h2>
  );
}

DrawerTitle.displayName = "DrawerTitle";

export function DrawerClose({
  className,
  children,
  ...rest
}: DrawerSectionProps) {
  const { setOpen } = useDrawerContext("DrawerClose");
  return (
    <button
      type="button"
      data-slot="drawer-close"
      className={cn(
        "absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-md text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        className,
      )}
      aria-label="Close drawer"
      onClick={() => setOpen(false)}
      {...rest}
    >
      {children ?? "×"}
    </button>
  );
}

DrawerClose.displayName = "DrawerClose";
