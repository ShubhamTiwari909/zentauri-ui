"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import { cn } from "../../../lib/utils";

import { secretRevealAnimationPresets } from "./animations";
import type { SecretRevealAnimatedProps } from "./types";
import {
  secretRevealLabelVariants,
  secretRevealToggleVariants,
  secretRevealValueVariants,
  secretRevealVariants,
} from "../variants";

export function SecretRevealAnimated({
  appearance,
  size,
  value,
  children,
  label,
  labelPosition = "top",
  initiallyRevealed = false,
  onVisibilityChange,
  animation = "fade",
  muteChar = "•",
  className,
  ref,
  ...rest
}: SecretRevealAnimatedProps) {
  const [revealed, setRevealed] = useState(initiallyRevealed);

  const toggle = useCallback(() => {
    const next = !revealed;
    setRevealed(next);
    onVisibilityChange?.(next);
  }, [onVisibilityChange, revealed]);

  const preset = secretRevealAnimationPresets[animation];
  const displayText = value ?? (typeof children === "string" ? children : "");

  return (
    <div
      ref={ref}
      data-slot="secret-reveal"
      className={cn(secretRevealVariants({ appearance, size }), className)}
      {...rest}
    >
      {label && labelPosition === "top" && (
        <span
          data-slot="secret-reveal-label"
          className={secretRevealLabelVariants({ size })}
        >
          {label}
        </span>
      )}
      <span className="flex items-center gap-2 flex-1 min-w-0">
        {label && labelPosition === "side" && (
          <span
            data-slot="secret-reveal-label"
            className={secretRevealLabelVariants({ size })}
          >
            {label}
          </span>
        )}
        <span
          data-slot="secret-reveal-value"
          className={cn(
            secretRevealValueVariants({ size }),
            "flex-1 min-w-0 truncate",
          )}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={revealed ? "revealed" : "hidden"}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={preset.variants}
              transition={preset.transition}
              className="inline-block"
            >
              {revealed
                ? (value ?? children)
                : muteChar.repeat(displayText.length || 8)}
            </motion.span>
          </AnimatePresence>
        </span>
        <button
          type="button"
          data-slot="secret-reveal-toggle"
          className={secretRevealToggleVariants({ size, appearance })}
          onClick={toggle}
          aria-label={revealed ? "Hide secret" : "Reveal secret"}
        >
          {revealed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </span>
    </div>
  );
}

SecretRevealAnimated.displayName = "SecretRevealAnimated";
