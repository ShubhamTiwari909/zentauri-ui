import { cva } from "class-variance-authority";

export const cardVariants = cva(
  [
    "relative flex w-full flex-col overflow-hidden text-slate-50",
    "ring-offset-slate-950 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      appearance: {
        default:
          "border border-white/10 bg-white/5 shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
        glass:
          "border border-white/15 bg-white/10 backdrop-blur-md shadow-[0_18px_48px_rgba(15,23,42,0.35)]",
        outline: "border border-white/15 bg-transparent",
        ghost: "border border-transparent bg-transparent",
        elevated:
          "border border-white/10 bg-slate-900/80 shadow-[0_24px_64px_rgba(15,23,42,0.45)]",
        sky: "border border-sky-600 bg-sky-950/70 backdrop-blur-xl",
        rose: "border border-rose-600 bg-rose-950/70 backdrop-blur-xl",
        purple: "border border-purple-600 bg-purple-950/70 backdrop-blur-xl",
        pink: "border border-pink-600 bg-pink-950/70 backdrop-blur-xl",
        orange: "border border-orange-600 bg-orange-950/70 backdrop-blur-xl",
        yellow: "border border-yellow-600 bg-yellow-950/70 backdrop-blur-xl",
        teal: "border border-teal-600 bg-teal-950/70 backdrop-blur-xl",
        indigo: "border border-indigo-600 bg-indigo-950/70 backdrop-blur-xl",
        emerald: "border border-emerald-600 bg-emerald-950/70 backdrop-blur-xl",
        gray: "border border-gray-600 bg-gray-950/70 backdrop-blur-xl",
        amber: "border border-amber-600 bg-amber-950/70 backdrop-blur-xl",
        violet: "border border-violet-600 bg-violet-950/70 backdrop-blur-xl",
        "gradient-blue":
          "border border-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-green":
          "border border-gradient-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl",
        "gradient-red":
          "border border-gradient-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow":
          "border border-gradient-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl",
        "gradient-purple":
          "border border-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-teal":
          "border border-gradient-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo":
          "border border-gradient-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-pink":
          "border border-gradient-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl",
        "gradient-orange":
          "border border-gradient-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl",
      },
      size: {
        sm: "gap-2 p-3 text-sm",
        md: "gap-3 p-4 text-sm",
        lg: "gap-4 p-6 text-base",
      },
      rounded: {
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-3xl",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
      rounded: "md",
    },
  },
);

export const cardHeaderVariants = cva(
  "flex flex-col gap-1 border-b border-white/10 pb-3",
  {
    variants: {
      size: {
        sm: "pb-2",
        md: "pb-3",
        lg: "pb-4",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const cardFooterVariants = cva(
  "flex flex-col gap-2 border-t border-white/10 pt-3",
  {
    variants: {
      size: {
        sm: "pt-2",
        md: "pt-3",
        lg: "pt-4",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const cardTitleVariants = cva(
  "font-semibold tracking-tight text-slate-50",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const cardDescriptionVariants = cva("text-slate-400", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "md" },
});
