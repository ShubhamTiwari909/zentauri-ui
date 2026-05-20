import { cva } from "class-variance-authority";

export const tooltipVariants = cva(
  "absolute z-50 rounded-md shadow-md transition-all duration-200 pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-black text-slate-900 dark:text-white",
        outline: "border bg-black dark:bg-white text-white dark:text-black",
        ghost: "bg-gray-800 text-white/90",
        glass:
          "border border-black/15 dark:border-white/15 bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white backdrop-blur-md",
        emerald: "bg-emerald-800 text-white",
        indigo: "bg-indigo-800 text-white",
        purple: "bg-purple-800 text-white",
        pink: "bg-pink-800 text-white",
        rose: "bg-rose-800 text-white",
        sky: "bg-sky-700 text-white",
        teal: "bg-teal-800 text-white",
        yellow: "bg-yellow-800 text-white",
        orange: "bg-orange-800 text-white",
        green: "bg-green-800 text-white",
        "gradient-blue":
          "bg-linear-to-r from-blue-800 to-purple-800 text-white",
        "gradient-green":
          "bg-linear-to-r from-green-800 to-lime-800 text-white",
        "gradient-red": "bg-linear-to-r from-red-800 to-pink-800 text-white",
        "gradient-yellow":
          "bg-linear-to-r from-yellow-800 to-orange-800 text-white",
        "gradient-purple":
          "bg-linear-to-r from-purple-800 to-pink-800 text-white",
        "gradient-teal": "bg-linear-to-r from-teal-800 to-cyan-800 text-white",
        "gradient-indigo":
          "bg-linear-to-r from-indigo-800 to-purple-800 text-white",
        "gradient-pink": "bg-linear-to-r from-pink-800 to-rose-800 text-white",
        "gradient-orange":
          "bg-linear-to-r from-orange-800 to-red-800 text-white",
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
