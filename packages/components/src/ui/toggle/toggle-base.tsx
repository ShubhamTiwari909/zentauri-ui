"use client";

import { useCallback, useState } from "react";

import { cn } from "../../lib/utils";

import type { ToggleProps } from "./types";
import { toggleThumbVariants, toggleTrackVariants } from "./variants";

export function ToggleBase(props: ToggleProps) {
  const {
    className,
    size,
    appearance,
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled,
    ref,
    "aria-label": ariaLabel = "Toggle",
    children,
    ...rest
  } = props;
  const isControlled = checked !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const resolved = isControlled ? Boolean(checked) : uncontrolled;

  const setChecked = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onCheckedChange?.(next);
    },
    [isControlled, onCheckedChange],
  );

  const thumbShiftPx = size === "sm" ? 14 : size === "lg" ? 26 : 20;

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      data-slot="toggle"
      aria-checked={resolved}
      aria-label={ariaLabel}
      data-state={resolved ? "checked" : "unchecked"}
      disabled={disabled}
      className={cn(toggleTrackVariants({ size, appearance }), className)}
      onClick={() => {
        if (!disabled) {
          setChecked(!resolved);
        }
      }}
      {...rest}
    >
      <span className="sr-only">{children}</span>
      <span
        className={cn(
          toggleThumbVariants({ size }),
          "absolute left-1 top-1/2 -translate-y-1/2 transition-[transform] duration-200 ease-out",
        )}
        style={{ transform: `translateX(${resolved ? thumbShiftPx : 0}px)` }}
      />
    </button>
  );
}

ToggleBase.displayName = "Toggle";
