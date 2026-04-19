"use client";

import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import type { SpinnerProps } from "./types";
import { spinnerVariants } from "./variants";

export function Spinner(props: SpinnerProps) {
  const {
    className,
    appearance,
    size,
    variant = "ring",
    ref,
    "aria-label": ariaLabel = "Loading",
    ...rest
  } = props;
  const rootClass = cn(
    spinnerVariants({ appearance, size, variant }),
    className,
  );

  if (variant === "ring") {
    return (
      <motion.span
        ref={ref}
        role="status"
        data-slot="spinner"
        aria-label={ariaLabel}
        className={cn(rootClass, "relative")}
        initial={false}
        {...rest}
      >
        <motion.span
          className="block size-full rounded-full border-2 border-current border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 0.85 }}
          aria-hidden
        />
      </motion.span>
    );
  }

  if (variant === "dots") {
    const dotSizes = {
      xs: "size-1",
      sm: "size-1.5",
      md: "size-2",
      lg: "size-2.5",
      xl: "size-3",
    };
    const dotSize = dotSizes[size as keyof typeof dotSizes];
    return (
      <motion.span
        ref={ref}
        role="status"
        data-slot="spinner"
        aria-label={ariaLabel}
        className={cn(rootClass, "gap-1")}
        initial={false}
        {...rest}
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className={cn("rounded-full bg-current", dotSize)}
            animate={{ y: [0, -5, 0], opacity: [0.45, 1, 0.45] }}
            transition={{
              repeat: Infinity,
              duration: 0.55,
              ease: "easeInOut",
              delay: index * 0.12,
            }}
            aria-hidden
          />
        ))}
      </motion.span>
    );
  }

  if (variant === "pulse") {
    return (
      <motion.span
        ref={ref}
        role="status"
        data-slot="spinner"
        aria-label={ariaLabel}
        className={cn(rootClass)}
        initial={false}
        {...rest}
      >
        <motion.span
          className="block size-full rounded-full bg-current"
          animate={{ scale: [0.75, 1, 0.75], opacity: [0.45, 1, 0.45] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
          aria-hidden
        />
      </motion.span>
    );
  }

  const barWidths = {
    xs: "w-0.5",
    sm: "w-0.5",
    md: "w-1",
    lg: "w-1.5",
    xl: "w-2",
  };

  const barWidth =
    barWidths[size as keyof typeof barWidths];
    
  return (
    <motion.span
      ref={ref}
      role="status"
      data-slot="spinner"
      aria-label={ariaLabel}
      className={cn(rootClass, "gap-1")}
      initial={false}
      {...rest}
    >
      {[0, 1, 2, 3].map((index) => (
        <motion.span
          key={index}
          className={cn("h-full max-h-[70%] rounded-full bg-current", barWidth)}
          animate={{ scaleY: [0.35, 1, 0.35] }}
          transition={{
            repeat: Infinity,
            duration: 0.65,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
          aria-hidden
        />
      ))}
    </motion.span>
  );
}

Spinner.displayName = "Spinner";
