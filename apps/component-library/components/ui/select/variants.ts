import { cva } from "class-variance-authority";

export const selectTriggerVariants = cva(
  "flex w-full min-w-[10rem] items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-50 shadow-[0_1px_2px_rgba(15,23,42,0.12)] outline-none ring-offset-slate-950 transition-colors focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "min-h-8 px-2.5 py-1.5 text-xs",
        md: "min-h-10 px-3 py-2 text-sm",
        lg: "min-h-11 px-4 py-2.5 text-base",
      },
      appearance: {
        default: "border-white/10 bg-white/5",
        ghost: "border-transparent bg-transparent hover:bg-white/5",
        error: "border-rose-500/60 bg-rose-500/5",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  },
);

export const selectContentVariants = cva(
  "z-50 max-h-[min(320px,60vh)] w-[var(--select-trigger-width,12rem)] overflow-y-auto rounded-xl border border-white/10 bg-slate-950 p-1 text-sm text-slate-50 shadow-[0_18px_48px_rgba(15,23,42,0.45)]",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      appearance: {
        default: "bg-slate-950",
        glass: "border-white/15 bg-slate-950/80 backdrop-blur-xl",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  },
);

export const selectItemVariants = cva(
  "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-slate-100 outline-none transition hover:bg-white/10 focus:bg-white/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-white/10",
);

export const selectLabelVariants = cva("px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400");

export const selectSeparatorVariants = cva("my-1 h-px bg-white/10");
