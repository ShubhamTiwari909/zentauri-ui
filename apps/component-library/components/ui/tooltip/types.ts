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
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  width?: "fit" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  intent?: "default" | "success" | "warning" | "danger"
  animation?: "fade" | "scale" | "none"
}