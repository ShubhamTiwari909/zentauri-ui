"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import { dropdownAnimationPresets } from "./animations";
import type {
  DropdownCheckboxItemProps,
  DropdownContentProps,
  DropdownGroupProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownProps,
  DropdownRadioGroupProps,
  DropdownRadioItemProps,
  DropdownSeparatorProps,
  DropdownSubContentProps,
  DropdownSubMenuProps,
  DropdownSubTriggerProps,
  DropdownTriggerProps,
} from "./types";
import {
  dropdownContentVariants,
  dropdownItemVariants,
  dropdownLabelVariants,
  dropdownSeparatorVariants,
} from "./variants";

type DropdownCtx = {
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  registerItem: (node: HTMLButtonElement | null) => void;
  itemsRef: React.MutableRefObject<HTMLButtonElement[]>;
};

const DropdownContext = createContext<DropdownCtx | null>(null);

function useDropdownContext(component: string): DropdownCtx {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Dropdown>`);
  }
  return ctx;
}

const RadioGroupContext = createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
} | null>(null);

const SubMenuContext = createContext<{
  open: boolean;
  setOpen: (next: boolean) => void;
} | null>(null);

export function Dropdown({ open, defaultOpen = false, onOpenChange, children }: DropdownProps) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const resolvedOpen = isControlled ? Boolean(open) : uncontrolledOpen;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const itemsRef = useRef<HTMLButtonElement[]>([]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const registerItem = useCallback((node: HTMLButtonElement | null) => {
    if (!node) {
      return;
    }
    if (!itemsRef.current.includes(node)) {
      itemsRef.current.push(node);
    }
  }, []);

  const ctx = useMemo(
    () => ({
      open: resolvedOpen,
      setOpen,
      triggerRef,
      registerItem,
      itemsRef,
    }),
    [registerItem, resolvedOpen, setOpen],
  );

  return <DropdownContext.Provider value={ctx}>{children}</DropdownContext.Provider>;
}

Dropdown.displayName = "Dropdown";

export function DropdownTrigger({ className, children, onClick, ref, ...rest }: DropdownTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdownContext("DropdownTrigger");

  return (
    <button
      ref={(node) => {
        triggerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      }}
      type="button"
      data-slot="dropdown-trigger"
      aria-haspopup="menu"
      aria-expanded={open}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(!open);
        }
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

DropdownTrigger.displayName = "DropdownTrigger";

export function DropdownContent({
  className,
  size,
  appearance,
  animation = "scale",
  children,
  ref,
}: DropdownContentProps) {
  const { open, setOpen, triggerRef, itemsRef } = useDropdownContext("DropdownContent");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const motionProps = dropdownAnimationPresets[animation];

  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    itemsRef.current = [];
    const trigger = triggerRef.current?.getBoundingClientRect();
    const content = contentRef.current?.getBoundingClientRect();
    if (!trigger || !content) {
      return;
    }
    setCoords({
      top: trigger.bottom + 8 + window.scrollY,
      left: trigger.left + window.scrollX,
    });
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) {
      itemsRef.current = [];
      return;
    }
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (contentRef.current?.contains(target) || triggerRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      const items = itemsRef.current.filter(Boolean);
      if (items.length === 0) {
        return;
      }
      const active = document.activeElement as HTMLElement | null;
      const index = items.indexOf(active as HTMLButtonElement);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = items[Math.min(items.length - 1, Math.max(0, index + 1))] ?? items[0];
        next?.focus();
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const next =
          items[Math.max(0, index === -1 ? items.length - 1 : index - 1)] ?? items[items.length - 1];
        next?.focus();
      }
      if (event.key === "Home") {
        event.preventDefault();
        items[0]?.focus();
      }
      if (event.key === "End") {
        event.preventDefault();
        items[items.length - 1]?.focus();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [itemsRef, open, setOpen, triggerRef]);

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={(node) => {
            contentRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
          }}
          role="menu"
          data-slot="dropdown-content"
          className={cn("fixed", dropdownContentVariants({ size, appearance }), className)}
          style={{ top: coords.top, left: coords.left }}
          initial={animation === "none" ? false : motionProps.initial}
          animate={animation === "none" ? undefined : motionProps.animate}
          exit={animation === "none" ? undefined : motionProps.exit}
          transition={motionProps.transition}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalTarget,
  );
}

DropdownContent.displayName = "DropdownContent";

export function DropdownItem({ className, children, onClick, ref, ...rest }: DropdownItemProps) {
  const { setOpen, registerItem } = useDropdownContext("DropdownItem");

  return (
    <button
      ref={(node) => {
        registerItem(node);
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      }}
      type="button"
      role="menuitem"
      data-slot="dropdown-item"
      className={cn(dropdownItemVariants(), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

DropdownItem.displayName = "DropdownItem";

export function DropdownSeparator({ className, ...rest }: DropdownSeparatorProps) {
  return <div role="separator" data-slot="dropdown-separator" className={cn(dropdownSeparatorVariants(), className)} {...rest} />;
}

DropdownSeparator.displayName = "DropdownSeparator";

export function DropdownLabel({ className, ...rest }: DropdownLabelProps) {
  return <div data-slot="dropdown-label" className={cn(dropdownLabelVariants(), className)} {...rest} />;
}

DropdownLabel.displayName = "DropdownLabel";

export function DropdownGroup({ className, ...rest }: DropdownGroupProps) {
  return <div role="group" data-slot="dropdown-group" className={cn(className)} {...rest} />;
}

DropdownGroup.displayName = "DropdownGroup";

export function DropdownCheckboxItem({
  className,
  checked,
  onCheckedChange,
  onClick,
  ...rest
}: DropdownCheckboxItemProps) {
  const { setOpen, registerItem } = useDropdownContext("DropdownCheckboxItem");
  return (
    <button
      type="button"
      role="menuitemcheckbox"
      aria-checked={Boolean(checked)}
      data-slot="dropdown-checkbox-item"
      ref={(node) => registerItem(node)}
      className={cn(dropdownItemVariants(), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          onCheckedChange?.(!checked);
        }
      }}
      {...rest}
    />
  );
}

DropdownCheckboxItem.displayName = "DropdownCheckboxItem";

export function DropdownRadioGroup({ value, onValueChange, className, children, ...rest }: DropdownRadioGroupProps) {
  const ctx = useMemo(() => ({ value, onValueChange }), [onValueChange, value]);
  return (
    <RadioGroupContext.Provider value={ctx}>
      <div role="group" data-slot="dropdown-radio-group" className={cn(className)} {...rest}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

DropdownRadioGroup.displayName = "DropdownRadioGroup";

export function DropdownRadioItem({ className, value, onClick, ...rest }: DropdownRadioItemProps) {
  const group = useContext(RadioGroupContext);
  const { setOpen, registerItem } = useDropdownContext("DropdownRadioItem");
  const selected = group?.value === value;

  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      data-slot="dropdown-radio-item"
      ref={(node) => registerItem(node)}
      className={cn(dropdownItemVariants(), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          group?.onValueChange?.(value);
          setOpen(false);
        }
      }}
      {...rest}
    />
  );
}

DropdownRadioItem.displayName = "DropdownRadioItem";

export function DropdownSubMenu({ children }: DropdownSubMenuProps) {
  const [open, setOpen] = useState(false);
  const ctx = useMemo(() => ({ open, setOpen }), [open]);
  return <SubMenuContext.Provider value={ctx}>{children}</SubMenuContext.Provider>;
}

DropdownSubMenu.displayName = "DropdownSubMenu";

export function DropdownSubTrigger({ className, children, ...rest }: DropdownSubTriggerProps) {
  const sub = useContext(SubMenuContext);
  if (!sub) {
    throw new Error("DropdownSubTrigger must be used within <DropdownSubMenu>");
  }
  return (
    <button
      type="button"
      data-slot="dropdown-sub-trigger"
      className={cn(dropdownItemVariants(), className)}
      aria-expanded={sub.open}
      onClick={() => sub.setOpen(!sub.open)}
      {...rest}
    >
      {children}
    </button>
  );
}

DropdownSubTrigger.displayName = "DropdownSubTrigger";

export function DropdownSubContent({ className, children, ...rest }: DropdownSubContentProps) {
  const sub = useContext(SubMenuContext);
  if (!sub) {
    throw new Error("DropdownSubContent must be used within <DropdownSubMenu>");
  }
  if (!sub.open) {
    return null;
  }
  return (
    <div data-slot="dropdown-sub-content" className={cn("mt-1 rounded-md border border-white/10 bg-slate-900 p-1", className)} {...rest}>
      {children}
    </div>
  );
}

DropdownSubContent.displayName = "DropdownSubContent";
