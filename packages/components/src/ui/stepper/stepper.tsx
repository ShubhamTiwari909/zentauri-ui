"use client";

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  type Ref,
} from "react";

import { cn } from "../../lib/utils";

import type {
  StepperCtx,
  StepperDescriptionProps,
  StepperIndicatorProps,
  StepperItemProps,
  StepperProps,
  StepperTitleProps,
} from "./types";
import {
  stepperIndicatorVariants,
  stepperItemVariants,
  stepperVariants,
} from "./variants";


const StepperContext = createContext<StepperCtx | null>(null);

function useStepper(component: string): StepperCtx {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Stepper>`);
  }
  return ctx;
}

const StepperIndexContext = createContext<number | null>(null);

function useStepperIndex(component: string): number {
  const index = useContext(StepperIndexContext);
  if (index === null) {
    throw new Error(`${component} must be used within <StepperItem>`);
  }
  return index;
}


export function Stepper({
  className,
  orientation = "horizontal",
  size = "md",
  children,
  ref,
  ...rest
}: StepperProps & { ref?: Ref<HTMLDivElement> }) {
  const items = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );
  const ctx = useMemo(
    () => ({
      orientation: orientation ?? "horizontal",
      size: size ?? "md",
      total: items.length,
    }),
    [items.length, orientation, size],
  );

  return (
    <StepperContext.Provider value={ctx}>
      <div
        ref={ref}
        data-slot="stepper"
        role="list"
        className={cn(stepperVariants({ orientation }), className)}
        {...rest}
      >
        {items.map((child, index) => (
          <StepperIndexContext.Provider key={index} value={index}>
            {child}
          </StepperIndexContext.Provider>
        ))}
      </div>
    </StepperContext.Provider>
  );
}

Stepper.displayName = "Stepper";

export function StepperItem({
  className,
  ref,
  children,
  ...rest
}: StepperItemProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { orientation } = useStepper("StepperItem");
  return (
    <div
      ref={ref}
      data-slot="stepper-item"
      role="listitem"
      className={cn(stepperItemVariants({ orientation }), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

StepperItem.displayName = "StepperItem";

export function StepperIndicator({
  className,
  ref,
  children,
  appearance,
  ...rest
}: StepperIndicatorProps & { ref?: React.Ref<HTMLDivElement> }) {
  const { size } = useStepper("StepperIndicator");
  const index = useStepperIndex("StepperIndicator");
  return (
    <div
      ref={ref}
      data-slot="stepper-indicator"
      className={cn(stepperIndicatorVariants({ appearance, size }), className)}
      {...rest}
    >
      {children ?? index + 1}
    </div>
  );
}

StepperIndicator.displayName = "StepperIndicator";

export function StepperTitle({
  className,
  ref,
  ...rest
}: StepperTitleProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="stepper-title"
      className={cn(
        "mt-3 text-sm font-semibold",
        className,
      )}
      {...rest}
    />
  );
}

StepperTitle.displayName = "StepperTitle";

export function StepperDescription({
  className,
  ref,
  ...rest
}: StepperDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      data-slot="stepper-description"
      className={cn("mt-1 text-xs text-slate-400", className)}
      {...rest}
    />
  );
}

StepperDescription.displayName = "StepperDescription";
