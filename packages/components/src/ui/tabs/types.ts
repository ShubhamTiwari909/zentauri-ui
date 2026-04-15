import { ReactNode } from "react"

import type { TabsAnimation } from "./animations"

export type TabsValue = string

export type TabsProps = {
  value?: TabsValue
  defaultValue?: TabsValue
  onValueChange?: (value: TabsValue) => void
  orientation?: "horizontal" | "vertical"
  variant?: "default" | "underline" | "pills"
  size?: "sm" | "md" | "lg"
  appearance?: "default" | "sky" | "rose" | "purple" | "pink" | "orange" | "yellow" | "teal" | "indigo" | "emerald" | "gray" | "gradient-blue" | "gradient-green" | "gradient-red" | "gradient-yellow" | "gradient-purple" | "gradient-teal" | "gradient-indigo" | "gradient-pink" | "gradient-orange"
  children: ReactNode
  className?: string
}

export type TabsListProps = {
  children: ReactNode
  className?: string
}

export type TabsTriggerProps = {
  value: TabsValue
  children: ReactNode
  disabled?: boolean
  className?: string
}

export type TabsContentProps = {
  value: TabsValue
  children: ReactNode
  className?: string
  animation?: TabsAnimation
}


export type TabsContextType = {
  value: TabsValue | undefined
  setValue: (value: TabsValue) => void
  orientation: "horizontal" | "vertical"
  size?: "sm" | "md" | "lg"
  variant?: "default" | "underline" | "pills"
  appearance?: "default" | "sky" | "rose" | "purple" | "pink" | "orange" | "yellow" | "teal" | "indigo" | "emerald" | "gray" | "gradient-blue" | "gradient-green" | "gradient-red" | "gradient-yellow" | "gradient-purple" | "gradient-teal" | "gradient-indigo" | "gradient-pink" | "gradient-orange"
  tabTriggerId: (value: TabsValue) => string
  tabPanelId: (value: TabsValue) => string
}