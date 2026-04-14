import { cva } from "class-variance-authority";

const spinnerAppearances = {
  default: "text-slate-50",
  secondary: "text-slate-300",
  destructive: "text-rose-400",
  outline: "border border-white/30 text-slate-200",
  ghost: "text-slate-300",
  glass: "border border-white/20 text-white",
  emerald: "text-emerald-400",
  indigo: "text-indigo-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
  rose: "text-rose-400",
  sky: "text-sky-400",
  teal: "text-teal-400",
  yellow: "text-yellow-400",
  orange: "text-orange-400",
  "gradient-blue": "text-blue-400",
  "gradient-green": "text-green-400",
  "gradient-red": "text-red-400",
  "gradient-yellow": "text-yellow-400",
  "gradient-purple": "text-purple-400",
  "gradient-teal": "text-teal-400",
  "gradient-indigo": "text-indigo-400",
  "gradient-pink": "text-pink-400",
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
