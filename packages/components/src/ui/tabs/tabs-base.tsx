"use client";

import {
  createContext,
  KeyboardEvent,
  useContext,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";

import {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
  TabsValue,
  TabsContextType,
} from "./types";
import { tabsListVariants, tabsTriggerVariants } from "./variants";

export const TabsContext = createContext<TabsContextType | null>(null);

export const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within Tabs");
  return ctx;
};

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  variant,
  size,
  appearance,
  children,
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const idPrefix = useId();
  const listRef = useRef<HTMLDivElement | null>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onValueChange?.(val);
  };

  const tabTriggerId = (tabValue: TabsValue) =>
    `${idPrefix}zentauri-tab-${tabValue}`;
  const tabPanelId = (tabValue: TabsValue) =>
    `${idPrefix}zentauri-panel-${tabValue}`;

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        setValue,
        listRef,
        orientation,
        size,
        variant,
        appearance,
        tabTriggerId,
        tabPanelId,
      }}
    >
      <div data-slot="tabs" className={cn("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  const { orientation, size, listRef } = useTabs();

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      className={cn(tabsListVariants({ orientation, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  disabled,
  className,
  ...props
}: TabsTriggerProps) {
  const {
    value: activeValue,
    setValue,
    listRef,
    orientation,
    tabTriggerId,
    tabPanelId,
    size,
    appearance,
    variant,
  } = useTabs();

  const isActive = activeValue === value;

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const list = listRef.current;
    const triggers =
      list === null
        ? []
        : Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));

    const nextKeys =
      orientation === "vertical" ? ["ArrowDown"] : ["ArrowRight"];
    const prevKeys = orientation === "vertical" ? ["ArrowUp"] : ["ArrowLeft"];

    const index = triggers.findIndex((el) => el === e.currentTarget);
    if (index === -1) {
      return;
    }

    const findEnabledIndex = (
      start: number,
      direction: 1 | -1,
    ): number | undefined => {
      const n = triggers.length;
      if (n === 0) {
        return undefined;
      }
      let i = start;
      for (let step = 0; step < n; step += 1) {
        i = (i + direction + n) % n;
        if (triggers[i]?.disabled !== true) {
          return i;
        }
      }
      return undefined;
    };

    const focusAt = (i: number) => {
      const target = triggers[i];
      if (target !== undefined && target.disabled !== true) {
        target.focus();
      }
    };

    const isNext = nextKeys.includes(e.key);
    const isPrev = prevKeys.includes(e.key);

    if (isNext) {
      e.preventDefault();
      const nextIdx = findEnabledIndex(index, 1);
      if (nextIdx !== undefined) {
        focusAt(nextIdx);
      }
      return;
    }

    if (isPrev) {
      e.preventDefault();
      const prevIdx = findEnabledIndex(index, -1);
      if (prevIdx !== undefined) {
        focusAt(prevIdx);
      }
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      const firstEnabledIndex = triggers.findIndex((btn) => !btn.disabled);
      if (firstEnabledIndex !== -1) {
        triggers[firstEnabledIndex]?.focus();
      }
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      for (let i = triggers.length - 1; i >= 0; i -= 1) {
        if (!triggers[i]?.disabled) {
          triggers[i]?.focus();
          break;
        }
      }
    }
  };

  return (
    <button
      id={tabTriggerId(value)}
      type="button"
      role="tab"
      data-state={isActive ? "active" : "inactive"}
      aria-selected={isActive}
      aria-controls={tabPanelId(value)}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        tabsTriggerVariants({ size, appearance, variant }),
        className,
        "cursor-pointer",
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
  as: Wrapper = "div",
  ...props
}: TabsContentProps) {
  const { value: activeValue, tabTriggerId, tabPanelId } = useTabs();

  if (activeValue !== value) return null;

  return (
    <Wrapper
      id={tabPanelId(value)}
      role="tabpanel"
      aria-labelledby={tabTriggerId(value)}
      className={cn("mt-2", className)}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
