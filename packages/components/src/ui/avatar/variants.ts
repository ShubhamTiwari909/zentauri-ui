import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-200",
  {
    variants: {
      appearance: {
        default: "border-black/10 dark:border-white/10 bg-black/10 dark:bg-white/10 text-slate-700 dark:text-slate-200",
        muted:
          "border-black/40 bg-slate-50 dark:border-white/10 dark:bg-slate-950/40 text-slate-700 dark:text-slate-200",
        sky: "border-sky-800 dark:border-sky-600 bg-sky-100/50 dark:bg-sky-600/[0.03] text-slate-700 dark:text-slate-200",
        rose: "border-rose-800 dark:border-rose-600 bg-rose-100/50 dark:bg-rose-600/[0.03] text-slate-700 dark:text-slate-200",
        purple: "border-purple-800 dark:border-purple-600 bg-purple-100/50 dark:bg-purple-600/[0.03] text-slate-700 dark:text-slate-200",
        pink: "border-pink-800 dark:border-pink-600 bg-pink-100/50 dark:bg-pink-600/[0.03] text-slate-700 dark:text-slate-200",
        orange: "border-orange-800 dark:border-orange-600 bg-orange-100/50 dark:bg-orange-600/[0.03] text-slate-700 dark:text-slate-200",
        yellow: "border-yellow-800 dark:border-yellow-600 bg-yellow-100/50 dark:bg-yellow-600/[0.03] text-slate-700 dark:text-slate-200",
        teal: "border-teal-800 dark:border-teal-600 bg-teal-100/50 dark:bg-teal-600/[0.03] text-slate-700 dark:text-slate-200",
        indigo: "border-indigo-800 dark:border-indigo-600 bg-indigo-100/50 dark:bg-indigo-600/[0.03] text-slate-700 dark:text-slate-200",
        emerald: "border-emerald-800 dark:border-emerald-600 bg-emerald-100/50 dark:bg-emerald-600/[0.03] text-slate-700 dark:text-slate-200",
        gray: "border-gray-800 dark:border-gray-600 bg-gray-100/50 dark:bg-gray-600/[0.03] text-slate-700 dark:text-slate-200",
        amber: "border-amber-800 dark:border-amber-600 bg-amber-100/50 dark:bg-amber-600/[0.03] text-slate-700 dark:text-slate-200",
        violet: "border-violet-800 dark:border-violet-600 bg-violet-100/50 dark:bg-violet-600/[0.03] text-slate-700 dark:text-slate-200",
        "gradient-blue":
          "bg-linear-to-r from-blue-500 dark:from-blue-600 to-purple-500 dark:to-purple-600 backdrop-blur-xl text-slate-700 dark:text-slate-200",
        "gradient-green":
          "bg-linear-to-r from-green-500 dark:from-green-600 to-lime-500 dark:to-lime-600 backdrop-blur-xl text-slate-700 dark:text-slate-200",
        "gradient-red":
          "bg-linear-to-r from-red-500 dark:from-red-600 to-pink-500 dark:to-pink-600 backdrop-blur-xl text-slate-700 dark:text-slate-200",
        "gradient-yellow":
          "bg-linear-to-r from-yellow-500 dark:from-yellow-600 to-orange-500 dark:to-orange-600 backdrop-blur-xl text-slate-700 dark:text-slate-200",
        "gradient-purple":
          "bg-linear-to-r from-purple-500 dark:from-purple-600 to-pink-500 dark:to-pink-600 backdrop-blur-xl text-slate-700 dark:text-slate-200",
        "gradient-teal":
          "bg-linear-to-r from-teal-500 dark:from-teal-600 to-cyan-500 dark:to-cyan-600 backdrop-blur-xl text-slate-700 dark:text-slate-200",
        "gradient-indigo":
          "bg-linear-to-r from-indigo-500 dark:from-indigo-600 to-purple-500 dark:to-purple-600 backdrop-blur-xl text-slate-700 dark:text-slate-200",
        "gradient-pink":
          "bg-linear-to-r from-pink-500 dark:from-pink-600 to-rose-500 dark:to-rose-600 backdrop-blur-xl text-slate-700 dark:text-slate-200",
        "gradient-orange":
          "bg-linear-to-r from-orange-500 dark:from-orange-600 to-red-500 dark:to-red-600 backdrop-blur-xl text-slate-700 dark:text-slate-200",
      },
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  },
);

export const avatarImageVariants = cva("aspect-square size-full object-cover");

export const avatarFallbackVariants = cva(
  "flex size-full items-center justify-center bg-slate-200 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-100",
);

export const avatarGroupVariants = cva(
  "flex items-center [&_[data-slot=avatar]]:-ml-2 [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-white dark:[&_[data-slot=avatar]]:ring-slate-950 [&_[data-slot=avatar]]:first:ml-0",
);
