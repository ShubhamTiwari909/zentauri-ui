import { cva } from "class-variance-authority";

export const emptyStateVariants = cva(
  "flex w-full flex-col items-center text-center",
  {
    variants: {
      size: {
        sm: "gap-2 p-4 text-sm",
        md: "gap-3 p-6 text-sm",
        lg: "gap-4 p-8 text-base",
      },
      appearance: {
        default: "text-slate-50",
        ghost: "text-slate-200",
        card: "rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-50 shadow-[0_18px_48px_rgba(15,23,42,0.35)]",
      },
      align: {
        start: "items-start text-left",
        center: "items-center text-center",
        end: "items-end text-right",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
      align: "center",
    },
  },
);

export const emptyStateTitleVariants = cva("font-semibold tracking-tight", {
  variants: {
    size: {
      sm: "text-base",
      md: "text-lg",
      lg: "text-xl",
    },
  },
  defaultVariants: { size: "md" },
});

export const emptyStateDescriptionVariants = cva("max-w-md text-slate-400", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "md" },
});
