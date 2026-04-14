import { cva } from "class-variance-authority";

export const accordionVariants = cva("w-full", {
  variants: {
    appearance: {
      default: "divide-y divide-white/10 rounded-xl border border-white/10",
      outline: "divide-y divide-white/10 rounded-xl border border-white/15",
      ghost: "divide-y divide-white/5",
      card: "space-y-2",
      separated: "space-y-3",
    },
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const accordionItemVariants = cva("", {
  variants: {
    appearance: {
      default: "",
      outline: "",
      ghost: "",
      card: "rounded-xl border border-white/10 bg-white/[0.03] p-2",
      separated: "rounded-xl border border-white/10 bg-slate-950/40 p-2",
    },
  },
  defaultVariants: { appearance: "default" },
});

export const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between gap-3 py-3 text-left font-medium text-slate-50 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/30",
  {
    variants: {
      size: {
        sm: "py-2 text-sm",
        md: "py-3 text-sm",
        lg: "py-4 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const accordionContentVariants = cva("pb-3 text-sm text-slate-300", {
  variants: {
    size: {
      sm: "pb-2 text-xs",
      md: "pb-3 text-sm",
      lg: "pb-4 text-base",
    },
  },
  defaultVariants: { size: "md" },
});
