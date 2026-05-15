"use client";

import { useCallback, useMemo } from "react";

import { useControllableState } from "../useControllableState/useControllableState";

import type {
  UseDynamicStepperParams,
  UseDynamicStepperResult,
} from "../../ui/dynamic-stepper/types";

function clampDynamicStepperIndex(index: number, stepCount: number): number {
  if (stepCount <= 0) {
    return 0;
  }
  return Math.min(Math.max(index, 0), stepCount - 1);
}

/**
 * Headless multi-step index with prev/next navigation.
 *
 * @param params.stepCount - Number of steps (0-based count semantics via indices).
 * @returns Active step, setter, navigation helpers, and boundary flags.
 */
export function useDynamicStepper({
  stepCount,
  activeStep: activeStepProp,
  defaultActiveStep = 0,
  onActiveStepChange,
  onPrevious,
  onNext,
}: UseDynamicStepperParams): UseDynamicStepperResult {
  const [storedStep, setStoredStep] = useControllableState<number>({
    value: activeStepProp,
    defaultValue: clampDynamicStepperIndex(defaultActiveStep, stepCount),
    onChange: onActiveStepChange,
  });

  const activeStep = useMemo(
    () => clampDynamicStepperIndex(storedStep, stepCount),
    [storedStep, stepCount],
  );

  const canGoPrevious = stepCount > 0 && activeStep > 0;
  const canGoNext = stepCount > 0 && activeStep < stepCount - 1;

  const setActiveStep = useCallback(
    (next: number | ((prev: number) => number)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: number) => number)(activeStep)
          : next;
      setStoredStep(clampDynamicStepperIndex(resolved, stepCount));
    },
    [activeStep, setStoredStep, stepCount],
  );

  const goPrevious = useCallback(() => {
    if (!canGoPrevious) {
      return;
    }
    const nextStep = clampDynamicStepperIndex(activeStep - 1, stepCount);
    setStoredStep(nextStep);
    onPrevious?.(nextStep);
  }, [
    activeStep,
    canGoPrevious,
    onPrevious,
    setStoredStep,
    stepCount,
  ]);

  const goNext = useCallback(() => {
    if (!canGoNext) {
      return;
    }
    const nextStep = clampDynamicStepperIndex(activeStep + 1, stepCount);
    setStoredStep(nextStep);
    onNext?.(nextStep);
  }, [activeStep, canGoNext, onNext, setStoredStep, stepCount]);

  return {
    activeStep,
    setActiveStep,
    goPrevious,
    goNext,
    canGoPrevious,
    canGoNext,
    stepCount,
  };
}
