import { cva } from "class-variance-authority";

const spinnerAppearances = {
  default: "text-slate-900 dark:text-slate-50",
  secondary: "text-slate-600 dark:text-slate-300",
  destructive: "text-rose-600 dark:text-rose-400",
  ghost: "text-slate-600 dark:text-slate-300",
  emerald: "text-emerald-600 dark:text-emerald-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  purple: "text-purple-600 dark:text-purple-400",
  pink: "text-pink-600 dark:text-pink-400",
  rose: "text-rose-600 dark:text-rose-400",
  sky: "text-sky-600 dark:text-sky-400",
  teal: "text-teal-600 dark:text-teal-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  orange: "text-orange-600 dark:text-orange-400",
  "gradient-blue": "text-blue-600 dark:text-blue-400",
  "gradient-green": "text-green-600 dark:text-green-400",
  "gradient-red": "text-red-600 dark:text-red-400",
  "gradient-yellow": "text-yellow-600 dark:text-yellow-400",
  "gradient-purple": "text-purple-600 dark:text-purple-400",
  "gradient-teal": "text-teal-600 dark:text-teal-400",
  "gradient-indigo": "text-indigo-600 dark:text-indigo-400",
  "gradient-pink": "text-pink-600 dark:text-pink-400",
  "gradient-orange": "text-orange-600 dark:text-orange-400",
} as const;

export const spinnerVariants = cva("inline-flex items-center justify-center", {
  variants: {
    appearance: spinnerAppearances,
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-10",
    },
    variant: {
      ring: "",
      dots: "",
      pulse: "",
      bars: "",
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    variant: "ring",
  },
});
