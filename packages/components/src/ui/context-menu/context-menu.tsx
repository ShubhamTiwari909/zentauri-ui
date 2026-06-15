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
  useLayoutEffect,
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
  GetSafePositionProps,
  ReactChildSoleCandidate,
} from "./types";
import {
  contextMenuContentVariants,
  contextMenuItemVariants,
} from "./variants";

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);
const ContextMenuSubContext = createContext<ContextMenuSubContextType | null>(
  null,
);

const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("ContextMenu components must be used within ContextMenu");
  }
  return context;
};

const useContextMenuSub = () => {
  const context = useContext(ContextMenuSubContext);
  if (!context) {
    throw new Error(
      "ContextMenuSub components must be used within ContextMenuSub",
    );
  }
  return context;
};

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

const getSafePosition = ({
  position,
  width,
  height,
  collisionPadding,
}: GetSafePositionProps) => {
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
      Math.min(fallback.y, window.innerHeight - height - collisionPadding),
    ),
  };
};

export const ContextMenu = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnEscape = true,
  closeOnOutsideClick = true,
}: ContextMenuProps) => {
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
      if (contentRef.current?.contains(target)) {
        return;
      }
      if (triggerRef.current?.contains(target) && event.button !== 0) {
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

    const onScroll = () => {
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("scroll", onScroll, { capture: true });

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("scroll", onScroll, { capture: true });
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
};

export const ContextMenuTrigger = ({
  children,
  className,
  disabled = false,
}: ContextMenuTriggerProps) => {
  const { open, openAt, contentId, triggerRef } = useContextMenu();

  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }
    event.preventDefault();
    const isKeyboardTrigger = event.clientX === 0 && event.clientY === 0;
    if (isKeyboardTrigger) {
      const rect = event.currentTarget.getBoundingClientRect();
      openAt({ x: rect.left, y: rect.bottom });
    } else {
      openAt({ x: event.clientX, y: event.clientY });
    }
  };
  const handleKeyboardTrigger = (event: KeyboardEvent<HTMLElement>) => {
    if (disabled || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    openAt({ x: rect.left, y: rect.bottom });
  };
  const childList = Children.toArray(children).filter(
    (node) => node !== null && node !== undefined && typeof node !== "boolean",
  );
  const soleCandidate =
    childList.length === 1 && isValidElement(childList[0])
      ? (childList[0] as ReactChildSoleCandidate)
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
      onKeyDown: (event) => {
        soleCandidate.props.onKeyDown?.(event);
        if (!event.defaultPrevented) {
          handleKeyboardTrigger(event);
        }
      },
      className: cn(className, soleCandidate.props.className),
      tabIndex: soleCandidate.props.tabIndex ?? 0,
      role: soleCandidate.props.role ?? "button",
      "aria-controls": open ? contentId : undefined,
      "aria-expanded": open,
      "aria-haspopup": "menu",
    });
  }

  return (
    <span
      ref={triggerRef as Ref<HTMLSpanElement>}
      className={className}
      role="button"
      tabIndex={0}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyboardTrigger}
      aria-controls={open ? contentId : undefined}
      aria-expanded={open}
      aria-haspopup="menu"
    >
      {children}
    </span>
  );
};

export const ContextMenuContent = ({
  children,
  className,
  collisionPadding = 8,
  spacing,
  style,
  width = 220,
  ...props
}: ContextMenuContentProps) => {
  const { open, contentId, contentRef, position } = useContextMenu();
  const [menuSize, setMenuSize] = useState({ width, height: 0 });

  useLayoutEffect(() => {
    if (!open || !contentRef.current) {
      return;
    }

    const rect = contentRef.current.getBoundingClientRect();
    const nextSize = {
      width: Math.max(width, rect.width),
      height: rect.height,
    };

    setMenuSize((currentSize) =>
      currentSize.width === nextSize.width &&
      currentSize.height === nextSize.height
        ? currentSize
        : nextSize,
    );
  });

  useEffect(() => {
    if (!open) {
      setMenuSize({ width, height: 0 });
    }
  }, [open, width]);

  if (!open) {
    return null;
  }

  const safePosition = getSafePosition({
    position,
    width: menuSize.width,
    height: menuSize.height,
    collisionPadding,
  });

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
};

export const ContextMenuItem = ({
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
}: ContextMenuItemProps) => {
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
};

export const ContextMenuLabel = ({
  children,
  className,
  inset = false,
  ...props
}: ContextMenuLabelProps) => {
  return (
    <p
      className={cn(zuiContextMenuLabelBase, inset && "pl-8", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const ContextMenuSeparator = ({
  className,
  ...props
}: ContextMenuSeparatorProps) => {
  return (
    <div
      role="separator"
      className={cn(zuiContextMenuSeparatorBase, className)}
      {...props}
    />
  );
};

export const ContextMenuSub = ({
  children,
  defaultOpen = false,
}: ContextMenuSubProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <ContextMenuSubContext.Provider value={value}>
      <div className="relative" onPointerLeave={() => setOpen(false)}>
        {children}
      </div>
    </ContextMenuSubContext.Provider>
  );
};

export const ContextMenuSubTrigger = ({
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
}: ContextMenuSubTriggerProps) => {
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
};

export const ContextMenuSubContent = ({
  children,
  className,
  spacing,
  ...props
}: ContextMenuSubContentProps) => {
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
};
