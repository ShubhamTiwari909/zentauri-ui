"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl",
    "text-sm font-medium ring-offset-slate-950 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-slate-50 text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.12)] hover:bg-white",
        secondary: "bg-slate-800 text-slate-50 hover:bg-slate-700",
        destructive: "bg-rose-500 text-white hover:bg-rose-600",
        outline:
          "border border-white/10 bg-white/5 text-slate-50 hover:bg-white/10",
        ghost: "bg-transparent text-slate-200 hover:bg-white/5",
        link: "bg-transparent text-cyan-300 underline-offset-4 hover:underline",
        glass:
          "border border-white/15 bg-white/10 text-white backdrop-blur-md hover:bg-white/15",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-4",
        lg: "h-12 px-5 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type ButtonAnimation =
  | "none"
  | "lift"
  | "press"
  | "glow"
  | "tilt"
  | "bounce";

type ButtonProps = HTMLMotionProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    animation?: ButtonAnimation;
  };

const animationPresets: Record<ButtonAnimation, HTMLMotionProps<"button">> = {
  none: {},
  lift: {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
  press: {
    whileTap: { scale: 0.96 },
    transition: { type: "spring", stiffness: 520, damping: 30 },
  },
  glow: {
    whileHover: {
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.25), 0 18px 42px rgba(15,23,42,0.35)",
      scale: 1.01,
    },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tilt: {
    whileHover: { rotateX: 6, rotateY: -6, scale: 1.01 },
    whileTap: { scale: 0.98, rotateX: 0, rotateY: 0 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
    style: { transformStyle: "preserve-3d" },
  },
  bounce: {
    whileHover: { y: -4, scale: 1.03 },
    whileTap: { y: 0, scale: 0.97 },
    transition: { type: "spring", bounce: 0.45, duration: 0.45 },
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation = "none",
      type = "button",
      children,
      ...props
    },
    ref,
  ) => {
    const motionProps = animationPresets[animation];

    return (
      <motion.button
        ref={ref}
        type={type}
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        initial={false}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
