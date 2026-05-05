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
  type KeyboardEventHandler,
  type MouseEventHandler,
  type FocusEventHandler,
  type ReactElement,
} from "react";

import { cn } from "../../lib/utils";

import type {
  TooltipProps,
  TooltipContextType,
  TooltipTriggerProps,
  TooltipContentProps,
} from "./types";
import { tooltipVariants } from "./variants";

export const TooltipContext = createContext<TooltipContextType | null>(null);

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within Tooltip");
  }
  return context;
};

function mergeDescribedBy(
  tooltipId: string,
  existing: unknown,
  open: boolean,
): string | undefined {
  if (!open) {
    return typeof existing === "string" ? existing : undefined;
  }
  const baseIds =
    typeof existing === "string" && existing.trim().length > 0
      ? existing.split(/\s+/).filter(Boolean)
      : [];
  const merged = [...new Set([...baseIds, tooltipId])];
  return merged.join(" ");
}

export const Tooltip = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  position = "top",
  delay = 100,
}: TooltipProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const tooltipId = `${useId()}-tooltip`;

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
        tooltipId,
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
  const { setOpen, scheduleDelayedOpen, cancelDelayedOpen, open, tooltipId } =
    useTooltip();

  const onMouseEnter: MouseEventHandler = () => scheduleDelayedOpen();
  const onMouseLeave: MouseEventHandler = () => {
    cancelDelayedOpen();
    setOpen(false);
  };
  const onFocus: FocusEventHandler = () => {
    cancelDelayedOpen();
    setOpen(true);
  };
  const onBlur: FocusEventHandler = () => {
    cancelDelayedOpen();
    setOpen(false);
  };
  const onKeyDown: KeyboardEventHandler = (event) => {
    if (event.key === "Escape") {
      cancelDelayedOpen();
      setOpen(false);
    }
  };

  const childList = Children.toArray(children).filter(
    (node) =>
      node !== null && node !== undefined && typeof node !== "boolean",
  );

  const soleCandidate =
    childList.length === 1 && isValidElement(childList[0])
      ? (childList[0] as ReactElement<{
          className?: string;
          "aria-describedby"?: string;
          onMouseEnter?: MouseEventHandler;
          onMouseLeave?: MouseEventHandler;
          onFocus?: FocusEventHandler;
          onBlur?: FocusEventHandler;
          onKeyDown?: KeyboardEventHandler;
        }>)
      : undefined;

  if (soleCandidate) {
    const describedBy = mergeDescribedBy(
      tooltipId,
      soleCandidate.props["aria-describedby"],
      open,
    );
    return cloneElement(soleCandidate, {
      onMouseEnter: (event: React.MouseEvent) => {
        soleCandidate.props.onMouseEnter?.(event);
        if (!event.defaultPrevented) {
          scheduleDelayedOpen();
        }
      },
      onMouseLeave: (event: React.MouseEvent) => {
        soleCandidate.props.onMouseLeave?.(event);
        cancelDelayedOpen();
        setOpen(false);
      },
      onFocus: (event: React.FocusEvent) => {
        soleCandidate.props.onFocus?.(event);
        if (!event.defaultPrevented) {
          cancelDelayedOpen();
          setOpen(true);
        }
      },
      onBlur: (event: React.FocusEvent) => {
        soleCandidate.props.onBlur?.(event);
        cancelDelayedOpen();
        setOpen(false);
      },
      onKeyDown: (event: React.KeyboardEvent) => {
        soleCandidate.props.onKeyDown?.(event);
        if (event.key === "Escape") {
          cancelDelayedOpen();
          setOpen(false);
        }
      },
      className: cn(className, soleCandidate.props.className),
      "aria-describedby": describedBy,
    });
  }

  return (
    <span
      className={className}
      tabIndex={0}
      aria-describedby={mergeDescribedBy(tooltipId, undefined, open)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      {children}
    </span>
  );
};

export const TooltipContent = ({
  children,
  className,
  variant,
  size,
  width,
}: TooltipContentProps) => {
  const { open, position, tooltipId } = useTooltip();

  if (!open) return null;

  const positionStyles = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      id={tooltipId}
      data-open={open}
      role="tooltip"
      className={cn(
        tooltipVariants({ variant, size, width }),
        positionStyles[position],
        className,
      )}
    >
      {children}
    </div>
  );
};
