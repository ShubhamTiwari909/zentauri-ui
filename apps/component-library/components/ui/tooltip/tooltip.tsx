"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import { tooltipAnimationPresets } from "./animations";
import type {
  TooltipArrowProps,
  TooltipContentProps,
  TooltipProps,
  TooltipTriggerProps,
} from "./types";
import type { TooltipPlacement } from "./types";
import { tooltipArrowVariants, tooltipContentVariants } from "./variants";

type TooltipCtx = {
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerRef: React.RefObject<HTMLSpanElement | null>;
  triggerId: string;
  contentId: string;
  delayMs: number;
};

const TooltipContext = createContext<TooltipCtx | null>(null);

function useTooltipContext(component: string): TooltipCtx {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tooltip>`);
  }
  return ctx;
}

function computeTooltipPosition(
  trigger: DOMRect,
  contentWidth: number,
  contentHeight: number,
  placement: TooltipPlacement,
) {
  const gap = 8;
  const centerX = trigger.left + trigger.width / 2 - contentWidth / 2;
  const centerY = trigger.top + trigger.height / 2 - contentHeight / 2;

  switch (placement) {
    case "top":
      return {
        top: trigger.top - contentHeight - gap + window.scrollY,
        left: centerX + window.scrollX,
      };
    case "left":
      return {
        top: centerY + window.scrollY,
        left: trigger.left - contentWidth - gap + window.scrollX,
      };
    case "right":
      return {
        top: centerY + window.scrollY,
        left: trigger.right + gap + window.scrollX,
      };
    case "bottom":
    default:
      return {
        top: trigger.bottom + gap + window.scrollY,
        left: centerX + window.scrollX,
      };
  }
}

export function Tooltip({ open, defaultOpen = false, onOpenChange, delayMs = 200, children }: TooltipProps) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const resolvedOpen = isControlled ? Boolean(open) : uncontrolledOpen;
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

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
      triggerId,
      contentId,
      delayMs,
    }),
    [contentId, delayMs, resolvedOpen, setOpen, triggerId],
  );

  return <TooltipContext.Provider value={ctx}>{children}</TooltipContext.Provider>;
}

Tooltip.displayName = "Tooltip";

export function TooltipTrigger({ className, children, ref, ...rest }: TooltipTriggerProps) {
  const { open, setOpen, triggerRef, triggerId, contentId, delayMs } = useTooltipContext("TooltipTrigger");
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  const clearTimers = () => {
    if (showTimer.current) {
      window.clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const scheduleShow = () => {
    clearTimers();
    showTimer.current = window.setTimeout(() => setOpen(true), delayMs);
  };

  const scheduleHide = () => {
    clearTimers();
    hideTimer.current = window.setTimeout(() => setOpen(false), delayMs);
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <span
      ref={(node) => {
        triggerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        }
      }}
      id={triggerId}
      data-slot="tooltip-trigger"
      className={cn("inline-flex", className)}
      aria-describedby={open ? contentId : undefined}
      onMouseEnter={() => {
        scheduleShow();
      }}
      onMouseLeave={() => {
        scheduleHide();
      }}
      onFocus={() => {
        scheduleShow();
      }}
      onBlur={() => {
        scheduleHide();
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

TooltipTrigger.displayName = "TooltipTrigger";

export function TooltipContent({
  className,
  size,
  appearance,
  placement = "top",
  animation = "fade",
  children,
  ref,
  style,
}: TooltipContentProps) {
  const { open, setOpen, triggerRef, contentId } = useTooltipContext("TooltipContent");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const motionProps = tooltipAnimationPresets[animation];

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current?.getBoundingClientRect();
    const content = contentRef.current?.getBoundingClientRect();
    if (!trigger || !content || content.width < 1 || content.height < 1) {
      return;
    }
    setCoords(computeTooltipPosition(trigger, content.width, content.height, placement));
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

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
          id={contentId}
          role="tooltip"
          data-slot="tooltip-content"
          className={cn("fixed", tooltipContentVariants({ size, appearance }), className)}
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

TooltipContent.displayName = "TooltipContent";

export function TooltipArrow({ className }: TooltipArrowProps) {
  return <span data-slot="tooltip-arrow" className={cn(tooltipArrowVariants(), className)} />;
}

TooltipArrow.displayName = "TooltipArrow";
