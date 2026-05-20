import { cva } from "class-variance-authority";

export const cardVariants = cva(
  [
    "relative flex w-full flex-col overflow-hidden text-slate-900 dark:text-slate-50",
    "ring-offset-slate-50 dark:ring-offset-slate-950 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      appearance: {
        default:
          "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 shadow-[0_1px_2px_rgba(15,23,42,0.08)] dark:shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
        glass:
          "border border-black/15 dark:border-white/15 bg-black/10 dark:bg-white/10 backdrop-blur-md shadow-[0_8px_24px_rgba(15,23,42,0.12)] dark:shadow-[0_18px_48px_rgba(15,23,42,0.35)]",
        outline: "border border-black/15 dark:border-white/15 bg-transparent",
        ghost: "border border-transparent bg-transparent",
        elevated:
          "border border-black/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-900/80 shadow-[0_12px_32px_rgba(15,23,42,0.12)] dark:shadow-[0_24px_64px_rgba(15,23,42,0.45)]",
        sky: "border border-sky-800 dark:border-sky-600 bg-sky-50 dark:bg-sky-950/70 backdrop-blur-xl",
        rose: "border border-rose-800 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/70 backdrop-blur-xl",
        purple:
          "border border-purple-800 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/70 backdrop-blur-xl",
        pink: "border border-pink-800 dark:border-pink-600 bg-pink-50 dark:bg-pink-950/70 backdrop-blur-xl",
        orange:
          "border border-orange-800 dark:border-orange-600 bg-orange-50 dark:bg-orange-950/70 backdrop-blur-xl",
        yellow:
          "border border-yellow-800 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/70 backdrop-blur-xl",
        teal: "border border-teal-800 dark:border-teal-600 bg-teal-50 dark:bg-teal-950/70 backdrop-blur-xl",
        indigo:
          "border border-indigo-800 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 backdrop-blur-xl",
        emerald:
          "border border-emerald-800 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 backdrop-blur-xl",
        gray: "border border-gray-800 dark:border-gray-600 bg-gray-50 dark:bg-gray-950/70 backdrop-blur-xl",
        amber:
          "border border-amber-800 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/70 backdrop-blur-xl",
        violet:
          "border border-violet-800 dark:border-violet-600 bg-violet-50 dark:bg-violet-950/70 backdrop-blur-xl",
        "gradient-blue":
          "border border-blue-800 dark:border-blue-600 bg-linear-to-r from-blue-50 dark:from-blue-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl",
        "gradient-green":
          "border border-green-800 dark:border-green-600 bg-linear-to-r from-green-50 dark:from-green-950/70 to-lime-50 dark:to-lime-950/70 backdrop-blur-xl",
        "gradient-red":
          "border border-red-800 dark:border-red-600 bg-linear-to-r from-red-50 dark:from-red-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow":
          "border border-yellow-800 dark:border-yellow-600 bg-linear-to-r from-yellow-50 dark:from-yellow-950/70 to-orange-50 dark:to-orange-950/70 backdrop-blur-xl",
        "gradient-purple":
          "border border-purple-800 dark:border-purple-600 bg-linear-to-r from-purple-50 dark:from-purple-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl",
        "gradient-teal":
          "border border-teal-800 dark:border-teal-600 bg-linear-to-r from-teal-50 dark:from-teal-950/70 to-cyan-50 dark:to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo":
          "border border-indigo-800 dark:border-indigo-600 bg-linear-to-r from-indigo-50 dark:from-indigo-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl",
        "gradient-pink":
          "border border-pink-800 dark:border-pink-600 bg-linear-to-r from-pink-50 dark:from-pink-950/70 to-rose-50 dark:to-rose-950/70 backdrop-blur-xl",
        "gradient-orange":
          "border border-orange-800 dark:border-orange-600 bg-linear-to-r from-orange-50 dark:from-orange-950/70 to-red-50 dark:to-red-950/70 backdrop-blur-xl",
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
  "flex flex-col gap-1 border-b border-black/10 dark:border-white/10 pb-3",
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
  "flex flex-col gap-2 border-t border-black/10 dark:border-white/10 pt-3",
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
  "font-semibold tracking-tight text-slate-900 dark:text-slate-50",
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

export const cardDescriptionVariants = cva(
  "text-slate-500 dark:text-slate-400",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);
