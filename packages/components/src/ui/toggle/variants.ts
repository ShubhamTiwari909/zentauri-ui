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
        indigo: "data-[state=checked]:border-indigo-500/40 data-[state=checked]:bg-indigo-600/80",
        purple: "data-[state=checked]:border-purple-500/40 data-[state=checked]:bg-purple-600/80",
        pink: "data-[state=checked]:border-pink-500/40 data-[state=checked]:bg-pink-600/80",
        orange: "data-[state=checked]:border-orange-500/40 data-[state=checked]:bg-orange-600/80",
        yellow: "data-[state=checked]:border-yellow-500/40 data-[state=checked]:bg-yellow-600/80",
        green: "data-[state=checked]:border-green-500/40 data-[state=checked]:bg-green-600/80",
        teal: "data-[state=checked]:border-teal-500/40 data-[state=checked]:bg-teal-600/80",
        cyan: "data-[state=checked]:border-cyan-500/40 data-[state=checked]:bg-cyan-600/80",
        lime: "data-[state=checked]:border-lime-500/40 data-[state=checked]:bg-lime-600/80",
        emerald: "data-[state=checked]:border-emerald-500/40 data-[state=checked]:bg-emerald-600/80",
        rose: "data-[state=checked]:border-rose-500/40 data-[state=checked]:bg-rose-600/80",
        slate: "data-[state=checked]:border-slate-400/40 data-[state=checked]:bg-slate-600/90",
        zinc: "data-[state=checked]:border-zinc-400/40 data-[state=checked]:bg-zinc-600/90",
        gray: "data-[state=checked]:border-gray-400/40 data-[state=checked]:bg-gray-600/90",
        stone: "data-[state=checked]:border-stone-400/40 data-[state=checked]:bg-stone-600/90",
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
