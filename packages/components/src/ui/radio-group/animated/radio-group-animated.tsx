"use client";

import { motion } from "framer-motion";
import { useCallback, useId, useState } from "react";

import { cn } from "../../../lib/utils";

import { radioGroupAnimationPresets } from "./animations";
import type {
  RadioGroupAnimatedProps,
  RadioGroupItemAnimatedProps,
} from "./types";
import {
  RadioGroupContext,
  useRadioGroupContext,
} from "../radio-group-context";
import {
  radioGroupControlVariants,
  radioGroupIndicatorVariants,
  radioGroupItemVariants,
  radioGroupRootVariants,
} from "../variants";

export function RadioGroupAnimated(props: RadioGroupAnimatedProps) {
  const {
    className,
    value,
    defaultValue,
    name,
    disabled,
    required,
    onValueChange,
    orientation,
    appearance,
    size,
    children,
    ref,
    animation: _animation,
    ...rest
  } = props;
  const generatedName = useId();
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const resolvedValue = isControlled ? value : uncontrolled;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return (
    <RadioGroupContext.Provider
      value={{
        value: resolvedValue,
        name: name ?? generatedName,
        disabled,
        required,
        appearance: appearance ?? undefined,
        size: size ?? undefined,
        onValueChange: setValue,
      }}
    >
      <div
        ref={ref}
        role="radiogroup"
        data-slot="radio-group"
        data-orientation={orientation ?? "vertical"}
        className={cn(radioGroupRootVariants({ orientation }), className)}
        {...rest}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

RadioGroupAnimated.displayName = "RadioGroup";

export function RadioGroupItemAnimated(props: RadioGroupItemAnimatedProps) {
  const {
    className,
    rootClassName,
    controlClassName,
    indicatorClassName,
    value,
    appearance: appearanceProp,
    size: sizeProp,
    disabled: disabledProp,
    required: requiredProp,
    children,
    label,
    id,
    ref,
    "aria-label": ariaLabel,
    animation = "pop",
    ...rest
  } = props;
  const generatedId = useId();
  const context = useRadioGroupContext();
  const controlId = id ?? generatedId;
  const checked = context?.value === value;
  const disabled = disabledProp ?? context?.disabled;
  const required = requiredProp ?? context?.required;
  const appearance = appearanceProp ?? context?.appearance;
  const size = sizeProp ?? context?.size;
  const labelContent = label ?? children;
  const hasVisibleLabel =
    labelContent !== undefined && labelContent !== null && labelContent !== false;
  const motionPreset = radioGroupAnimationPresets[animation];

  return (
    <label
      className={cn(radioGroupItemVariants({ size }), rootClassName, className)}
      data-disabled={disabled ? "true" : undefined}
      data-state={checked ? "checked" : "unchecked"}
      htmlFor={controlId}
    >
      <input
        ref={ref}
        id={controlId}
        type="radio"
        data-slot="radio-group-item"
        className="peer sr-only"
        name={context?.name}
        value={value}
        checked={checked}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel ?? (hasVisibleLabel ? undefined : value)}
        onChange={(event) => {
          if (event.currentTarget.checked) {
            context?.onValueChange(value);
          }
        }}
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          radioGroupControlVariants({ appearance, size }),
          controlClassName,
        )}
        data-slot="radio-group-control"
      >
        {checked && (
          <motion.span
            className={cn(
              radioGroupIndicatorVariants({ size }),
              "opacity-100",
              indicatorClassName,
            )}
            data-slot="radio-group-indicator"
            initial={motionPreset.initial}
            animate={motionPreset.animate}
            transition={motionPreset.transition}
          />
        )}
      </span>
      {hasVisibleLabel && (
        <span className="min-w-0 leading-6" data-slot="radio-group-label">
          {labelContent}
        </span>
      )}
    </label>
  );
}

RadioGroupItemAnimated.displayName = "RadioGroupItem";
