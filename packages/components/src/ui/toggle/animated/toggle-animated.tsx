"use client";

import { motion } from "framer-motion";
import { useCallback, useId, useState } from "react";

import { cn } from "../../../lib/utils";

import { toggleThumbAnimationPresets } from "./animations";
import type { ToggleAnimatedProps } from "./types";
import { toggleThumbVariants, toggleTrackVariants } from "../variants";
import { hasToggleLabelChildren } from "../toggle-base";

export function ToggleAnimated(props: ToggleAnimatedProps) {
  const {
    className,
    size,
    appearance,
    thumbColor,
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
  const toggleLabelId = useId();
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

  const thumbShiftPx = size === "sm" ? 16 : size === "lg" ? 24 : 20;
  const labeledByChildren = hasToggleLabelChildren(children);
  const labeling = labeledByChildren
    ? {
        "aria-labelledby": toggleLabelId,
      }
    : {
        "aria-label": ariaLabel ?? "Toggle",
      };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      data-slot="toggle"
      aria-checked={resolved}
      data-state={resolved ? "checked" : "unchecked"}
      disabled={disabled}
      {...labeling}
      className={cn(toggleTrackVariants({ size, appearance }), className)}
      onClick={() => {
        if (!disabled) {
          setChecked(!resolved);
        }
      }}
      {...rest}
    >
      <span className="sr-only" id={labeledByChildren ? toggleLabelId : undefined}>{children}</span>
      <motion.span
        className={cn(
          toggleThumbVariants({ size, thumbColor }),
          "absolute left-1 top-1/2 -translate-y-1/2",
        )}
        animate={{ x: resolved ? thumbShiftPx : 0 }}
        transition={thumbMotion.transition}
        layout={thumbMotion.layout}
      />
    </button>
  );
}

ToggleAnimated.displayName = "Toggle";
