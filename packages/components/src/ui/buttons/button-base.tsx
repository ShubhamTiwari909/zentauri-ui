"use client";

import { cloneElement, isValidElement, type MouseEventHandler } from "react";

import { cn } from "../../lib/utils";

import type { ButtonProps } from "./types";
import { buttonVariants } from "./variants";

export const ButtonBase = (props: ButtonProps) => {
  if ("asChild" in props && props.asChild) {
    const {
      className,
      appearance,
      size,
      children,
      disabled,
      onClick,
      ...rest
    } = props;

    if (!isValidElement<{ className?: string }>(children)) {
      return null;
    }

    const isNativeButton = children.type === "button";
    const childOnClick = children.props.onClick as
      | MouseEventHandler<HTMLElement>
      | undefined;
    const handleClick: MouseEventHandler<HTMLElement> = (event) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
      if (!event.defaultPrevented) {
        childOnClick?.(event);
      }
    };

    return cloneElement(children, {
      ...rest,
      ...children.props,
      ...(disabled
        ? isNativeButton
          ? { disabled: true }
          : { "aria-disabled": true, tabIndex: -1 }
        : null),
      "data-slot": "button",
      onClick: handleClick,
      className: cn(
        buttonVariants({ appearance, size }),
        children.props.className,
        className,
      ),
    });
  }

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
