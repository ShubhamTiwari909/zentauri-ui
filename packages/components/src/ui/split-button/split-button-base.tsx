"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiLoader } from "react-icons/fi";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../dropdown";
import { buttonVariants } from "../buttons";
import { cn } from "../../lib/utils";

import type {
  SplitButtonAppearance,
  SplitButtonProps,
  SplitButtonVariant,
} from "./types";
import {
  splitButtonContentVariants,
  splitButtonDropdownVariants,
  splitButtonGroupVariants,
  splitButtonItemDisabledVariants,
  splitButtonPrimaryVariants,
  splitButtonRootVariants,
  splitButtonTriggerVariants,
} from "./variants";

const variantAppearanceMap = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  danger: "destructive",
  success: "green",
} as const satisfies Record<SplitButtonVariant, SplitButtonAppearance>;

function resolveAppearance({
  appearance,
  variant,
}: {
  appearance?: SplitButtonAppearance;
  variant?: SplitButtonVariant;
}) {
  return appearance ?? (variant ? variantAppearanceMap[variant] : "default");
}

export function SplitButtonBase({
  label,
  onClick,
  items,
  disabled = false,
  loading = false,
  appearance,
  variant,
  size = "md",
  startIcon,
  fullWidth = false,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  triggerLabel,
  triggerOn = "click",
  className,
  ref,
  ...rest
}: SplitButtonProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isUnavailable = disabled || loading;
  const resolvedAppearance = resolveAppearance({ appearance, variant });
  const isControlled = controlledOpen !== undefined;
  const open = isUnavailable
    ? false
    : isControlled
      ? controlledOpen
      : uncontrolledOpen;

  const setOpen = (nextOpen: boolean) => {
    if (isUnavailable && nextOpen) {
      return;
    }
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const fullWidthFlag = fullWidth ? "true" : undefined;
  const menuLabel = triggerLabel ?? `More ${label} actions`;

  // Shared timeout ref for hover mode: delays close so the cursor can
  // travel through the mt-2 gap between the button and the menu panel
  // without dismissing the menu.
  const hoverCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    hoverCloseRef.current = setTimeout(() => setOpen(false), 120);
  };

  const cancelClose = () => {
    if (hoverCloseRef.current !== null) {
      clearTimeout(hoverCloseRef.current);
      hoverCloseRef.current = null;
    }
  };

  useEffect(() => cancelClose, []);

  const dropdownHoverHandlers =
    triggerOn === "hover"
      ? {
          onMouseEnter: () => {
            cancelClose();
            setOpen(true);
          },
          onMouseLeave: scheduleClose,
        }
      : undefined;

  const contentHoverHandlers =
    triggerOn === "hover"
      ? { onMouseEnter: cancelClose, onMouseLeave: scheduleClose }
      : undefined;

  return (
    <div
      ref={ref}
      data-slot="split-button"
      data-full-width={fullWidthFlag}
      className={cn(splitButtonRootVariants({ fullWidth }), className)}
      {...rest}
    >
      <Dropdown
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={setOpen}
        data-full-width={fullWidthFlag}
        className={splitButtonDropdownVariants({ fullWidth })}
        {...dropdownHoverHandlers}
      >
        <div
          data-slot="split-button-group"
          data-full-width={fullWidthFlag}
          className={splitButtonGroupVariants({ fullWidth })}
        >
          <button
            type="button"
            data-slot="split-button-primary"
            data-full-width={fullWidthFlag}
            disabled={isUnavailable}
            onClick={onClick}
            className={cn(
              buttonVariants({ appearance: resolvedAppearance, size }),
              splitButtonPrimaryVariants(),
            )}
          >
            {loading ? (
              <FiLoader
                aria-hidden
                className="animate-spin"
                data-slot="split-button-spinner-icon"
              />
            ) : (
              startIcon
            )}
            <span>{label}</span>
            {loading ? (
              <span className="sr-only" role="status" aria-label="Loading" />
            ) : null}
          </button>

          <DropdownTrigger
            aria-label={menuLabel}
            disabled={isUnavailable}
            className={cn(
              buttonVariants({ appearance: resolvedAppearance, size }),
              splitButtonTriggerVariants({ size }),
            )}
          >
            <FiChevronDown aria-hidden />
          </DropdownTrigger>
        </div>

        <DropdownContent
          className={splitButtonContentVariants()}
          placement="bottom"
          {...contentHoverHandlers}
        >
          {items.map((item) => (
            <DropdownItem
              key={item.id}
              value={item.id}
              leftIcon={item.icon}
              aria-disabled={item.disabled ? "true" : undefined}
              className={
                item.disabled ? splitButtonItemDisabledVariants() : undefined
              }
              onClick={(event) => {
                if (item.disabled) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onKeyDown={(event) => {
                if (item.disabled) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onSelect={item.onSelect}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

SplitButtonBase.displayName = "SplitButton";
