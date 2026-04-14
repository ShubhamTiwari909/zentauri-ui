import { cva } from "class-variance-authority";

export const tooltipContentVariants = cva(
  "z-50 max-w-xs rounded-lg border border-white/10 px-2 py-1 text-xs shadow-lg",
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-[0.65rem]",
        md: "px-2.5 py-1.5 text-xs",
        lg: "px-3 py-2 text-sm",
      },
      appearance: {
        default: "bg-slate-900 text-slate-50",
        dark: "bg-slate-950 text-slate-50",
        glass: "border-white/15 bg-slate-950/70 text-slate-50 backdrop-blur-xl",
        primary: "border-cyan-500/30 bg-cyan-950/80 text-cyan-50",
        destructive: "border-rose-500/30 bg-rose-950/80 text-rose-50",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  },
);

export const tooltipArrowVariants = cva(
  "absolute size-2 rotate-45 border border-white/10 bg-inherit",
);
