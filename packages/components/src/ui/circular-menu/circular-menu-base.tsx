"use client";

import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ComponentPropsWithRef,
  FocusEvent as ReactFocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
  Ref,
  RefObject,
} from "react";

import { useClickOutside } from "../../hooks/useClickOutside";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";

import {
  CIRCULAR_MENU_SIZE_METRICS,
  getCircularMenuBoxSize,
  getCircularMenuPositions,
} from "./geometry";
import type { CircularMenuPosition } from "./geometry";
import type {
  CircularMenuContextValue,
  CircularMenuCssProperties,
  CircularMenuItemData,
  CircularMenuItemIconProps,
  CircularMenuItemLabelProps,
  CircularMenuItemProps,
  CircularMenuLayoutContextValue,
  CircularMenuListProps,
  CircularMenuProps,
  CircularMenuRootProps,
  CircularMenuSpokeProps,
  CircularMenuTriggerProps,
} from "./types";
import {
  circularMenuItemIconVariants,
  circularMenuItemLabelVariants,
  circularMenuItemPositionerVariants,
  circularMenuItemVariants,
  circularMenuListVariants,
  circularMenuSpokeVariants,
  circularMenuTriggerVariants,
  circularMenuVariants,
} from "./variants";

function composeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as RefObject<T | null>).current = node;
    }
  };
}

const CircularMenuContext = createContext<CircularMenuContextValue | null>(
  null,
);

const CircularMenuLayoutContext =
  createContext<CircularMenuLayoutContextValue | null>(null);

/** Index + solved position for one ring slot, provided by `CircularMenu.List`. */
type CircularMenuItemContextValue = {
  index: number;
  position: CircularMenuPosition;
};

const CircularMenuItemContext =
  createContext<CircularMenuItemContextValue | null>(null);

function useCircularMenuContext(component: string) {
  const ctx = useContext(CircularMenuContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <CircularMenu.Root>`);
  }
  return ctx;
}

/**
 * Index and position of the surrounding ring slot.
 *
 * Falls back to slot 0 at the center so an item rendered outside
 * `CircularMenu.List` still renders instead of throwing.
 */
function useCircularMenuItemContext(): CircularMenuItemContextValue {
  const ctx = useContext(CircularMenuItemContext);
  return ctx ?? { index: 0, position: { index: 0, angle: 0, x: 0, y: 0 } };
}

/**
 * Ring layout parameters from the nearest root.
 *
 * Exported so the animated entry (and consumers building a custom ring body)
 * can solve the same positions the static list uses.
 */
function useCircularMenuLayout(): CircularMenuLayoutContextValue {
  const ctx = useContext(CircularMenuLayoutContext);
  if (!ctx) {
    throw new Error(
      "useCircularMenuLayout must be used within <CircularMenu.Root>",
    );
  }
  return ctx;
}

/**
 * Publishes one ring slot's index and position to the item subtree.
 *
 * `CircularMenu.List` wraps every child in this; the animated list reuses it so
 * `CircularMenu.Item` keeps working inside a motion-driven ring.
 */
function CircularMenuItemSlot({
  index,
  position,
  children,
}: {
  index: number;
  position: CircularMenuPosition;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ index, position }), [index, position]);
  return (
    <CircularMenuItemContext.Provider value={value}>
      {children}
    </CircularMenuItemContext.Provider>
  );
}

export function CircularMenuRoot({
  className,
  style,
  children,
  appearance = "default",
  size = "md",
  radius,
  itemSize,
  boxSize,
  startAngle = 0,
  sweep = 360,
  direction = "clockwise",
  trigger = "click",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  closeOnSelect = true,
  closeOnEscape = true,
  closeOnOutside = true,
  spin = false,
  spinDuration = 12,
  spinPauseOnHover = true,
  itemRotation = "upright",
  showSpokes = false,
  labelPlacement = "tooltip",
  stagger = 40,
  // `label` belongs to the shorthand entry, which renders it inside the
  // trigger. Pulled out of the props here purely so it never reaches the DOM.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label,
  items,
  onSelect,
  disabled = false,
  onPointerEnter,
  onPointerLeave,
  ref,
  ...rest
}: CircularMenuRootProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const itemNodesRef = useRef(new Map<number, HTMLElement>());
  const pendingFocusRef = useRef<number | null>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const [activeIndex, setActiveIndex] = useState(0);
  const [openState, setOpenState] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const isAlwaysOpen = trigger === "always";
  const isOpen = isAlwaysOpen ? true : openState && !disabled;

  const metrics = CIRCULAR_MENU_SIZE_METRICS[size];
  const resolvedRadius = radius ?? metrics.radius;
  const resolvedItemSize = itemSize ?? metrics.itemSize;
  const resolvedBoxSize =
    boxSize ?? getCircularMenuBoxSize(resolvedRadius, resolvedItemSize);

  const open = useCallback(() => {
    if (disabled || isAlwaysOpen) return;
    setOpenState(true);
  }, [disabled, isAlwaysOpen, setOpenState]);

  const close = useCallback(() => {
    if (isAlwaysOpen) return;
    setOpenState(false);
  }, [isAlwaysOpen, setOpenState]);

  const toggle = useCallback(() => {
    if (disabled || isAlwaysOpen) return;
    setOpenState((previous) => !previous);
  }, [disabled, isAlwaysOpen, setOpenState]);

  const focusTrigger = useCallback(() => {
    triggerRef.current?.focus();
  }, []);

  const registerItem = useCallback(
    (index: number, node: HTMLElement | null) => {
      if (node) itemNodesRef.current.set(index, node);
      else itemNodesRef.current.delete(index);
    },
    [],
  );

  /** Wrap an index into the range of currently mounted items. */
  const wrapIndex = useCallback((index: number) => {
    const count = itemNodesRef.current.size;
    if (count === 0) return 0;
    return ((index % count) + count) % count;
  }, []);

  const focusItem = useCallback(
    (index: number) => {
      const next = wrapIndex(index);
      setActiveIndex(next);
      itemNodesRef.current.get(next)?.focus();
    },
    [wrapIndex],
  );

  /**
   * Open first, then focus. The closed list is `inert`, so focus has to wait
   * until React has committed the open state.
   */
  const openAndFocus = useCallback(
    (index: number) => {
      if (isOpen) {
        focusItem(index);
        return;
      }
      pendingFocusRef.current = index;
      open();
    },
    [focusItem, isOpen, open],
  );

  useEffect(() => {
    if (!isOpen || pendingFocusRef.current === null) return;
    const index = pendingFocusRef.current;
    pendingFocusRef.current = null;
    focusItem(index);
  }, [focusItem, isOpen]);

  useEffect(() => {
    if (!isOpen) setActiveIndex(0);
  }, [isOpen]);

  const selectItem = useCallback(
    (index: number, itemOnSelect?: () => void) => {
      if (disabled) return;
      itemOnSelect?.();
      const item: CircularMenuItemData = itemsRef.current?.[index] ?? {
        id: String(index),
      };
      onSelectRef.current?.(item, index);
      if (closeOnSelect) {
        close();
        focusTrigger();
      }
    },
    [close, closeOnSelect, disabled, focusTrigger],
  );

  const handleListKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          focusItem(activeIndex + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          focusItem(activeIndex - 1);
          break;
        case "Home":
          event.preventDefault();
          focusItem(0);
          break;
        case "End":
          event.preventDefault();
          focusItem(itemNodesRef.current.size - 1);
          break;
        case "Escape":
          if (!closeOnEscape) break;
          event.preventDefault();
          close();
          focusTrigger();
          break;
        case "Tab":
          // Let focus leave naturally, but never leave an open ring behind.
          close();
          break;
        default:
          break;
      }
    },
    [activeIndex, close, closeOnEscape, focusItem, focusTrigger],
  );

  const handleTriggerKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          openAndFocus(0);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          openAndFocus(-1);
          break;
        case "Escape":
          if (!closeOnEscape) break;
          event.preventDefault();
          close();
          break;
        default:
          break;
      }
    },
    [close, closeOnEscape, openAndFocus],
  );

  const handleOutsidePress = useCallback(() => {
    if (!closeOnOutside) return;
    close();
  }, [close, closeOnOutside]);

  useClickOutside({
    ref: rootRef,
    setOpen: handleOutsidePress,
    listenEvents: ["mousedown", "touchstart"],
  });

  const reactId = useId();
  const triggerId = `${reactId}-trigger`;
  const listId = `${reactId}-list`;

  const contextValue = useMemo<CircularMenuContextValue>(
    () => ({
      isOpen,
      isDisabled: disabled,
      state: isOpen ? "open" : "closed",
      appearance,
      size,
      triggerMode: trigger,
      activeIndex,
      spin,
      counterSpin: spin && itemRotation === "upright",
      spinDuration,
      spinPauseOnHover,
      itemRotation,
      labelPlacement,
      showSpokes,
      triggerId,
      listId,
      triggerRef,
      open,
      close,
      toggle,
      setActiveIndex,
      registerItem,
      focusItem,
      selectItem,
      handleListKeyDown,
      handleTriggerKeyDown,
    }),
    [
      activeIndex,
      appearance,
      close,
      disabled,
      focusItem,
      handleListKeyDown,
      handleTriggerKeyDown,
      isOpen,
      itemRotation,
      labelPlacement,
      listId,
      open,
      registerItem,
      selectItem,
      showSpokes,
      size,
      spin,
      spinDuration,
      spinPauseOnHover,
      toggle,
      trigger,
      triggerId,
    ],
  );

  const layoutValue = useMemo<CircularMenuLayoutContextValue>(
    () => ({
      radius: resolvedRadius,
      startAngle,
      sweep,
      direction,
      itemSize: resolvedItemSize,
    }),
    [direction, resolvedItemSize, resolvedRadius, startAngle, sweep],
  );

  return (
    <div
      ref={composeRefs(ref, rootRef)}
      data-slot="circular-menu"
      data-state={isOpen ? "open" : "closed"}
      data-appearance={appearance}
      data-size={size}
      data-spin={spin || undefined}
      data-spin-paused={(spin && spinPauseOnHover) || undefined}
      data-disabled={disabled || undefined}
      className={cn(circularMenuVariants({ size }), className)}
      style={
        {
          "--zui-circular-menu-size": `${resolvedBoxSize}px`,
          "--zui-circular-menu-radius": `${resolvedRadius}px`,
          "--zui-circular-menu-item-size": `${resolvedItemSize}px`,
          "--zui-circular-menu-spin-duration": `${spinDuration}s`,
          "--zui-circular-menu-stagger": `${stagger}ms`,
          ...style,
        } as CircularMenuCssProperties
      }
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (event.defaultPrevented) return;
        if (trigger === "hover") open();
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        if (event.defaultPrevented) return;
        if (trigger === "hover") close();
      }}
      {...rest}
    >
      <CircularMenuLayoutContext.Provider value={layoutValue}>
        <CircularMenuContext.Provider value={contextValue}>
          {children}
        </CircularMenuContext.Provider>
      </CircularMenuLayoutContext.Provider>
    </div>
  );
}

CircularMenuRoot.displayName = "CircularMenuRoot";

export function CircularMenuTrigger({
  className,
  children,
  onClick,
  onFocus,
  onKeyDown,
  disabled: disabledProp,
  ref,
  ...rest
}: CircularMenuTriggerProps) {
  const {
    appearance,
    isOpen,
    isDisabled,
    listId,
    open,
    state,
    toggle,
    triggerId,
    triggerMode,
    triggerRef,
    handleTriggerKeyDown,
  } = useCircularMenuContext("CircularMenu.Trigger");
  const isTriggerDisabled = disabledProp ?? isDisabled;

  return (
    <button
      ref={composeRefs(ref, triggerRef)}
      type="button"
      id={triggerId}
      data-slot="circular-menu-trigger"
      data-state={state}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={listId}
      disabled={isTriggerDisabled}
      className={cn(circularMenuTriggerVariants({ appearance }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
      onFocus={(event) => {
        onFocus?.(event);
        // Hover menus must also open for keyboard users.
        if (!event.defaultPrevented && triggerMode === "hover") open();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) handleTriggerKeyDown(event);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

CircularMenuTrigger.displayName = "CircularMenuTrigger";

export function CircularMenuList({
  className,
  children,
  onKeyDown,
  ref,
  ...rest
}: CircularMenuListProps) {
  const {
    appearance,
    handleListKeyDown,
    isOpen,
    listId,
    showSpokes,
    spin,
    spinPauseOnHover,
    state,
    triggerId,
  } = useCircularMenuContext("CircularMenu.List");
  const layout = useContext(CircularMenuLayoutContext);

  const slots = Children.toArray(children);
  const positions = getCircularMenuPositions({
    count: slots.length,
    radius: layout?.radius ?? 0,
    startAngle: layout?.startAngle ?? 0,
    sweep: layout?.sweep ?? 360,
    direction: layout?.direction ?? "clockwise",
  });

  return (
    <div
      ref={ref}
      id={listId}
      role="menu"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen || undefined}
      inert={!isOpen}
      data-slot="circular-menu-list"
      data-state={state}
      data-spin={spin || undefined}
      data-pause-on-hover={(spin && spinPauseOnHover) || undefined}
      className={cn(circularMenuListVariants(), className)}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) handleListKeyDown(event);
      }}
      {...rest}
    >
      {showSpokes &&
        positions.map((position) => (
          <CircularMenuItemContext.Provider
            key={`spoke-${position.index}`}
            value={{ index: position.index, position }}
          >
            <CircularMenuSpoke appearance={appearance} />
          </CircularMenuItemContext.Provider>
        ))}
      {slots.map((slot, index) => {
        const position = positions[index] ?? { index, angle: 0, x: 0, y: 0 };
        const key = (slot as ReactElement).key ?? index;

        return (
          <CircularMenuItemContext.Provider
            key={key}
            value={{ index, position }}
          >
            <div
              data-slot="circular-menu-item-positioner"
              data-index={index}
              data-angle={position.angle}
              className={cn(circularMenuItemPositionerVariants())}
              style={
                {
                  "--zui-circular-menu-item-x": `${position.x}px`,
                  "--zui-circular-menu-item-y": `${position.y}px`,
                  "--zui-circular-menu-item-angle": `${position.angle}deg`,
                  "--zui-circular-menu-item-index": index,
                } as CircularMenuCssProperties
              }
            >
              {slot}
            </div>
          </CircularMenuItemContext.Provider>
        );
      })}
    </div>
  );
}

CircularMenuList.displayName = "CircularMenuList";

export function CircularMenuItem({
  className,
  children,
  appearance: appearanceProp,
  disabled: disabledProp,
  href,
  target,
  onSelect,
  onClick,
  onFocus,
  ref,
  ...rest
}: CircularMenuItemProps) {
  const {
    activeIndex,
    appearance,
    isDisabled,
    registerItem,
    selectItem,
    setActiveIndex,
  } = useCircularMenuContext("CircularMenu.Item");
  const { index } = useCircularMenuItemContext();
  const isItemDisabled = disabledProp ?? isDisabled;

  const register = useCallback(
    (node: HTMLElement | null) => registerItem(index, node),
    [index, registerItem],
  );

  const handleFocus = (event: ReactFocusEvent<HTMLElement>) => {
    onFocus?.(event as ReactFocusEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setActiveIndex(index);
  };

  const handleClick = (event: ReactMouseEvent<HTMLElement>) => {
    onClick?.(event as ReactMouseEvent<HTMLButtonElement>);
    if (event.defaultPrevented) return;
    if (isItemDisabled) {
      event.preventDefault();
      return;
    }
    selectItem(index, onSelect);
  };

  const shared = {
    role: "menuitem" as const,
    tabIndex: activeIndex === index ? 0 : -1,
    "data-slot": "circular-menu-item",
    "data-index": index,
    "data-active": activeIndex === index || undefined,
    "data-disabled": isItemDisabled || undefined,
    "aria-disabled": isItemDisabled || undefined,
    className: cn(
      circularMenuItemVariants({ appearance: appearanceProp ?? appearance }),
      className,
    ),
  };

  if (href) {
    return (
      <a
        ref={composeRefs(ref as Ref<HTMLElement>, register)}
        href={isItemDisabled ? undefined : href}
        target={target}
        onFocus={handleFocus}
        onClick={handleClick}
        {...shared}
        {...(rest as unknown as ComponentPropsWithRef<"a">)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={composeRefs(ref as Ref<HTMLElement>, register)}
      type="button"
      onFocus={handleFocus}
      onClick={handleClick}
      {...shared}
      {...rest}
    >
      {children}
    </button>
  );
}

CircularMenuItem.displayName = "CircularMenuItem";

export function CircularMenuItemIcon({
  className,
  children,
  ref,
  ...rest
}: CircularMenuItemIconProps) {
  const { counterSpin, spin, spinPauseOnHover } = useCircularMenuContext(
    "CircularMenu.ItemIcon",
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-slot="circular-menu-item-icon"
      data-counter-spin={counterSpin || undefined}
      data-pause-on-hover={(spin && spinPauseOnHover) || undefined}
      className={cn(circularMenuItemIconVariants(), className)}
      {...rest}
    >
      {children}
    </span>
  );
}

CircularMenuItemIcon.displayName = "CircularMenuItemIcon";

export function CircularMenuItemLabel({
  className,
  children,
  placement,
  ref,
  ...rest
}: CircularMenuItemLabelProps) {
  const { counterSpin, labelPlacement, spin, spinPauseOnHover } =
    useCircularMenuContext("CircularMenu.ItemLabel");
  const resolvedPlacement = placement ?? labelPlacement;

  return (
    <span
      ref={ref}
      data-slot="circular-menu-item-label"
      data-placement={resolvedPlacement}
      data-counter-spin={counterSpin || undefined}
      data-pause-on-hover={(spin && spinPauseOnHover) || undefined}
      className={cn(
        circularMenuItemLabelVariants({ placement: resolvedPlacement }),
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

CircularMenuItemLabel.displayName = "CircularMenuItemLabel";

export function CircularMenuSpoke({
  className,
  appearance: appearanceProp,
  ref,
  ...rest
}: CircularMenuSpokeProps) {
  const { appearance } = useCircularMenuContext("CircularMenu.Spoke");
  const { index, position } = useCircularMenuItemContext();

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-slot="circular-menu-spoke"
      data-index={index}
      className={cn(
        circularMenuSpokeVariants({ appearance: appearanceProp ?? appearance }),
        className,
      )}
      style={
        {
          "--zui-circular-menu-item-angle": `${position.angle}deg`,
        } as CircularMenuCssProperties
      }
      {...rest}
    />
  );
}

CircularMenuSpoke.displayName = "CircularMenuSpoke";

/** Default trigger glyph, used when `label` is explicitly `null`. */
function DefaultTriggerIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="size-4"
    >
      <circle cx="8" cy="3" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="8" cy="13" r="1.5" />
    </svg>
  );
}

function CircularMenuImpl({
  items,
  label = "Menu",
  children,
  ...rest
}: CircularMenuProps) {
  return (
    <CircularMenuRoot items={items} {...rest}>
      <CircularMenuTrigger>
        {label ?? <DefaultTriggerIcon />}
      </CircularMenuTrigger>
      <CircularMenuList>
        {children ??
          items?.map((item) => (
            <CircularMenuItem
              key={item.id}
              appearance={item.appearance}
              disabled={item.disabled}
              href={item.href}
              target={item.target}
              onSelect={item.onSelect}
            >
              {item.icon != null && (
                <CircularMenuItemIcon>{item.icon}</CircularMenuItemIcon>
              )}
              {item.label != null && (
                <CircularMenuItemLabel>{item.label}</CircularMenuItemLabel>
              )}
            </CircularMenuItem>
          ))}
      </CircularMenuList>
    </CircularMenuRoot>
  );
}

CircularMenuImpl.displayName = "CircularMenu";

export const CircularMenu = Object.assign(CircularMenuImpl, {
  Root: CircularMenuRoot,
  Trigger: CircularMenuTrigger,
  List: CircularMenuList,
  Item: CircularMenuItem,
  ItemIcon: CircularMenuItemIcon,
  ItemLabel: CircularMenuItemLabel,
  Spoke: CircularMenuSpoke,
});

export { CircularMenuItemSlot, useCircularMenuContext, useCircularMenuLayout };
