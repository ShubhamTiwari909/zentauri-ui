"use client";

import { useId } from "react";

import { useDynamicStepper } from "../../hooks/useDynamicStepper/useDynamicStepper";
import { cn } from "../../lib/utils";
import { Button } from "../buttons/button";

import type { DynamicStepperProps } from "./types";
import {
  dynamicStepperIndicatorToneClass,
  dynamicStepperIndicatorVariants,
  dynamicStepperItemVariants,
  dynamicStepperMapperVariants,
  dynamicStepperRootVariants,
} from "./variants";

export const DynamicStepper = ({
  steps,
  orientation = "horizontal",
  buttonAppearance = "outline",
  buttonSize = "md",
  indicatorSize = "md",
  indicatorCompleteAppearance = "emerald",
  indicatorCurrentAppearance = "violet",
  indicatorUpcomingAppearance = "outline",
  activeStep: activeStepProp,
  defaultActiveStep,
  onActiveStepChange,
  onPrevious,
  onNext,
  prevLabel = "Previous",
  nextLabel = "Next",
  className,
  ref,
  ...rest
}: DynamicStepperProps) => {
  const baseId = useId();
  const previousId = `${baseId}-previous`;
  const nextId = `${baseId}-next`;
  const mapperId = `${baseId}-mapper`;

  const { activeStep, goPrevious, goNext, canGoPrevious, canGoNext } =
    useDynamicStepper({
      stepCount: steps.length,
      activeStep: activeStepProp,
      defaultActiveStep,
      onActiveStepChange,
      onPrevious,
      onNext,
    });

  if (steps.length === 0) {
    return null;
  }

  const itemOrientation =
    orientation === "vertical" ? "vertical" : "horizontal";

  return (
    <div
      ref={ref}
      data-slot="dynamic-stepper"
      className={cn(dynamicStepperRootVariants({ orientation }), className)}
      {...rest}
    >
      <Button
        id={previousId}
        data-slot="dynamic-stepper-previous"
        type="button"
        appearance={buttonAppearance}
        size={buttonSize}
        disabled={!canGoPrevious}
        onClick={goPrevious}
        className={
          orientation === "vertical" ? "shrink-0 self-start" : "shrink-0"
        }
      >
        {prevLabel}
      </Button>

      <ol
        id={mapperId}
        data-slot="dynamic-stepper-mapper"
        className={dynamicStepperMapperVariants({ orientation })}
      >
        {steps.map((step, index) => {
          const key = step.id ?? `dynamic-stepper-step-${index}`;
          const semanticState =
            index < activeStep
              ? "complete"
              : index === activeStep
                ? "current"
                : "upcoming";
          const indicatorTone =
            semanticState === "complete"
              ? indicatorCompleteAppearance
              : semanticState === "current"
                ? indicatorCurrentAppearance
                : indicatorUpcomingAppearance;

          const inner =
            orientation === "vertical" ? (
              <div className="flex gap-3">
                <div
                  data-slot="dynamic-stepper-indicator"
                  className={cn(
                    dynamicStepperIndicatorVariants({
                      size: indicatorSize,
                    }),
                    dynamicStepperIndicatorToneClass(
                      semanticState,
                      indicatorTone,
                    ),
                  )}
                >
                  {step.indicator ?? index + 1}
                </div>
                <div className="min-w-0">
                  {step.title != null ? (
                    <div className="text-sm font-semibold text-white">
                      {step.title}
                    </div>
                  ) : null}
                  {step.description != null ? (
                    <p className="mt-1 text-xs text-slate-400">
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <div
                  data-slot="dynamic-stepper-indicator"
                  className={cn(
                    dynamicStepperIndicatorVariants({
                      size: indicatorSize,
                    }),
                    dynamicStepperIndicatorToneClass(
                      semanticState,
                      indicatorTone,
                    ),
                  )}
                >
                  {step.indicator ?? index + 1}
                </div>
                {step.title != null ? (
                  <div className="mt-3 text-sm font-semibold text-white">
                    {step.title}
                  </div>
                ) : null}
                {step.description != null ? (
                  <p className="mt-1 text-xs text-slate-400">
                    {step.description}
                  </p>
                ) : null}
              </>
            );

          return (
            <li
              key={key}
              data-slot="dynamic-stepper-item"
              className={dynamicStepperItemVariants({
                orientation: itemOrientation,
              })}
            >
              {inner}
            </li>
          );
        })}
      </ol>

      <Button
        id={nextId}
        data-slot="dynamic-stepper-next"
        type="button"
        appearance={buttonAppearance}
        size={buttonSize}
        disabled={!canGoNext}
        onClick={goNext}
        className={
          orientation === "vertical" ? "shrink-0 self-start" : "shrink-0"
        }
      >
        {nextLabel}
      </Button>
    </div>
  );
};

DynamicStepper.displayName = "DynamicStepper";
