import { cva } from "class-variance-authority";

export const tooltipVariants = cva(
  "absolute z-50 rounded-md shadow-md transition-all duration-200 pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-black text-slate-900 dark:text-white",
        outline: "border bg-black dark:bg-white text-white dark:text-black",
        ghost: "bg-gray-500 dark:bg-gray-800 text-slate-900/90 dark:text-white/90",
        glass: "border border-black/15 dark:border-white/15 bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white backdrop-blur-md",
        emerald: "bg-emerald-500 dark:bg-emerald-800 text-slate-900 dark:text-white",
        indigo: "bg-indigo-800 dark:bg-indigo-600 text-slate-900 dark:text-white",
        purple: "bg-purple-800 dark:bg-purple-600 text-slate-900 dark:text-white",
        pink: "bg-pink-800 dark:bg-pink-600 text-slate-900 dark:text-white",
        rose: "bg-rose-800 dark:bg-rose-600 text-slate-900 dark:text-white",
        sky: "bg-sky-500 dark:bg-sky-700 text-slate-900 dark:text-white",
        teal: "bg-teal-800 dark:bg-teal-600 text-slate-900 dark:text-white",
        yellow: "bg-yellow-800 dark:bg-yellow-600 text-slate-900 dark:text-white",
        orange: "bg-orange-800 dark:bg-orange-600 text-slate-900 dark:text-white",
        green: "bg-green-800 dark:bg-green-600 text-slate-900 dark:text-white",
        "gradient-blue":
          "bg-linear-to-r from-blue-800 dark:from-blue-600 to-purple-800 dark:to-purple-600 text-slate-900 dark:text-white",
        "gradient-green":
          "bg-linear-to-r from-green-800 dark:from-green-600 to-lime-800 dark:to-lime-600 text-slate-900 dark:text-white",
        "gradient-red": "bg-linear-to-r from-red-800 dark:from-red-600 to-pink-800 dark:to-pink-600 text-slate-900 dark:text-white",
        "gradient-yellow":
          "bg-linear-to-r from-yellow-800 dark:from-yellow-600 to-orange-800 dark:to-orange-600 text-slate-900 dark:text-white",
        "gradient-purple":
          "bg-linear-to-r from-purple-800 dark:from-purple-600 to-pink-800 dark:to-pink-600 text-slate-900 dark:text-white",
        "gradient-teal": "bg-linear-to-r from-teal-800 dark:from-teal-600 to-cyan-800 dark:to-cyan-600 text-slate-900 dark:text-white",
        "gradient-indigo":
          "bg-linear-to-r from-indigo-800 dark:from-indigo-600 to-purple-800 dark:to-purple-600 text-slate-900 dark:text-white",
        "gradient-pink": "bg-linear-to-r from-pink-800 dark:from-pink-600 to-rose-800 dark:to-rose-600 text-slate-900 dark:text-white",
        "gradient-orange":
          "bg-linear-to-r from-orange-800 dark:from-orange-600 to-red-800 dark:to-red-600 text-slate-900 dark:text-white",
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
      width: {
        fit: "min-w-75 md:min-w-fit",
        xs: "min-w-75 md:min-w-xs",
        sm: "min-w-75 md:min-w-sm",
        md: "min-w-75 md:min-w-md",
        lg: "min-w-75 md:min-w-lg",
        xl: "min-w-75 md:min-w-xl",
        "2xl": "min-w-75 md:min-w-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      width: "xs",
    },
  },
);
