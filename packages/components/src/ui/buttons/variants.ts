import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl",
    "text-sm font-medium ring-offset-slate-50 dark:ring-offset-slate-950 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      appearance: {
        default:
          "bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.08)] dark:shadow-[0_1px_2px_rgba(15,23,42,0.12)] hover:bg-black dark:hover:bg-white",
        secondary: "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50 hover:bg-slate-300 dark:hover:bg-slate-700",
        destructive: "bg-rose-500 dark:bg-rose-700 text-white hover:bg-rose-500 dark:hover:bg-rose-800",
        outline:
          "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-900 dark:text-slate-50 hover:bg-black/10 dark:hover:bg-white/10",
        ghost: "bg-transparent text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5",
        link: "bg-transparent text-cyan-700 dark:text-cyan-300 underline-offset-4 hover:underline",
        glass:
          "border border-black/15 dark:border-white/15 bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white backdrop-blur-md hover:bg-black/15 dark:hover:bg-white/15",
        emerald: "bg-emerald-500 dark:bg-emerald-800 text-white hover:bg-emerald-500 dark:hover:bg-emerald-900",
        indigo: "bg-indigo-800 dark:bg-indigo-600 text-white hover:bg-indigo-800 dark:hover:bg-indigo-600",
        purple: "bg-purple-800 dark:bg-purple-600 text-white hover:bg-purple-800 dark:hover:bg-purple-600",
        pink: "bg-pink-800 dark:bg-pink-600 text-white hover:bg-pink-800 dark:hover:bg-pink-600",
        rose: "bg-rose-800 dark:bg-rose-600 text-white hover:bg-rose-800 dark:hover:bg-rose-600",
        sky: "bg-sky-500 dark:bg-sky-700 text-white hover:bg-sky-500 dark:hover:bg-sky-800",
        teal: "bg-teal-500 dark:bg-teal-700 text-white hover:bg-teal-500 dark:hover:bg-teal-800",
        yellow: "bg-yellow-500 dark:bg-yellow-800 text-white hover:bg-yellow-500 dark:hover:bg-yellow-900",
        orange: "bg-orange-500 dark:bg-orange-800 text-white hover:bg-orange-500 dark:hover:bg-orange-900",
        gray: "bg-gray-500 dark:bg-gray-700 text-white hover:bg-gray-500 dark:hover:bg-gray-800",
        amber: "bg-amber-500 dark:bg-amber-800 text-white hover:bg-amber-500 dark:hover:bg-amber-900",
        violet: "bg-violet-800 dark:bg-violet-600 text-white hover:bg-violet-800 dark:hover:bg-violet-600",
        "gradient-blue":
          "bg-linear-to-r from-blue-800 dark:from-blue-600 to-purple-800 dark:to-purple-600 text-white hover:from-blue-800 dark:hover:from-blue-600 hover:to-purple-800 dark:hover:to-purple-600",
        "gradient-green":
          "bg-linear-to-r from-green-800 dark:from-green-600 to-lime-800 dark:to-lime-600 text-white hover:from-green-800 dark:hover:from-green-600 hover:to-lime-800 dark:hover:to-lime-600",
        "gradient-red":
          "bg-linear-to-r from-red-800 dark:from-red-600 to-pink-800 dark:to-pink-600 text-white hover:from-red-800 dark:hover:from-red-600 hover:to-pink-800 dark:hover:to-pink-600",
        "gradient-yellow":
          "bg-linear-to-r from-yellow-800 dark:from-yellow-600 to-orange-800 dark:to-orange-600 text-white hover:from-yellow-800 dark:hover:from-yellow-600 hover:to-orange-800 dark:hover:to-orange-600",
        "gradient-purple":
          "bg-linear-to-r from-purple-800 dark:from-purple-600 to-pink-800 dark:to-pink-600 text-white hover:from-purple-800 dark:hover:from-purple-600 hover:to-pink-800 dark:hover:to-pink-600",
        "gradient-teal":
          "bg-linear-to-r from-teal-800 dark:from-teal-600 to-cyan-800 dark:to-cyan-600 text-white hover:from-teal-800 dark:hover:from-teal-600 hover:to-cyan-800 dark:hover:to-cyan-600",
        "gradient-indigo":
          "bg-linear-to-r from-indigo-800 dark:from-indigo-600 to-purple-800 dark:to-purple-600 text-white hover:from-indigo-800 dark:hover:from-indigo-600 hover:to-purple-800 dark:hover:to-purple-600",
        "gradient-pink":
          "bg-linear-to-r from-pink-800 dark:from-pink-600 to-rose-800 dark:to-rose-600 text-white hover:from-pink-800 dark:hover:from-pink-600 hover:to-rose-800 dark:hover:to-rose-600",
        "gradient-orange":
          "bg-linear-to-r from-orange-800 dark:from-orange-600 to-red-800 dark:to-red-600 text-white hover:from-orange-800 dark:hover:from-orange-600 hover:to-red-800 dark:hover:to-red-600",
      },
      size: {
        sm: "h-7 md:h-9 px-3 text-xs",
        md: "h-9 md:h-11 px-4",
        lg: "h-10 md:h-12 px-5 text-base",
        xl: "h-12 md:h-14 px-6 text-lg",
        "2xl": "h-14 md:h-16 px-6 md:px-8 text-xl",
        "3xl": "h-16 md:h-18 px-8 md:px-10 text-2xl",
        "4xl": "h-18 md:h-20 px-10 md:px-12 text-2xl",
        "5xl": "h-20 md:h-22 px-12 md:px-14 text-2xl",
        "6xl": "h-22 md:h-24 px-14 md:px-16 text-2xl",
        "7xl": "h-24 md:h-26 px-16 md:px-18 text-2xl",
        "8xl": "h-26 md:h-28 px-20 text-2xl",
        "9xl": "h-24 md:h-30 px-18 md:px-22 text-2xl",
        "10xl": "h-26 md:h-32 px-20 md:px-24 text-2xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
    },
  },
);
