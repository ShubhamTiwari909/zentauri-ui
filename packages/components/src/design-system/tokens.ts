export const zuiCssVariablePattern =
  "--zui-<component>-<slot?>-<variant?>-<property>-<state?>-dark?" as const;

export const zuiInteractiveBase = ["transition-colors", "select-none"] as const;

export const zuiDisabledState = {
  default: "disabled:pointer-events-none disabled:opacity-50",
} as const;

export const zuiFocusRing = {
  default:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-focus-ring,oklch(44.6%_0.043_257.281))] dark:focus-visible:ring-[var(--zui-focus-ring-dark,oklch(86.9%_0.022_252.894))] focus-visible:ring-offset-2",
} as const;

export const zuiRingOffset = {
  default:
    "ring-offset-[var(--zui-ring-offset,oklch(98.4%_0.003_247.858))] dark:ring-offset-[var(--zui-ring-offset-dark,oklch(12.9%_0.042_264.695))]",
} as const;

export const zuiRadius = {
  xl: "rounded-[var(--zui-radius-xl,0.75rem)]",
} as const;
