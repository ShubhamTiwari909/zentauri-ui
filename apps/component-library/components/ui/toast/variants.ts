import { cva } from "class-variance-authority";

export const toastViewportVariants = cva("fixed z-[60] flex max-h-screen flex-col gap-2 p-4", {
  variants: {
    position: {
      "top-left": "left-0 top-0 items-start",
      "top-center": "left-1/2 top-0 -translate-x-1/2 items-center",
      "top-right": "right-0 top-0 items-end",
      "bottom-left": "bottom-0 left-0 items-start",
      "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
      "bottom-right": "bottom-0 right-0 items-end",
    },
  },
  defaultVariants: {
    position: "bottom-right",
  },
});

export const toastRootVariants = cva(
  "pointer-events-auto w-[min(100vw-2rem,380px)] rounded-xl border border-white/10 bg-slate-950 p-4 text-slate-50 shadow-[0_18px_48px_rgba(15,23,42,0.45)]",
  {
    variants: {
      appearance: {
        default: "bg-slate-950",
        success: "border-emerald-500/40 bg-emerald-950/60",
        warning: "border-amber-500/40 bg-amber-950/60",
        error: "border-rose-500/50 bg-rose-950/60",
        info: "border-sky-500/40 bg-sky-950/60",
      },
      size: {
        sm: "p-3 text-xs",
        md: "p-4 text-sm",
        lg: "p-5 text-base",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
    },
  },
);
