"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { ButtonProps } from "./types";
import { animationPresets } from "./animations";
import { buttonVariants } from "./variants";

export const Button = ({
  className,
  appearance,
  size,
  animation = "none",
  type = "button",
  children,
  ref,
  as,
  href,
  target,
  ...props
}: ButtonProps) => {
  const motionProps = animationPresets[animation];
  const Component = as === "link" ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      {...(as === "link" ? { href, target, rel: target === "_blank" ? "noopener noreferrer" : undefined } : { type })}
      data-slot="button"
      className={cn(buttonVariants({ appearance, size }), className)}
      initial={false}
      {...motionProps}
      {...props}
    >
     {children}
    </Component>
  );
};

Button.displayName = "Button";
