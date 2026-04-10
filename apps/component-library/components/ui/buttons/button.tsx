"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { ButtonProps } from "./types";
import { animationPresets } from "./animations";
import { buttonVariants } from "./variants";

export const Button = (props: ButtonProps) => {
  if (props.as === "link") {
    const {
      className,
      appearance,
      size,
      children,
      ref,
      href,
      target,
      animation = "none",
      ...rest
    } = props;
    const motionProps = animationPresets[animation];

    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        data-slot="button"
        className={cn(buttonVariants({ appearance, size }), className)}
        initial={false}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  const {
    className,
    appearance,
    size,
    type = "button",
    children,
    ref,
    animation = "none",
    ...rest
  } = props;
  const motionProps = animationPresets[animation];

  return (
    <motion.button
      ref={ref}
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ appearance, size }), className)}
      initial={false}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

Button.displayName = "Button";
