"use client";

import { motion } from "framer-motion";
import { useCallback, useId, useState } from "react";

import { cn } from "../../../lib/utils";

import { checkboxAnimationPresets } from "./animations";
import type { CheckboxAnimatedProps } from "./types";
import type { CheckboxState } from "../types";
import {
  checkboxControlVariants,
  checkboxIndicatorVariants,
  checkboxRootVariants,
} from "../variants";

function resolveCheckboxState(
  checked: boolean,
  indeterminate: boolean | undefined,
): CheckboxState {
  if (indeterminate) {
    return "indeterminate";
  }
  return checked ? "checked" : "unchecked";
}

export function CheckboxAnimated(props: CheckboxAnimatedProps) {
  const {
    className,
    rootClassName,
    controlClassName,
    indicatorClassName,
    appearance,
    size,
    checked,
    defaultChecked = false,
    indeterminate,
    onCheckedChange,
    disabled,
    children,
    label,
    id,
    ref,
    "aria-label": ariaLabel,
    animation = "draw",
    ...rest
  } = props;
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const isControlled = checked !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const resolvedChecked = isControlled ? Boolean(checked) : uncontrolled;
  const state = resolveCheckboxState(resolvedChecked, indeterminate);
  const labelContent = label ?? children;
  const hasVisibleLabel =
    labelContent !== undefined &&
    labelContent !== null &&
    labelContent !== false;
  const motionPreset = checkboxAnimationPresets[animation];
  const svgMotionProps = animation === "spring" ? motionPreset : undefined;
  const pathMotionProps = animation === "draw" ? motionPreset : undefined;

  const setChecked = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onCheckedChange?.(next);
    },
    [isControlled, onCheckedChange],
  );

  return (
    <label
      className={cn(checkboxRootVariants({ size }), rootClassName, className)}
      data-disabled={disabled ? "true" : undefined}
      data-state={state}
      htmlFor={controlId}
    >
      <input
        ref={ref}
        id={controlId}
        type="checkbox"
        data-slot="checkbox"
        className="peer sr-only"
        checked={resolvedChecked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : resolvedChecked}
        aria-label={ariaLabel ?? (hasVisibleLabel ? undefined : "Checkbox")}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          checkboxControlVariants({ appearance, size }),
          controlClassName,
        )}
        data-slot="checkbox-control"
      >
        {state !== "unchecked" && (
          <motion.svg
            key={state}
            viewBox="0 0 16 16"
            fill="none"
            className={cn(
              checkboxIndicatorVariants({ size }),
              "opacity-100",
              indicatorClassName,
            )}
            initial={svgMotionProps?.initial}
            animate={svgMotionProps?.animate}
            transition={svgMotionProps?.transition}
          >
            {state === "indeterminate" ? (
              <motion.path
                d="M3.5 8H12.5"
                strokeWidth="2.4"
                strokeLinecap="round"
                initial={pathMotionProps?.initial}
                animate={pathMotionProps?.animate}
                transition={pathMotionProps?.transition}
              />
            ) : (
              <motion.path
                d="M3.2 8.4L6.5 11.5L12.8 4.5"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={pathMotionProps?.initial}
                animate={pathMotionProps?.animate}
                transition={pathMotionProps?.transition}
              />
            )}
          </motion.svg>
        )}
      </span>
      {hasVisibleLabel && (
        <span className="min-w-0 leading-6" data-slot="checkbox-label">
          {labelContent}
        </span>
      )}
    </label>
  );
}

CheckboxAnimated.displayName = "Checkbox";
