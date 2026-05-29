"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type ReactElement,
  type Ref,
  useMemo,
} from "react";

import { cn } from "../../lib/utils";

import type {
  PopoverAlign,
  PopoverContentProps,
  PopoverContextType,
  PopoverProps,
  PopoverSide,
  PopoverTriggerProps,
} from "./types";
import { popoverContentVariants } from "./variants";

export const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within Popover");
  }
  return context;
};

export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as RefObject<T | null>).current = node;
      }
    }
  };
}

export function sideAlignClass(side: PopoverSide, align: PopoverAlign) {
  const sideClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  } satisfies Record<PopoverSide, string>;

  const verticalAlign = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  } satisfies Record<PopoverAlign, string>;

  const horizontalAlign = {
    start: "top-0",
    center: "top-1/2 -translate-y-1/2",
    end: "bottom-0",
  } satisfies Record<PopoverAlign, string>;

  return cn(
    sideClasses[side],
    side === "top" || side === "bottom"
      ? verticalAlign[align]
      : horizontalAlign[align],
  );
}

export const Popover = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnEscape = true,
  closeOnOutsideClick = true,
}: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const contentId = `${useId()}-popover`;
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!closeOnOutsideClick) {
        return;
      }
      const target = event.target as Node;
      if (
        contentRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeOnEscape, closeOnOutsideClick, open, setOpen]);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      toggleOpen,
      contentId,
      triggerRef,
      contentRef,
    }),
    [open, setOpen, toggleOpen, contentId],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger = ({
  children,
  className,
}: PopoverTriggerProps) => {
  const { open, toggleOpen, contentId, triggerRef } = usePopover();
  const childList = Children.toArray(children).filter(
    (node) => node !== null && node !== undefined && typeof node !== "boolean",
  );

  const soleCandidate =
    childList.length === 1 && isValidElement(childList[0])
      ? (childList[0] as ReactElement<{
          className?: string;
          ref?: Ref<HTMLElement>;
          onClick?: MouseEventHandler;
          onKeyDown?: KeyboardEventHandler;
          "aria-expanded"?: boolean;
          "aria-haspopup"?: string;
          "aria-controls"?: string;
        }>)
      : undefined;

  if (soleCandidate) {
    return cloneElement(soleCandidate, {
      ref: mergeRefs(triggerRef, soleCandidate.props.ref),
      onClick: (event) => {
        soleCandidate.props.onClick?.(event);
        if (!event.defaultPrevented) {
          toggleOpen();
        }
      },
      onKeyDown: (event) => {
        soleCandidate.props.onKeyDown?.(event);
        if (event.key === "Escape") {
          event.preventDefault();
        }
      },
      className: cn(className, soleCandidate.props.className),
      "aria-expanded": open,
      "aria-haspopup": "dialog",
      "aria-controls": open ? contentId : undefined,
    });
  }

  return (
    <button
      ref={triggerRef as Ref<HTMLButtonElement>}
      type="button"
      className={className}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-controls={open ? contentId : undefined}
      onClick={toggleOpen}
    >
      {children}
    </button>
  );
};

export const PopoverContent = ({
  children,
  className,
  variant,
  size,
  width,
  side = "bottom",
  align = "center",
  role = "dialog",
  ref,
  ...props
}: PopoverContentProps) => {
  const { open, contentId, contentRef } = usePopover();

  if (!open) {
    return null;
  }

  return (
    <div
      ref={mergeRefs(contentRef, ref)}
      id={contentId}
      data-open={open}
      role={role}
      tabIndex={-1}
      className={cn(
        popoverContentVariants({ variant, size, width }),
        sideAlignClass(side, align),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
