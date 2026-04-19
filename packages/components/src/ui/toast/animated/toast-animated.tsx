"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { createPortal } from "react-dom";

import { cn } from "../../../lib/utils";

import { toastAnimationPresets } from "./animations";
import type { ToastProps, ToastViewportProps } from "../types";
import { toastRootVariants, toastViewportVariants } from "../variants";
import {
  ToastClose,
  ToastDescription,
  ToastStoreContext,
  ToastTitle,
} from "../toast-base";

export function ToastViewportAnimated({
  position = "bottom-right",
  className,
}: ToastViewportProps) {
  const ctx = useContext(ToastStoreContext);
  if (!ctx) {
    throw new Error("ToastViewportAnimated must be used within <ToastProvider>");
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
      <AnimatePresence>
        {ctx.toasts.map((item) => (
          <ToastAnimated
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
          </ToastAnimated>
        ))}
      </AnimatePresence>
    </div>,
    portalTarget,
  );
}

ToastViewportAnimated.displayName = "ToastViewport";

export function ToastAnimated({
  toastId: _toastId,
  appearance,
  size,
  animation = "slide",
  className,
  children,
}: ToastProps) {
  const live = appearance === "error" ? "assertive" : "polite";

  const motionProps = toastAnimationPresets[animation];

  return (
    <motion.div
      layout
      data-slot="toast"
      role={appearance === "error" ? "alert" : "status"}
      aria-live={live}
      aria-atomic="true"
      className={cn(
        "relative",
        toastRootVariants({ appearance, size }),
        className,
      )}
      initial={animation === "none" ? false : motionProps.initial}
      animate={animation === "none" ? undefined : motionProps.animate}
      exit={animation === "none" ? undefined : motionProps.exit}
      transition={motionProps.transition}
    >
      {children}
    </motion.div>
  );
}

ToastAnimated.displayName = "Toast";
