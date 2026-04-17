import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/10 text-slate-200",
  {
    variants: {
      appearance: {
        default: "border-white/10 bg-white/10 text-slate-200",
        muted: "border-black/40 bg-slate-950 dark:border-white/10 dark:bg-slate-950/40 text-slate-200",
        sky: "border-sky-600 bg-sky-600/[0.03] text-slate-200",
        rose: "border-rose-600 bg-rose-600/[0.03] text-slate-200",
        purple: "border-purple-600 bg-purple-600/[0.03] text-slate-200",
        pink: "border-pink-600 bg-pink-600/[0.03] text-slate-200",
        orange: "border-orange-600 bg-orange-600/[0.03] text-slate-200",
        yellow: "border-yellow-600 bg-yellow-600/[0.03] text-slate-200",
        teal: "border-teal-600 bg-teal-600/[0.03] text-slate-200",
        indigo: "border-indigo-600 bg-indigo-600/[0.03] text-slate-200",
        emerald: "border-emerald-600 bg-emerald-600/[0.03] text-slate-200",
        gray: "border-gray-600 bg-gray-600/[0.03] text-slate-200",
        amber: "border-amber-600 bg-amber-600/[0.03] text-slate-200",
        violet: "border-violet-600 bg-violet-600/[0.03] text-slate-200",
        "gradient-blue": "border-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl text-slate-200",
        "gradient-green": "border-gradient-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl text-slate-200",
        "gradient-red": "border-gradient-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl text-slate-200",
        "gradient-yellow": "border-gradient-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl text-slate-200",
        "gradient-purple": "border-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl text-slate-200",
        "gradient-teal": "border-gradient-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl text-slate-200",
        "gradient-indigo": "border-gradient-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl text-slate-200",
        "gradient-pink": "border-gradient-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl text-slate-200",
        "gradient-orange": "border-gradient-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl text-slate-200",
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
  "flex size-full items-center justify-center bg-slate-800 font-medium text-slate-100",
);

export const avatarGroupVariants = cva("flex items-center [&_[data-slot=avatar]]:-ml-2 [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-slate-950 [&_[data-slot=avatar]]:first:ml-0");
