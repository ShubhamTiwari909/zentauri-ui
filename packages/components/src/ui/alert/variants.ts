import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative flex w-full gap-3 border text-sm ring-offset-slate-50 dark:ring-offset-slate-950 transition-colors",
  {
    variants: {
      appearance: {
        default:
          "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-900 dark:text-slate-50",
        success:
          "border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-50",
        warning:
          "border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-50",
        error:
          "border-rose-500/50 bg-rose-500/10 text-rose-950 dark:text-rose-50",
        info: "border-sky-500/40 bg-sky-500/10 text-sky-950 dark:text-sky-50",
        ghost:
          "border-transparent bg-transparent text-slate-700 dark:text-slate-200",
        purple:
          "border-purple-800 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        pink: "border-pink-800 dark:border-pink-600 bg-pink-50 dark:bg-pink-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        orange:
          "border-orange-800 dark:border-orange-600 bg-orange-50 dark:bg-orange-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        yellow:
          "border-yellow-800 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        teal: "border-teal-800 dark:border-teal-600 bg-teal-50 dark:bg-teal-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        indigo:
          "border-indigo-800 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        gray: "border-gray-800 dark:border-gray-600 bg-gray-50 dark:bg-gray-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        violet:
          "border-violet-800 dark:border-violet-600 bg-violet-50 dark:bg-violet-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        "gradient-blue":
          "border-blue-800 dark:border-blue-600 bg-linear-to-r from-blue-50 dark:from-blue-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        "gradient-green":
          "border-green-800 dark:border-green-600 bg-linear-to-r from-green-50 dark:from-green-950/70 to-lime-50 dark:to-lime-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        "gradient-red":
          "border-red-800 dark:border-red-600 bg-linear-to-r from-red-50 dark:from-red-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        "gradient-yellow":
          "border-yellow-800 dark:border-yellow-600 bg-linear-to-r from-yellow-50 dark:from-yellow-950/70 to-orange-50 dark:to-orange-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        "gradient-purple":
          "border-purple-800 dark:border-purple-600 bg-linear-to-r from-purple-50 dark:from-purple-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        "gradient-teal":
          "border-teal-800 dark:border-teal-600 bg-linear-to-r from-teal-50 dark:from-teal-950/70 to-cyan-50 dark:to-cyan-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        "gradient-indigo":
          "border-indigo-800 dark:border-indigo-600 bg-linear-to-r from-indigo-50 dark:from-indigo-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        "gradient-pink":
          "border-pink-800 dark:border-pink-600 bg-linear-to-r from-pink-50 dark:from-pink-950/70 to-rose-50 dark:to-rose-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
        "gradient-orange":
          "border-orange-800 dark:border-orange-600 bg-linear-to-r from-orange-50 dark:from-orange-950/70 to-red-50 dark:to-red-950/70 backdrop-blur-xl text-slate-900 dark:text-slate-50",
      },
      size: {
        sm: "rounded-lg p-3",
        md: "rounded-xl p-4",
        lg: "rounded-2xl p-5 text-base",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
    },
  },
);

export const alertTitleVariants = cva("font-semibold leading-tight", {
  variants: {
    size: {
      sm: "text-xs md:text-sm",
      md: "text-xs md:text-sm",
      lg: "text-xs md:text-sm",
    },
  },
  defaultVariants: { size: "md" },
});

export const alertDescriptionVariants = cva(
  "text-slate-600 dark:text-slate-300",
  {
    variants: {
      size: {
        sm: "text-xs md:text-sm",
        md: "text-xs md:text-sm",
        lg: "text-xs md:text-sm",
      },
    },
    defaultVariants: { size: "md" },
  },
);
