import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "w-full min-w-0 rounded-xl border bg-white/5 text-slate-50 shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
    "ring-offset-slate-950 transition-colors",
    "placeholder:text-slate-500",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default read-only:bg-white/[0.03]",
  ],
  {
    variants: {
      appearance: {
        default: "border-white/10 focus-visible:border-white/20",
        warning: "border-yellow-500/80 text-yellow-50 placeholder:text-yellow-300/70 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/80",
        error:
          "border-rose-500/80 text-rose-50 placeholder:text-rose-300/70 focus-visible:border-rose-400 focus-visible:ring-rose-400/80",
        success:
          "border-emerald-500/70 text-emerald-50 placeholder:text-emerald-300/70 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/80",
        info: "border-blue-500/80 text-blue-50 placeholder:text-blue-300/70 focus-visible:border-blue-400 focus-visible:ring-blue-400/80",
        violet: "border-violet-500/80 text-violet-50 placeholder:text-violet-300/70 focus-visible:border-violet-400 focus-visible:ring-violet-400/80",
        amber: "border-amber-500/80 text-amber-50 placeholder:text-amber-300/70 focus-visible:border-amber-400 focus-visible:ring-amber-400/80",
        pink: "border-pink-500/80 text-pink-50 placeholder:text-pink-300/70 focus-visible:border-pink-400 focus-visible:ring-pink-400/80",
        indigo: "border-indigo-500/80 text-indigo-50 placeholder:text-indigo-300/70 focus-visible:border-indigo-400 focus-visible:ring-indigo-400/80",

      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 md:h-11 px-4 text-sm",
        lg: "h-10 md:h-12 px-5 text-base",
      },
      ring: {
        true: "focus-visible:ring-2 focus-visible:ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
      ring: true,
    },
  },
);
