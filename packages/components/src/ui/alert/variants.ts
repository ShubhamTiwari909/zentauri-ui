import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative flex w-full gap-3 border text-sm ring-offset-slate-950 transition-colors",
  {
    variants: {
      appearance: {
        default: "border-white/10 bg-white/5 text-slate-50",
        success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-50",
        warning: "border-amber-500/40 bg-amber-500/10 text-amber-50",
        error: "border-rose-500/50 bg-rose-500/10 text-rose-50",
        info: "border-sky-500/40 bg-sky-500/10 text-sky-50",
        ghost: "border-transparent bg-transparent text-slate-200",
        purple: "border-purple-600 bg-purple-950/70 backdrop-blur-xl",
        pink: "border-pink-600 bg-pink-950/70 backdrop-blur-xl",
        orange: "border-orange-600 bg-orange-950/70 backdrop-blur-xl",
        yellow: "border-yellow-600 bg-yellow-950/70 backdrop-blur-xl",
        teal: "border-teal-600 bg-teal-950/70 backdrop-blur-xl",
        indigo: "border-indigo-600 bg-indigo-950/70 backdrop-blur-xl",
        gray: "border-gray-600 bg-gray-950/70 backdrop-blur-xl",
        violet: "border-violet-600 bg-violet-950/70 backdrop-blur-xl",
        "gradient-blue":
          "border-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-green":
          "border-gradient-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl",
        "gradient-red":
          "border-gradient-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow":
          "border-gradient-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl",
        "gradient-purple":
          "border-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-teal":
          "border-gradient-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo":
          "border-gradient-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-pink":
          "border-gradient-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl",
        "gradient-orange":
          "border-gradient-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl",
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

export const alertDescriptionVariants = cva("text-slate-300", {
  variants: {
    size: {
      sm: "text-xs md:text-sm",
      md: "text-xs md:text-sm",
      lg: "text-xs md:text-sm",
    },
  },
  defaultVariants: { size: "md" },
});
