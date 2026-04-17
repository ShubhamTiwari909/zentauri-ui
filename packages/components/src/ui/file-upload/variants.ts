import { cva } from "class-variance-authority";

export const fileUploadVariants = cva(
  "relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-10 text-center text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
  {
    variants: {
      appearance: {
        idle: "border-white/15 bg-white/5 text-slate-300 hover:border-white/25 hover:bg-white/[0.07]",
        active: "border-violet-400/70 bg-violet-500/10 text-white",
        disabled: "cursor-not-allowed opacity-50",
        error: "border-red-400/70 bg-red-500/10 text-red-400 hover:border-red-400/80 hover:bg-red-500/15",
        success: "border-green-400/70 bg-green-500/10 text-green-400 hover:border-green-400/80 hover:bg-green-500/15",
        warning: "border-yellow-400/70 bg-yellow-500/10 text-yellow-400 hover:border-yellow-400/80 hover:bg-yellow-500/15",
        info: "border-blue-400/70 bg-blue-500/10 text-blue-400 hover:border-blue-400/80 hover:bg-blue-500/15",
        neutral: "border-gray-400/70 bg-gray-500/10 text-gray-400 hover:border-gray-400/80 hover:bg-gray-500/15",
        purple: "border-purple-400/70 bg-purple-500/10 text-purple-400 hover:border-purple-400/80 hover:bg-purple-500/15",
        indigo: "border-indigo-400/70 bg-indigo-500/10 text-indigo-400 hover:border-indigo-400/80 hover:bg-indigo-500/15",
        emerald: "border-emerald-400/70 bg-emerald-500/10 text-emerald-400 hover:border-emerald-400/80 hover:bg-emerald-500/15",
        amber: "border-amber-400/70 bg-amber-500/10 text-amber-400 hover:border-amber-400/80 hover:bg-amber-500/15",
        pink: "border-pink-400/70 bg-pink-500/10 text-pink-400 hover:border-pink-400/80 hover:bg-pink-500/15",
        orange: "border-orange-400/70 bg-orange-500/10 text-orange-400 hover:border-orange-400/80 hover:bg-orange-500/15",
        teal: "border-teal-400/70 bg-teal-500/10 text-teal-400 hover:border-teal-400/80 hover:bg-teal-500/15",
      },
    },
    defaultVariants: {
      appearance: "idle",
    },
  },
);
