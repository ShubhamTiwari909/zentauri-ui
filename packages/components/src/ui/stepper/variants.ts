import { cva } from "class-variance-authority";

export const stepperVariants = cva("flex w-full", {
  variants: {
    orientation: {
      horizontal: "flex-row flex-wrap items-start gap-4",
      vertical: "flex-col gap-6",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepperItemVariants = cva("relative flex gap-3", {
  variants: {
    orientation: {
      horizontal: "min-w-0 flex-col items-center text-center",
      vertical: "flex-row items-start text-left",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepperIndicatorVariants = cva(
  "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors",
  {
    variants: {
      appearance: {
        complete:
          "border-emerald-500/60 bg-emerald-500/20 text-emerald-100 ring-2 ring-emerald-400/30",
        current:
          "border-violet-400 bg-violet-500/20 text-white ring-2 ring-violet-400/50",
        upcoming: "border-white/15 bg-white/5 text-slate-400",
        sky: "border-sky-500/60 bg-sky-500/20 text-sky-100 ring-2 ring-sky-400/30",
        rose: "border-rose-500/60 bg-rose-500/20 text-rose-100 ring-2 ring-rose-400/30",
        purple: "border-purple-500/60 bg-purple-500/20 text-purple-100 ring-2 ring-purple-400/30",
        pink: "border-pink-500/60 bg-pink-500/20 text-pink-100 ring-2 ring-pink-400/30",
        orange: "border-orange-500/60 bg-orange-500/20 text-orange-100 ring-2 ring-orange-400/30",
        yellow: "border-yellow-500/60 bg-yellow-500/20 text-yellow-100 ring-2 ring-yellow-400/30",
        teal: "border-teal-500/60 bg-teal-500/20 text-teal-100 ring-2 ring-teal-400/30",
        indigo: "border-indigo-500/60 bg-indigo-500/20 text-indigo-100 ring-2 ring-indigo-400/30",
        emerald: "border-emerald-500/60 bg-emerald-500/20 text-emerald-100 ring-2 ring-emerald-400/30",
        gray: "border-gray-500/60 bg-gray-500/20 text-gray-100 ring-2 ring-gray-400/30",
        violet: "border-violet-500/60 bg-violet-500/20 text-violet-100 ring-2 ring-violet-400/30",
        "gradient-blue": "border-blue-500/60 bg-blue-500/20 text-blue-100 ring-2 ring-blue-400/30",
        "gradient-green": "border-green-500/60 bg-green-500/20 text-green-100 ring-2 ring-green-400/30",
        "gradient-red": "border-red-500/60 bg-red-500/20 text-red-100 ring-2 ring-red-400/30",
        "gradient-yellow": "border-yellow-500/60 bg-yellow-500/20 text-yellow-100 ring-2 ring-yellow-400/30",
        "gradient-purple": "border-purple-500/60 bg-purple-500/20 text-purple-100 ring-2 ring-purple-400/30",
        "gradient-teal": "border-teal-500/60 bg-teal-500/20 text-teal-100 ring-2 ring-teal-400/30",
        "gradient-indigo": "border-indigo-500/60 bg-indigo-500/20 text-indigo-100 ring-2 ring-indigo-400/30",
        "gradient-pink": "border-pink-500/60 bg-pink-500/20 text-pink-100 ring-2 ring-pink-400/30",
        "gradient-orange": "border-orange-500/60 bg-orange-500/20 text-orange-100 ring-2 ring-orange-400/30",
      },
      size: {
        sm: "size-8 text-xs",
        md: "size-9 text-sm",
        lg: "size-10 text-base",
      },
    },
    defaultVariants: {
      appearance: "upcoming",
      size: "md",
    },
  },
);
