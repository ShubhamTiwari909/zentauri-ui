import { cva } from "class-variance-authority";

export const dividerToneVariants = cva("", {
  variants: {
    appearance: {
      default: "text-slate-200",
      muted: "text-slate-500",
      primary: "text-cyan-300",
      destructive: "text-rose-400",
      ghost: "text-slate-600",
    },
  },
  defaultVariants: { appearance: "default" },
});

export const dividerVariants = cva("flex w-full items-center gap-3", {
  variants: {
    appearance: {
      default: "text-slate-200",
      muted: "text-slate-500",
      primary: "text-cyan-300",
      destructive: "text-rose-400",
      ghost: "text-slate-600",
    },
    orientation: {
      horizontal: "w-full flex-row",
      vertical: "h-full min-h-[2rem] w-auto flex-col self-stretch",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", size: "sm", class: "min-h-px" },
    { orientation: "horizontal", size: "md", class: "min-h-[2px]" },
    { orientation: "horizontal", size: "lg", class: "min-h-[3px]" },
    { orientation: "vertical", size: "sm", class: "min-w-px" },
    { orientation: "vertical", size: "md", class: "min-w-[2px]" },
    { orientation: "vertical", size: "lg", class: "min-w-[3px]" },
  ],
  defaultVariants: {
    appearance: "default",
    orientation: "horizontal",
    size: "md",
  },
});

export const dividerLineVariants = cva("shrink grow rounded-full bg-current opacity-80", {
  variants: {
    orientation: {
      horizontal: "h-px",
      vertical: "w-px flex-1",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", size: "sm", class: "h-px" },
    { orientation: "horizontal", size: "md", class: "h-0.5" },
    { orientation: "horizontal", size: "lg", class: "h-1" },
    { orientation: "vertical", size: "sm", class: "w-px" },
    { orientation: "vertical", size: "md", class: "w-0.5" },
    { orientation: "vertical", size: "lg", class: "w-1" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export const dividerLabelVariants = cva(
  "shrink-0 text-xs font-medium uppercase tracking-wide text-current",
);
