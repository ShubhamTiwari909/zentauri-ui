"use client";

import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

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
  const rootClass = cn(spinnerVariants({ appearance, size, variant }), className);

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
    const dotSize =
      size === "xs"
        ? "size-1"
        : size === "sm"
          ? "size-1.5"
          : size === "md"
            ? "size-2"
            : size === "lg"
              ? "size-2.5"
              : "size-3";
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

  const barWidth =
    size === "xs"
      ? "w-0.5"
      : size === "sm"
        ? "w-0.5"
        : size === "md"
          ? "w-1"
          : size === "lg"
            ? "w-1.5"
            : "w-2";
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
