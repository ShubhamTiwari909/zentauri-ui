import { cva } from "class-variance-authority";

export const toggleTrackVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full border border-white/10 bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 data-[state=checked]:border-cyan-500/40 data-[state=checked]:bg-cyan-600/80 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-[3.25rem]",
      },
      appearance: {
        default: "data-[state=checked]:bg-cyan-600/80",
        success: "data-[state=checked]:border-emerald-500/40 data-[state=checked]:bg-emerald-600/80",
        destructive: "data-[state=checked]:border-rose-500/40 data-[state=checked]:bg-rose-600/80",
        neutral: "data-[state=checked]:border-slate-400/40 data-[state=checked]:bg-slate-600/90",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  },
);

export const toggleThumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.35)] ring-0",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
