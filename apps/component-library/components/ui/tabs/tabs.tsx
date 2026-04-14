"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import { tabsContentAnimationPresets } from "./animations";
import type { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from "./types";
import { tabsContentVariants, tabsListVariants, tabsTriggerVariants } from "./variants";

type TabsCtx = {
  value: string;
  setValue: (next: string) => void;
  animation: NonNullable<TabsProps["animation"]>;
  size: NonNullable<TabsProps["size"]>;
  appearance: NonNullable<TabsProps["appearance"]>;
  baseId: string;
};

const TabsContext = createContext<TabsCtx | null>(null);

function useTabsContext(component: string): TabsCtx {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tabs>`);
  }
  return ctx;
}

export function Tabs({
  value,
  defaultValue = "",
  onValueChange,
  animation = "fade",
  size = "md",
  appearance = "default",
  className,
  children,
}: TabsProps) {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const resolved = isControlled ? (value ?? "") : uncontrolled;
  const baseId = useId();

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const ctx = useMemo(
    () => ({
      value: resolved,
      setValue,
      animation: animation ?? "fade",
      size: size ?? "md",
      appearance: appearance ?? "default",
      baseId,
    }),
    [animation, appearance, baseId, resolved, setValue, size],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div data-slot="tabs" className={cn("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

Tabs.displayName = "Tabs";

export function TabsList({ className, size, appearance, children, ref, "aria-label": ariaLabel = "Tabs", ...rest }: TabsListProps) {
  const { size: ctxSize, appearance: ctxAppearance } = useTabsContext("TabsList");
  const listRef = useRef<HTMLDivElement | null>(null);

  const moveFocus = (direction: 1 | -1) => {
    const root = listRef.current;
    if (!root) {
      return;
    }
    const triggers = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-slot="tabs-trigger"]'));
    if (triggers.length === 0) {
      return;
    }
    const activeIndex = triggers.findIndex((node) => node === document.activeElement);
    const start = activeIndex === -1 ? 0 : activeIndex;
    let next = start + direction;
    if (next < 0) {
      next = triggers.length - 1;
    }
    if (next >= triggers.length) {
      next = 0;
    }
    triggers[next]?.focus();
  };

  return (
    <div
      ref={(node) => {
        listRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      role="tablist"
      data-slot="tabs-list"
      aria-label={ariaLabel}
      className={cn(tabsListVariants({ size: size ?? ctxSize, appearance: appearance ?? ctxAppearance }), className)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          moveFocus(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          moveFocus(-1);
        }
        if (event.key === "Home") {
          event.preventDefault();
          listRef.current?.querySelector<HTMLButtonElement>('[data-slot="tabs-trigger"]')?.focus();
        }
        if (event.key === "End") {
          event.preventDefault();
          const triggers = listRef.current?.querySelectorAll<HTMLButtonElement>('[data-slot="tabs-trigger"]');
          triggers?.[triggers.length - 1]?.focus();
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

TabsList.displayName = "TabsList";

export function TabsTrigger({ className, value: triggerValue, children, ref, ...rest }: TabsTriggerProps) {
  const { value, setValue, size, appearance, baseId } = useTabsContext("TabsTrigger");
  const selected = value === triggerValue;
  const tabId = `${baseId}-tab-${triggerValue}`;
  const panelId = `${baseId}-panel-${triggerValue}`;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={tabId}
      data-slot="tabs-trigger"
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      data-state={selected ? "active" : "inactive"}
      className={cn(tabsTriggerVariants({ size, appearance }), className)}
      onClick={() => setValue(triggerValue)}
      {...rest}
    >
      {children}
    </button>
  );
}

TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({
  className,
  value: contentValue,
  children,
  ref,
  id,
  style,
}: TabsContentProps) {
  const { value, animation, size, baseId } = useTabsContext("TabsContent");
  const selected = value === contentValue;
  const panelId = `${baseId}-panel-${contentValue}`;
  const tabId = `${baseId}-tab-${contentValue}`;
  const motionProps = tabsContentAnimationPresets[animation];

  return (
    <AnimatePresence mode="wait">
      {selected ? (
        <motion.div
          key={contentValue}
          ref={ref}
          role="tabpanel"
          id={id ?? panelId}
          data-slot="tabs-content"
          aria-labelledby={tabId}
          tabIndex={0}
          className={cn(tabsContentVariants({ size }), className)}
          initial={animation === "none" ? false : motionProps.initial}
          animate={animation === "none" ? undefined : motionProps.animate}
          transition={motionProps.transition}
          style={style}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

TabsContent.displayName = "TabsContent";
