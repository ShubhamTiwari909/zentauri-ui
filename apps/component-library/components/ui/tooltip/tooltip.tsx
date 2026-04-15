"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  TooltipProps,
  TooltipContextType,
  TooltipTriggerProps,
  TooltipContentProps,
} from "./types";

import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { tooltipVariants } from "./variants";
import { motion } from "framer-motion";
import { tooltipAnimationPresets } from "./animation";

export const TooltipContext = createContext<TooltipContextType | null>(null);

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within Tooltip");
  }
  return context;
};
export const Tooltip = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  position = "top",
  delay = 100,
}: TooltipProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelDelayedOpen = useCallback(() => {
    if (showTimeoutRef.current !== null) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  }, []);

  const scheduleDelayedOpen = useCallback(() => {
    cancelDelayedOpen();
    showTimeoutRef.current = setTimeout(() => {
      showTimeoutRef.current = null;
      setOpen(true);
    }, delay);
  }, [cancelDelayedOpen, delay, setOpen]);

  useEffect(() => () => cancelDelayedOpen(), [cancelDelayedOpen]);

  return (
    <TooltipContext.Provider
      value={{
        open,
        setOpen,
        position,
        delay,
        scheduleDelayedOpen,
        cancelDelayedOpen,
      }}
    >
      <div className="relative inline-block">{children}</div>
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = ({
  children,
  className,
}: TooltipTriggerProps) => {
  const { setOpen, scheduleDelayedOpen, cancelDelayedOpen } = useTooltip();

  const triggerProps = {
    onMouseEnter: () => scheduleDelayedOpen(),
    onMouseLeave: () => {
      cancelDelayedOpen();
      setOpen(false);
    },
    onFocus: () => {
      cancelDelayedOpen();
      setOpen(true);
    },
    onBlur: () => {
      cancelDelayedOpen();
      setOpen(false);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelDelayedOpen();
        setOpen(false);
      }
    },
    className,
    tabIndex: 0,
  };

  return <span {...triggerProps}>{children}</span>;
};

export const TooltipContent = ({
  children,
  className,
  variant,
  size,
  width,
  animation = "none",
}: TooltipContentProps) => {
  const { open, position } = useTooltip();

  if (!open) return null;

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const motionProps = tooltipAnimationPresets[animation];

  return (
    <motion.div
      data-open={open}
      role="tooltip"
      {...motionProps}
      className={cn(
        tooltipVariants({ variant, size, width }),
        positionStyles[position],
        className,
      )}
    >
      {children}
    </motion.div>
  );
};
