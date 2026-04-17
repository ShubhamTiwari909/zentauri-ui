"use client";

import { createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";
import {
  HiExclamationTriangle,
  HiInformationCircle,
  HiXMark,
} from "react-icons/hi2";

import { cn } from "../../lib/utils";

import { alertAnimationPresets } from "./animations";
import type { AlertProps, AlertSectionProps, AlertSize } from "./types";
import {
  alertDescriptionVariants,
  alertTitleVariants,
  alertVariants,
} from "./variants";

const AlertSizeContext = createContext<AlertSize>("md");

function useAlertSize(): AlertSize {
  const ctx = useContext(AlertSizeContext);
  if (!ctx) {
    throw new Error("useAlertSize must be used within an Alert");
  }
  return ctx;
}

export function Alert(props: AlertProps) {
  const {
    className,
    triggerClassName,
    appearance,
    size = "md",
    animation = "none",
    closable = false,
    onClose,
    closeLabel = "Dismiss alert",
    children,
    ref,
    ...rest
  } = props;
  const motionProps = alertAnimationPresets[animation];
  const live = appearance === "error" ? "assertive" : "polite";

  const ctx = useMemo(() => size ?? "md", [size]);

  return (
    <AlertSizeContext.Provider value={ctx}>
      <motion.div
        ref={ref}
        data-slot="alert"
        role="alert"
        aria-live={live}
        className={cn(
          alertVariants({ appearance, size }),
          closable ? "pr-12" : "",
          className,
        )}
        initial={animation === "none" ? false : undefined}
        {...motionProps}
        {...rest}
      >
        {children}
        {closable ? (
          <button
            type="button"
            data-slot="alert-close"
            aria-label={closeLabel}
            onClick={onClose}
            className={cn(
              "absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              triggerClassName,
            )}
          >
            <HiXMark className="size-4" aria-hidden />
          </button>
        ) : null}
      </motion.div>
    </AlertSizeContext.Provider>
  );
}

Alert.displayName = "Alert";

export function AlertIcon({ className, children }: AlertSectionProps) {
  return (
    <span
      data-slot="alert-icon"
      className={cn("mt-0.5 shrink-0 text-current", className)}
    >
      {children}
    </span>
  );
}

AlertIcon.displayName = "AlertIcon";

export function AlertTitle({ className, children }: AlertSectionProps) {
  const size = useAlertSize();
  return (
    <div
      data-slot="alert-title"
      className={cn(alertTitleVariants({ size }), className)}
    >
      {children}
    </div>
  );
}

AlertTitle.displayName = "AlertTitle";

export function AlertDescription({ className, children }: AlertSectionProps) {
  const size = useAlertSize();
  return (
    <div
      data-slot="alert-description"
      className={cn(alertDescriptionVariants({ size }), className)}
    >
      {children}
    </div>
  );
}

AlertDescription.displayName = "AlertDescription";

export function AlertClose({
  className,
  children,
  "aria-label": ariaLabel = "Dismiss alert",
  onClick,
}: AlertSectionProps & { onClick?: () => void; "aria-label"?: string }) {
  return (
    <button
      type="button"
      data-slot="alert-close"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        className,
      )}
    >
      {children ?? <HiXMark className="size-4" aria-hidden />}
    </button>
  );
}

AlertClose.displayName = "AlertClose";

export function AlertDefaultIcon({
  appearance,
}: {
  appearance?: AlertProps["appearance"];
}) {
  if (appearance === "error") {
    return <HiExclamationTriangle className="size-5" aria-hidden />;
  }
  return <HiInformationCircle className="size-5" aria-hidden />;
}
