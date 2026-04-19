"use client";

import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import { buttonAnimationPresets } from "./animations";
import type { ButtonAnimatedProps } from "./types";
import { buttonVariants } from "../variants";

export const ButtonAnimated = (props: ButtonAnimatedProps) => {
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
    const motionProps = buttonAnimationPresets[animation];

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
  const motionProps = buttonAnimationPresets[animation];

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

ButtonAnimated.displayName = "ButtonAnimated";
