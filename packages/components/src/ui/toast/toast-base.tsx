"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/utils";

import type {
  ToastContextValue,
  ToastStoreContextValue,
  InternalToast,
  ToastInput,
  ToastProps,
  ToastProviderProps,
  ToastSectionProps,
  ToastViewportProps,
} from "./types";
import { toastRootVariants, toastViewportVariants } from "./variants";

export const ToastStoreContext = createContext<ToastStoreContextValue | null>(
  null,
);

let toastDispatcher: ToastStoreContextValue["push"] | null = null;

export function toast(input: ToastInput) {
  if (!toastDispatcher) {
    return "";
  }
  return toastDispatcher(input);
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastStoreContext);
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>");
  }
  return { toast: ctx.push, dismiss: ctx.dismiss };
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<InternalToast[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timerId = timers.current.get(id);
    if (timerId) {
      window.clearTimeout(timerId);
      timers.current.delete(id);
    }
    setToasts((prev) => prev.filter((toastItem) => toastItem.id !== id));
  }, []);

  const push = useCallback(
    (input: ToastInput) => {
      const id = input.id ?? `toast-${Math.random().toString(16).slice(2)}`;
      const durationMs = input.durationMs ?? 4500;
      const record: InternalToast = {
        ...input,
        id,
        durationMs,
        animation: input.animation ?? "slide",
      };
      setToasts((prev) => [...prev, record]);
      const timerId = window.setTimeout(() => dismiss(id), durationMs);
      timers.current.set(id, timerId);
      return id;
    },
    [dismiss],
  );

  const ctx = useMemo(
    () => ({
      toasts,
      push,
      dismiss,
    }),
    [dismiss, push, toasts],
  );

  useEffect(() => {
    toastDispatcher = push;
    return () => {
      toastDispatcher = null;
    };
  }, [push]);

  return (
    <ToastStoreContext.Provider value={ctx}>
      {children}
    </ToastStoreContext.Provider>
  );
}

ToastProvider.displayName = "ToastProvider";

export function ToastViewport({
  position = "bottom-right",
  className,
}: ToastViewportProps) {
  const ctx = useContext(ToastStoreContext);
  if (!ctx) {
    throw new Error("ToastViewport must be used within <ToastProvider>");
  }

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div
      className={cn(toastViewportVariants({ position }), className)}
      data-slot="toast-viewport"
    >
      {ctx.toasts.map((item) => (
        <Toast
          key={item.id}
          toastId={item.id}
          appearance={item.appearance}
          size={item.size}
          animation={item.animation}
        >
          <ToastTitle>{item.title}</ToastTitle>
          {item.description ? (
            <ToastDescription>{item.description}</ToastDescription>
          ) : null}
          <ToastClose onClick={() => ctx.dismiss(item.id)} />
        </Toast>
      ))}
    </div>,
    portalTarget,
  );
}

ToastViewport.displayName = "ToastViewport";

export function Toast({
  toastId: _toastId,
  appearance,
  size,
  animation: _animation = "slide",
  className,
  children,
}: ToastProps) {
  const live = appearance === "error" ? "assertive" : "polite";

  return (
    <div
      data-slot="toast"
      role={appearance === "error" ? "alert" : "status"}
      aria-live={live}
      aria-atomic="true"
      className={cn(
        "relative",
        toastRootVariants({ appearance, size }),
        className,
      )}
    >
      {children}
    </div>
  );
}

Toast.displayName = "Toast";

export function ToastTitle({ className, children }: ToastSectionProps) {
  return (
    <div data-slot="toast-title" className={cn("font-semibold", className)}>
      {children}
    </div>
  );
}

ToastTitle.displayName = "ToastTitle";

export function ToastDescription({ className, children }: ToastSectionProps) {
  return (
    <div
      data-slot="toast-description"
      className={cn("text-sm text-slate-300", className)}
    >
      {children}
    </div>
  );
}

ToastDescription.displayName = "ToastDescription";

export function ToastAction({ className, children }: ToastSectionProps) {
  return (
    <div data-slot="toast-action" className={cn("mt-3", className)}>
      {children}
    </div>
  );
}

ToastAction.displayName = "ToastAction";

export function ToastClose({
  className,
  children,
  onClick,
  ...rest
}: ToastSectionProps & { onClick?: () => void }) {
  return (
    <button
      type="button"
      data-slot="toast-close"
      aria-label="Dismiss notification"
      className={cn(
        "absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-slate-200 transition hover:bg-white/10",
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children ?? "×"}
    </button>
  );
}

ToastClose.displayName = "ToastClose";
