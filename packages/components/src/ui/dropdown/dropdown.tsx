"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useId,
  type KeyboardEvent,
} from "react";
import { FiCheck } from "react-icons/fi";
import { cn } from "../../lib/utils";
import type {
  DropdownContextType,
  DropdownProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
} from "./types";
import { triggerVariants, contentVariants, itemVariants } from "./variants";
import { useClickOutside } from "../../hooks/useClickOutside";

/* =========================
   Context
========================= */
const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Use inside Dropdown");
  return ctx;
};

/* =========================
   Root
========================= */
export const Dropdown = ({
  children,
  className,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  multiSelect = false,
  ...props
}: DropdownProps) => {
  const menuId = `${useId()}-menu`;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = (val: boolean) => {
    if (controlledOpen !== undefined) {
      onOpenChange?.(val);
    } else {
      setUncontrolledOpen(val);
    }
  };

  const toggle = () => setOpen(!open);

  const toggleSelect = (value: string) => {
    if (!multiSelect) {
      setSelectedValues([value]);
      setOpen(false);
      return;
    }

    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <DropdownContext.Provider
      value={{
        open,
        setOpen,
        toggle,
        selectedValues,
        toggleSelect,
        multiSelect,
        menuId,
      }}
    >
      <div className={cn("relative inline-block", className)} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

/* =========================
   Trigger
========================= */
export const DropdownTrigger = ({
  children,
  className,
  variant,
  size,
  onClick,
  ...props
}: DropdownTriggerProps) => {
  const { toggle, open, menuId } = useDropdown();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-haspopup="menu"
      aria-controls={menuId}
      className={cn(triggerVariants({ variant, size }), className)}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          toggle();
        }
      }}
    >
      {children}
    </button>
  );
};

/* =========================
   Content
========================= */
export const DropdownContent = ({
  children,
  className,
  placement = "bottom",
  spacing = "default",
  divider,
  ...props
}: DropdownContentProps) => {
  const { open, setOpen, menuId } = useDropdown();
  const ref = useRef<HTMLDivElement>(null);

  // click outside
  useClickOutside({ ref, setOpen });

  useEffect(() => {
    if (!open) {
      return;
    }

    ref.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      id={menuId}
      role="menu"
      className={cn(
        contentVariants({ placement, spacing }),
        className,
        divider && "divide-y divide-current",
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* =========================
   Item
========================= */
export const DropdownItem = ({
  children,
  value,
  className,
  variant,
  onClick,
  onKeyDown,
  onSelect,
  leftIcon,
  rightIcon,
  ...props
}: DropdownItemProps) => {
  const { toggleSelect, selectedValues } = useDropdown();
  const isSelected = selectedValues.includes(value);

  const handleClick = () => {
    toggleSelect(value);
    onSelect?.();
  };

  const focusSiblingItem = (
    event: KeyboardEvent<HTMLDivElement>,
    direction: "next" | "previous" | "first" | "last",
  ) => {
    const menu = event.currentTarget.closest('[role="menu"]');
    const items = Array.from(
      menu?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );
    const currentIndex = items.indexOf(event.currentTarget);

    if (currentIndex === -1 || items.length === 0) {
      return;
    }

    const nextIndex =
      direction === "first"
        ? 0
        : direction === "last"
          ? items.length - 1
          : (currentIndex + (direction === "next" ? 1 : -1) + items.length) %
            items.length;

    items[nextIndex]?.focus();
  };

  return (
    <div
      role="menuitem"
      tabIndex={-1}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleClick();
        }
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) {
          return;
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          focusSiblingItem(e, "next");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          focusSiblingItem(e, "previous");
        } else if (e.key === "Home") {
          e.preventDefault();
          focusSiblingItem(e, "first");
        } else if (e.key === "End") {
          e.preventDefault();
          focusSiblingItem(e, "last");
        }
      }}
      className={cn(itemVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        {leftIcon}
        {children}
      </div>

      <div className="flex items-center gap-2">
        {isSelected && <FiCheck />}
        {rightIcon}
      </div>
    </div>
  );
};
