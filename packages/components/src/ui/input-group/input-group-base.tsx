"use client";

import { createContext, useContext } from "react";
import { cn } from "../../lib/utils";
import {
  zuiInputGroupAction,
  zuiInputGroupAddon,
} from "../../design-system/input-group";
import { inputGroupVariants } from "./variants";
import type {
  InputGroupActionProps,
  InputGroupAddonProps,
  InputGroupInputProps,
  InputGroupProps,
} from "./types";

const DisabledContext = createContext(false);

export function InputGroupBase({
  appearance,
  size,
  disabled = false,
  className,
  children,
  ref,
  ...rest
}: InputGroupProps) {
  return (
    <DisabledContext.Provider value={disabled}>
      <div
        ref={ref}
        data-slot="input-group"
        data-disabled={disabled || undefined}
        className={cn(inputGroupVariants({ appearance, size }), className)}
        {...rest}
      >
        {children}
      </div>
    </DisabledContext.Provider>
  );
}

export function InputGroupInputBase({
  className,
  disabled,
  ref,
  ...rest
}: InputGroupInputProps) {
  const groupDisabled = useContext(DisabledContext);
  return (
    <input
      ref={ref}
      data-slot="input-group-input"
      disabled={disabled || groupDisabled}
      className={cn(
        "min-w-0 flex-1 bg-transparent text-inherit outline-none placeholder:text-[color:var(--zui-input-group-placeholder,currentColor)] dark:placeholder:text-[color:var(--zui-input-group-placeholder-dark,currentColor)] placeholder:opacity-60 disabled:cursor-not-allowed",
        className,
      )}
      {...rest}
    />
  );
}

export function InputGroupAddonBase({
  className,
  ref,
  ...rest
}: InputGroupAddonProps) {
  return (
    <span
      ref={ref}
      data-slot="input-group-addon"
      className={cn(zuiInputGroupAddon, className)}
      {...rest}
    />
  );
}

export function InputGroupActionBase({
  type = "button",
  disabled,
  className,
  ref,
  ...rest
}: InputGroupActionProps) {
  const groupDisabled = useContext(DisabledContext);
  return (
    <button
      ref={ref}
      type={type}
      data-slot="input-group-action"
      disabled={disabled || groupDisabled}
      className={cn(zuiInputGroupAction, className)}
      {...rest}
    />
  );
}
