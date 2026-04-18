"use client";

import { createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

import { emptyStateAnimationPresets } from "./animations";
import type { EmptyStateProps, EmptyStateSectionProps, EmptyStateSize } from "./types";
import {
  emptyStateDescriptionVariants,
  emptyStateTitleVariants,
  emptyStateVariants,
} from "./variants";

const EmptyStateSizeContext = createContext<EmptyStateSize>("md");

function useEmptyStateSize(): EmptyStateSize {
  return useContext(EmptyStateSizeContext);
}

export function EmptyState(props: EmptyStateProps) {
  const {
    className,
    size = "md",
    appearance,
    align,
    animation = "none",
    children,
    ref,
    ...rest
  } = props;
  const motionProps = emptyStateAnimationPresets[animation];
  const ctx = useMemo(() => size ?? "md", [size]);

  return (
    <EmptyStateSizeContext.Provider value={ctx}>
      <motion.section
        ref={ref}
        data-slot="empty-state"
        aria-live="polite"
        className={cn(
          emptyStateVariants({ size, appearance, align }),
          className,
        )}
        initial={animation === "none" ? false : undefined}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.section>
    </EmptyStateSizeContext.Provider>
  );
}

EmptyState.displayName = "EmptyState";

export function EmptyStateIcon({
  className,
  children,
}: EmptyStateSectionProps) {
  return (
    <div
      data-slot="empty-state-icon"
      className={cn("text-slate-300", className)}
    >
      {children}
    </div>
  );
}

EmptyStateIcon.displayName = "EmptyStateIcon";

export function EmptyStateTitle({
  className,
  children,
}: EmptyStateSectionProps) {
  const size = useEmptyStateSize();
  return (
    <h2
      data-slot="empty-state-title"
      className={cn(emptyStateTitleVariants({ size }), className)}
    >
      {children}
    </h2>
  );
}

EmptyStateTitle.displayName = "EmptyStateTitle";

export function EmptyStateDescription({
  className,
  children,
}: EmptyStateSectionProps) {
  const size = useEmptyStateSize();
  return (
    <p
      data-slot="empty-state-description"
      className={cn(emptyStateDescriptionVariants({ size }), className)}
    >
      {children}
    </p>
  );
}

EmptyStateDescription.displayName = "EmptyStateDescription";

export function EmptyStateAction({
  className,
  children,
}: EmptyStateSectionProps) {
  return (
    <div data-slot="empty-state-action" className={cn("mt-2", className)}>
      {children}
    </div>
  );
}

EmptyStateAction.displayName = "EmptyStateAction";
