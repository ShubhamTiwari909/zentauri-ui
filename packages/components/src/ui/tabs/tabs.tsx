"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  createContext,
  KeyboardEvent,
  useContext,
  useId,
  useState,
} from "react"

import { cn } from "../../lib/utils"

import { getTabsContentMotionProps } from "./animations"
import {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
  TabsValue,
  TabsContextType,
} from "./types"
import { tabsListVariants, tabsTriggerVariants } from "./variants"


export const TabsContext = createContext<TabsContextType | null>(null)

export const useTabs = () => {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error("Tabs components must be used within Tabs")
  return ctx
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  children,
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const idPrefix = useId()

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const setValue = (val: string) => {
    if (!isControlled) setInternalValue(val)
    onValueChange?.(val)
  }

  const tabTriggerId = (tabValue: TabsValue) =>
    `${idPrefix}zentauri-tab-${tabValue}`
  const tabPanelId = (tabValue: TabsValue) =>
    `${idPrefix}zentauri-panel-${tabValue}`

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        setValue,
        orientation,
        tabTriggerId,
        tabPanelId,
      }}
    >
      <div data-slot="tabs" className={cn("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({
  children,
  className,
  ...props
}: TabsListProps) {
  const { orientation, size } = useTabs()

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(tabsListVariants({ orientation, size }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({
  value,
  children,
  disabled,
  className,
  ...props
}: TabsTriggerProps) {
  const { value: activeValue, setValue, tabTriggerId, tabPanelId, size, appearance, variant } = useTabs()

  const isActive = activeValue === value

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const triggers = Array.from(
      document.querySelectorAll('[role="tab"]'),
    ) as HTMLElement[]

    const index = triggers.findIndex((el) => el === e.currentTarget)

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      triggers[index + 1]?.focus()
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      triggers[index - 1]?.focus()
    }

    if (e.key === "Home") {
      e.preventDefault()
      triggers[0]?.focus()
    }

    if (e.key === "End") {
      e.preventDefault()
      triggers[triggers.length - 1]?.focus()
    }
  }

  return (
    <button
      id={tabTriggerId(value)}
      type="button"
      role="tab"
      data-state={isActive ? "active" : "inactive"}
      aria-selected={isActive}
      aria-controls={tabPanelId(value)}
      disabled={disabled}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(tabsTriggerVariants({ size, appearance, variant }), className, "cursor-pointer")}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  value,
  children,
  className,
  animation = "fade",
  ...props
}: TabsContentProps) {
  const { value: activeValue, orientation, tabTriggerId, tabPanelId } =
    useTabs()
  const prefersReducedMotion = useReducedMotion()

  if (activeValue !== value) return null

  const motionProps = getTabsContentMotionProps(
    animation,
    orientation,
    Boolean(prefersReducedMotion),
  )

  return (
    <motion.div
      id={tabPanelId(value)}
      role="tabpanel"
      aria-labelledby={tabTriggerId(value)}
      {...props}
      {...motionProps}
      className={cn("mt-2", className)}
    >
      {children}
    </motion.div>
  )
}
