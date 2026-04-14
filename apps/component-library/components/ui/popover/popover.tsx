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

import { popoverAnimationPresets } from "./animations";
import type {
  PopoverArrowProps,
  PopoverContentProps,
  PopoverPlacement,
  PopoverProps,
  PopoverTriggerProps,
} from "./types";
import { popoverArrowVariants, popoverContentVariants } from "./variants";

type PopoverCtx = {
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const PopoverContext = createContext<PopoverCtx | null>(null);

function usePopoverContext(component: string): PopoverCtx {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Popover>`);
  }
  return ctx;
}

export function Popover({ open, defaultOpen = false, onOpenChange, children }: PopoverProps) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const resolvedOpen = isControlled ? Boolean(open) : uncontrolledOpen;
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const ctx = useMemo(
    () => ({
      open: resolvedOpen,
      setOpen,
      triggerRef,
    }),
    [resolvedOpen, setOpen],
  );

  return <PopoverContext.Provider value={ctx}>{children}</PopoverContext.Provider>;
}

Popover.displayName = "Popover";

export function PopoverTrigger({ className, children, onClick, ref, ...rest }: PopoverTriggerProps) {
  const { open, setOpen, triggerRef } = usePopoverContext("PopoverTrigger");

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
      data-slot="popover-trigger"
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

PopoverTrigger.displayName = "PopoverTrigger";

function computePosition(
  trigger: DOMRect,
  contentWidth: number,
  contentHeight: number,
  placement: PopoverPlacement = "bottom",
) {
  const gap = 8;
  const centerX = trigger.left + trigger.width / 2 - contentWidth / 2;
  const centerY = trigger.top + trigger.height / 2 - contentHeight / 2;

  switch (placement) {
    case "top":
    case "top-start":
    case "top-end":
      return {
        top: trigger.top - contentHeight - gap + window.scrollY,
        left:
          placement === "top-start"
            ? trigger.left + window.scrollX
            : placement === "top-end"
              ? trigger.right - contentWidth + window.scrollX
              : centerX + window.scrollX,
      };
    case "bottom":
    case "bottom-start":
    case "bottom-end":
      return {
        top: trigger.bottom + gap + window.scrollY,
        left:
          placement === "bottom-start"
            ? trigger.left + window.scrollX
            : placement === "bottom-end"
              ? trigger.right - contentWidth + window.scrollX
              : centerX + window.scrollX,
      };
    case "left":
      return {
        top: centerY + window.scrollY,
        left: trigger.left - contentWidth - gap + window.scrollX,
      };
    case "right":
    default:
      return {
        top: centerY + window.scrollY,
        left: trigger.right + gap + window.scrollX,
      };
  }
}

export function PopoverContent({
  className,
  size,
  appearance,
  placement = "bottom",
  animation = "scale",
  children,
  ref,
  style,
}: PopoverContentProps) {
  const { open, setOpen, triggerRef } = usePopoverContext("PopoverContent");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const motionProps = popoverAnimationPresets[animation];

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current?.getBoundingClientRect();
    const content = contentRef.current?.getBoundingClientRect();
    if (!trigger || !content || content.width < 1 || content.height < 1) {
      return;
    }
    setCoords(computePosition(trigger, content.width, content.height, placement));
  }, [placement, triggerRef]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    let rafId = 0;
    let rafId2 = 0;
    rafId = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        updatePosition();
      });
    });
    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafId2);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) {
      return;
    }
    let cancelled = false;
    let observer: ResizeObserver | null = null;
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => {
        if (cancelled) {
          return;
        }
        const node = contentRef.current;
        if (!node) {
          return;
        }
        observer = new ResizeObserver(() => {
          updatePosition();
        });
        observer.observe(node);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(innerRaf);
      observer?.disconnect();
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) {
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
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen, triggerRef]);

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
          role="dialog"
          data-slot="popover-content"
          className={cn("fixed", popoverContentVariants({ size, appearance }), className)}
          style={{ top: coords.top, left: coords.left, ...style }}
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

PopoverContent.displayName = "PopoverContent";

export function PopoverArrow({ className }: PopoverArrowProps) {
  return <span data-slot="popover-arrow" className={cn(popoverArrowVariants(), className)} />;
}

PopoverArrow.displayName = "PopoverArrow";
