import { cva } from "class-variance-authority";

export const toastViewportVariants = cva(
  "fixed z-[60] flex max-h-screen flex-col gap-2 p-4",
  {
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
  },
);

export const toastRootVariants = cva(
  "pointer-events-auto w-[min(100vw-2rem,380px)] rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-950 p-4 text-slate-900 dark:text-slate-50 shadow-[0_8px_24px_rgba(15,23,42,0.12)] dark:shadow-[0_18px_48px_rgba(15,23,42,0.45)]",
  {
    variants: {
      appearance: {
        default: "bg-slate-50 dark:bg-slate-950",
        success: "border-emerald-500/40 bg-emerald-950",
        warning: "border-amber-500/40 bg-amber-950",
        error: "border-rose-500/50 bg-rose-950",
        info: "border-sky-500/40 bg-sky-950",
        ghost: "border-transparent bg-transparent text-slate-700 dark:text-slate-200",
        purple: "border-purple-800 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/70 backdrop-blur-xl",
        pink: "border-pink-800 dark:border-pink-600 bg-pink-50 dark:bg-pink-950/70 backdrop-blur-xl",
        orange: "border-orange-800 dark:border-orange-600 bg-orange-50 dark:bg-orange-950/70 backdrop-blur-xl",
        yellow: "border-yellow-800 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/70 backdrop-blur-xl",
        teal: "border-teal-800 dark:border-teal-600 bg-teal-50 dark:bg-teal-950/70 backdrop-blur-xl",
        indigo: "border-indigo-800 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 backdrop-blur-xl",
        emerald: "border-emerald-800 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 backdrop-blur-xl",
        gray: "border-gray-800 dark:border-gray-600 bg-gray-50 dark:bg-gray-950/70 backdrop-blur-xl",
        amber: "border-amber-800 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/70 backdrop-blur-xl",
        violet: "border-violet-800 dark:border-violet-600 bg-violet-50 dark:bg-violet-950/70 backdrop-blur-xl",
        "gradient-blue":
          "border-blue-800 dark:border-blue-600 bg-linear-to-r from-blue-50 dark:from-blue-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl",
        "gradient-green":
          "border-green-800 dark:border-green-600 bg-linear-to-r from-green-50 dark:from-green-950/70 to-lime-50 dark:to-lime-950/70 backdrop-blur-xl",
        "gradient-red":
          "border-red-800 dark:border-red-600 bg-linear-to-r from-red-50 dark:from-red-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow":
          "border-yellow-800 dark:border-yellow-600 bg-linear-to-r from-yellow-50 dark:from-yellow-950/70 to-orange-50 dark:to-orange-950/70 backdrop-blur-xl",
        "gradient-purple":
          "border-purple-800 dark:border-purple-600 bg-linear-to-r from-purple-50 dark:from-purple-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl",
        "gradient-teal":
          "border-teal-800 dark:border-teal-600 bg-linear-to-r from-teal-50 dark:from-teal-950/70 to-cyan-50 dark:to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo":
          "border-indigo-800 dark:border-indigo-600 bg-linear-to-r from-indigo-50 dark:from-indigo-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl",
        "gradient-pink":
          "border-pink-800 dark:border-pink-600 bg-linear-to-r from-pink-50 dark:from-pink-950/70 to-rose-50 dark:to-rose-950/70 backdrop-blur-xl",
        "gradient-orange":
          "border-orange-800 dark:border-orange-600 bg-linear-to-r from-orange-50 dark:from-orange-950/70 to-red-50 dark:to-red-950/70 backdrop-blur-xl",
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
