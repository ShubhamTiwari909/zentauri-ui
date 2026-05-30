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
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type Ref,
  type RefObject,
} from "react";
import { FiChevronRight } from "react-icons/fi";

import {
  zuiContextMenuLabelBase,
  zuiContextMenuSeparatorBase,
} from "../../design-system/context-menu";
import { cn } from "../../lib/utils";
import type {
  ContextMenuContentProps,
  ContextMenuContextType,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuPosition,
  ContextMenuProps,
  ContextMenuSeparatorProps,
  ContextMenuSubContentProps,
  ContextMenuSubContextType,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuTriggerProps,
} from "./types";
import {
  contextMenuContentVariants,
  contextMenuItemVariants,
} from "./variants";

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);
const ContextMenuSubContext = createContext<ContextMenuSubContextType | null>(
  null,
);

function useContextMenu() {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("ContextMenu components must be used within ContextMenu");
  }
  return context;
}

function useContextMenuSub() {
  const context = useContext(ContextMenuSubContext);
  if (!context) {
    throw new Error(
      "ContextMenuSub components must be used within ContextMenuSub",
    );
  }
  return context;
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as RefObject<T | null>).current = node;
      }
    }
  };
}

function getSafePosition(
  position: ContextMenuPosition | null,
  width: number,
  collisionPadding: number,
) {
  const fallback = position ?? { x: collisionPadding, y: collisionPadding };

  if (typeof window === "undefined") {
    return fallback;
  }

  return {
    x: Math.max(
      collisionPadding,
      Math.min(fallback.x, window.innerWidth - width - collisionPadding),
    ),
    y: Math.max(
      collisionPadding,
      Math.min(fallback.y, window.innerHeight - collisionPadding),
    ),
  };
}

export function ContextMenu({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnEscape = true,
  closeOnOutsideClick = true,
}: ContextMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [position, setPosition] = useState<ContextMenuPosition | null>(null);
  const contentId = `${useId()}-context-menu`;
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const openAt = useCallback(
    (nextPosition: ContextMenuPosition) => {
      setPosition(nextPosition);
      setOpen(true);
    },
    [setOpen],
  );

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

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
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
      openAt,
      contentId,
      triggerRef,
      contentRef,
      position,
    }),
    [contentId, open, openAt, setOpen, position],
  );

  return (
    <ContextMenuContext.Provider value={contextValue}>
      <div className="contents">{children}</div>
    </ContextMenuContext.Provider>
  );
}

export function ContextMenuTrigger({
  children,
  className,
  disabled = false,
}: ContextMenuTriggerProps) {
  const { open, openAt, contentId, triggerRef } = useContextMenu();

  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }
    event.preventDefault();
    openAt({ x: event.clientX, y: event.clientY });
  };

  const childList = Children.toArray(children).filter(
    (node) => node !== null && node !== undefined && typeof node !== "boolean",
  );
  const soleCandidate =
    childList.length === 1 && isValidElement(childList[0])
      ? (childList[0] as ReactElement<{
          className?: string;
          ref?: Ref<HTMLElement>;
          onContextMenu?: (event: MouseEvent<HTMLElement>) => void;
          tabIndex?: number;
          "aria-controls"?: string;
          "aria-expanded"?: boolean;
          "aria-haspopup"?: string;
        }>)
      : undefined;

  if (soleCandidate) {
    return cloneElement(soleCandidate, {
      ref: mergeRefs(triggerRef, soleCandidate.props.ref),
      onContextMenu: (event) => {
        soleCandidate.props.onContextMenu?.(event);
        if (!event.defaultPrevented) {
          handleContextMenu(event);
        }
      },
      className: cn(className, soleCandidate.props.className),
      tabIndex: soleCandidate.props.tabIndex ?? 0,
      "aria-controls": open ? contentId : undefined,
      "aria-expanded": open,
      "aria-haspopup": "menu",
    });
  }

  return (
    <span
      ref={triggerRef as Ref<HTMLSpanElement>}
      className={className}
      tabIndex={0}
      onContextMenu={handleContextMenu}
      aria-controls={open ? contentId : undefined}
      aria-expanded={open}
      aria-haspopup="menu"
    >
      {children}
    </span>
  );
}

export function ContextMenuContent({
  children,
  className,
  collisionPadding = 8,
  spacing,
  style,
  width = 220,
  ...props
}: ContextMenuContentProps) {
  const { open, contentId, contentRef, position } = useContextMenu();

  if (!open) {
    return null;
  }

  const safePosition = getSafePosition(position, width, collisionPadding);

  return (
    <div
      ref={contentRef}
      id={contentId}
      role="menu"
      tabIndex={-1}
      className={cn(
        contextMenuContentVariants({ spacing }),
        "fixed z-50",
        className,
      )}
      style={{
        left: safePosition.x,
        top: safePosition.y,
        minWidth: width,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function ContextMenuItem({
  children,
  className,
  closeOnSelect = true,
  disabled = false,
  inset = false,
  leftIcon,
  onClick,
  onKeyDown,
  onSelect,
  rightIcon,
  variant,
  ...props
}: ContextMenuItemProps) {
  const { setOpen } = useContextMenu();

  const handleSelect = () => {
    if (disabled) {
      return;
    }
    onSelect?.();
    if (closeOnSelect) {
      setOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? undefined : 0}
      aria-disabled={disabled || undefined}
      className={cn(
        contextMenuItemVariants({ variant }),
        inset && "pl-8",
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleSelect();
        }
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">
        {leftIcon}
        <span className="truncate">{children}</span>
      </div>
      {rightIcon ? (
        <div className="ml-4 flex items-center">{rightIcon}</div>
      ) : null}
    </div>
  );
}

export function ContextMenuLabel({
  children,
  className,
  inset = false,
  ...props
}: ContextMenuLabelProps) {
  return (
    <p
      className={cn(zuiContextMenuLabelBase, inset && "pl-8", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn(zuiContextMenuSeparatorBase, className)}
      {...props}
    />
  );
}

export function ContextMenuSub({
  children,
  defaultOpen = false,
}: ContextMenuSubProps) {
  const [open, setOpen] = useState(defaultOpen);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <ContextMenuSubContext.Provider value={value}>
      <div className="relative" onPointerLeave={() => setOpen(false)}>
        {children}
      </div>
    </ContextMenuSubContext.Provider>
  );
}

export function ContextMenuSubTrigger({
  children,
  className,
  disabled = false,
  inset = false,
  onFocus,
  onKeyDown,
  onPointerEnter,
  rightIcon = <FiChevronRight aria-hidden="true" />,
  variant,
  ...props
}: ContextMenuSubTriggerProps) {
  const { open, setOpen } = useContextMenuSub();

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? undefined : 0}
      aria-disabled={disabled || undefined}
      aria-expanded={open}
      aria-haspopup="menu"
      className={cn(
        contextMenuItemVariants({ variant }),
        inset && "pl-8",
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
      onFocus={(event) => {
        onFocus?.(event);
        if (!disabled) {
          setOpen(true);
        }
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (!disabled) {
          setOpen(true);
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || disabled) {
          return;
        }
        if (event.key === "ArrowRight" || event.key === "Enter") {
          event.preventDefault();
          setOpen(true);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setOpen(false);
        }
      }}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate">{children}</span>
      </div>
      <div className="ml-4 flex items-center">{rightIcon}</div>
    </div>
  );
}

export function ContextMenuSubContent({
  children,
  className,
  spacing,
  ...props
}: ContextMenuSubContentProps) {
  const { open } = useContextMenuSub();

  if (!open) {
    return null;
  }

  return (
    <div
      role="menu"
      tabIndex={-1}
      className={cn(
        contextMenuContentVariants({ spacing }),
        "absolute left-full top-0 z-50 ml-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
