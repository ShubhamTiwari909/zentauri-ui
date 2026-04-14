import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative flex w-full gap-3 border text-sm ring-offset-slate-950 transition-colors",
  {
    variants: {
      appearance: {
        default: "border-white/10 bg-white/5 text-slate-50",
        success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-50",
        warning: "border-amber-500/40 bg-amber-500/10 text-amber-50",
        error: "border-rose-500/50 bg-rose-500/10 text-rose-50",
        info: "border-sky-500/40 bg-sky-500/10 text-sky-50",
        ghost: "border-transparent bg-transparent text-slate-200",
      },
      size: {
        sm: "rounded-lg p-3",
        md: "rounded-xl p-4",
        lg: "rounded-2xl p-5 text-base",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
    },
  },
);

export const alertTitleVariants = cva("font-semibold leading-tight", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "md" },
});

export const alertDescriptionVariants = cva("text-slate-300", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "md" },
});
