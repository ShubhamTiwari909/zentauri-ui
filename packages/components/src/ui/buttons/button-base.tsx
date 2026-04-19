"use client";

import { cn } from "../../lib/utils";

import type { ButtonProps } from "./types";
import { buttonVariants } from "./variants";

export const ButtonBase = (props: ButtonProps) => {
  if (props.as === "link") {
    const {
      className,
      appearance,
      size,
      children,
      ref,
      href,
      target,
      ...rest
    } = props;

    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        data-slot="button"
        className={cn(buttonVariants({ appearance, size }), className)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const {
    className,
    appearance,
    size,
    type = "button",
    children,
    ref,
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ appearance, size }), className)}
      {...rest}
    >
      {children}
    </button>
  );
};

ButtonBase.displayName = "Button";
