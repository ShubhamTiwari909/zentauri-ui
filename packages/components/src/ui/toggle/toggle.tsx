"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import { cn } from "../../lib/utils";

import { toggleThumbAnimationPresets } from "./animations";
import type { ToggleProps } from "./types";
import { toggleThumbVariants, toggleTrackVariants } from "./variants";

export function Toggle(props: ToggleProps) {
  const {
    className,
    size,
    appearance,
    animation = "spring",
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
  const thumbMotion = toggleThumbAnimationPresets[animation];

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
      <motion.span
        className={cn(
          toggleThumbVariants({ size }),
          "absolute left-1 top-1/2 -translate-y-1/2",
        )}
        animate={{ x: resolved ? thumbShiftPx : 0 }}
        transition={thumbMotion.transition}
      />
    </button>
  );
}

Toggle.displayName = "Toggle";
