import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl",
    "text-sm font-medium ring-offset-slate-950 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      appearance: {
        default:
          "bg-slate-50 text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.12)] hover:bg-white",
        secondary: "bg-slate-800 text-slate-50 hover:bg-slate-700",
        destructive: "bg-rose-600 text-white hover:bg-rose-600",
        outline:
          "border border-white/10 bg-white/5 text-slate-50 hover:bg-white/10",
        ghost: "bg-transparent text-slate-200 hover:bg-white/5",
        link: "bg-transparent text-cyan-300 underline-offset-4 hover:underline",
        glass:
          "border border-white/15 bg-white/10 text-white backdrop-blur-md hover:bg-white/15",
        emerald: "bg-emerald-600 text-white hover:bg-emerald-600",
        indigo: "bg-indigo-600 text-white hover:bg-indigo-600",
        purple: "bg-purple-600 text-white hover:bg-purple-600",
        pink: "bg-pink-600 text-white hover:bg-pink-600",
        rose: "bg-rose-600 text-white hover:bg-rose-600",
        sky: "bg-sky-600 text-white hover:bg-sky-600",
        teal: "bg-teal-600 text-white hover:bg-teal-600",
        yellow: "bg-yellow-600 text-white hover:bg-yellow-600",
        orange: "bg-orange-600 text-white hover:bg-orange-600",
        "gradient-blue": "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-600 hover:to-purple-600",
        "gradient-green": "bg-gradient-to-r from-green-600 to-lime-600 text-white hover:from-green-600 hover:to-lime-600",
        "gradient-red": "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-600 hover:to-pink-600",
        "gradient-yellow": "bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-600",
        "gradient-purple": "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-600 hover:to-pink-600",
        "gradient-teal": "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-600",
        "gradient-indigo": "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-600",
        "gradient-pink": "bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-600 hover:to-rose-600",
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
