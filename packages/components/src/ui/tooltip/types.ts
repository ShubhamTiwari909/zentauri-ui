import { ReactNode } from "react"

export type TooltipPosition = "top" | "bottom" | "left" | "right"

export type TooltipContextType = {
  open: boolean
  setOpen: (value: boolean) => void
  position: TooltipPosition
  delay: number
  scheduleDelayedOpen: () => void
  cancelDelayedOpen: () => void
}

export type TooltipProps = {
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  position?: TooltipPosition
  delay?: number
}

export type TooltipTriggerProps = {
  children: ReactNode
  className?: string
}

export type TooltipContentProps = {
  children: ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost" | "glass" | "emerald" | "indigo" | "purple" | "pink" | "rose" | "sky" | "teal" | "yellow" | "orange" | "green" | "gradient-blue" | "gradient-green" | "gradient-red" | "gradient-yellow" | "gradient-purple" | "gradient-teal" | "gradient-indigo" | "gradient-pink" | "gradient-orange"
  size?: "sm" | "md" | "lg"
  width?: "fit" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  animation?: "fade" | "scale" | "none"
}

export type TooltipAnimation = "none" | "fade" | "scale";