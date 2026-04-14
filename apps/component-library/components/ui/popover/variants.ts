import { cva } from "class-variance-authority";

export const popoverContentVariants = cva(
  "z-50 w-[min(100vw-2rem,360px)] rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-50 shadow-[0_18px_48px_rgba(15,23,42,0.45)]",
  {
    variants: {
      size: {
        sm: "p-2 text-xs",
        md: "p-3 text-sm",
        lg: "p-4 text-base",
      },
      appearance: {
        default: "bg-slate-950",
        glass: "border-white/15 bg-slate-950/70 backdrop-blur-xl",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  },
);

export const popoverArrowVariants = cva(
  "absolute size-2 rotate-45 border border-white/10 bg-slate-950",
);
