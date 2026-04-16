import { cva } from "class-variance-authority";

/**
 * Layout and chrome for the page list cluster. Appearance and size keys align with
 * `components/ui/buttons/variants.ts` for consistent design-system tokens.
 */
export const paginationListVariants = cva(
  "inline-flex flex-wrap items-center rounded-xl border p-1 ring-offset-slate-950",
  {
    variants: {
      appearance: {
        default: "border-white/10 bg-white/[0.03]",
        secondary: "border-white/10 bg-slate-900/40",
        destructive: "border-rose-500/25 bg-rose-950/20",
        outline: "border-white/15 bg-transparent",
        ghost: "border-transparent bg-transparent",
        link: "border-transparent bg-transparent",
        glass: "border-white/15 bg-white/5 backdrop-blur-md",
        emerald: "border-emerald-500/25 bg-emerald-950/20",
        indigo: "border-indigo-500/25 bg-indigo-950/20",
        purple: "border-purple-500/25 bg-purple-950/20",
        pink: "border-pink-500/25 bg-pink-950/20",
        rose: "border-rose-500/25 bg-rose-950/20",
        sky: "border-sky-500/25 bg-sky-950/20",
        teal: "border-teal-500/25 bg-teal-950/20",
        yellow: "border-yellow-500/25 bg-yellow-950/20",
        orange: "border-orange-500/25 bg-orange-950/20",
        gray: "border-gray-500/25 bg-gray-950/20",
        amber: "border-amber-500/25 bg-amber-950/20",
        violet: "border-violet-500/25 bg-violet-950/20",
        "gradient-blue": "border-blue-500/30 bg-gradient-to-r from-blue-950/30 to-purple-950/30",
        "gradient-green": "border-lime-500/30 bg-gradient-to-r from-green-950/30 to-lime-950/30",
        "gradient-red": "border-pink-500/30 bg-gradient-to-r from-red-950/30 to-pink-950/30",
        "gradient-yellow":
          "border-orange-500/30 bg-gradient-to-r from-yellow-950/30 to-orange-950/30",
        "gradient-purple":
          "border-pink-500/30 bg-gradient-to-r from-purple-950/30 to-pink-950/30",
        "gradient-teal": "border-cyan-500/30 bg-gradient-to-r from-teal-950/30 to-cyan-950/30",
        "gradient-indigo":
          "border-purple-500/30 bg-gradient-to-r from-indigo-950/30 to-purple-950/30",
        "gradient-pink": "border-rose-500/30 bg-gradient-to-r from-pink-950/30 to-rose-950/30",
        "gradient-orange": "border-orange-500/30 bg-gradient-to-r from-orange-950/30 to-red-950/30",
      },
      size: {
        sm: "gap-0.5",
        md: "gap-1",
        lg: "gap-1",
        xl: "gap-1.5",
        "2xl": "gap-1.5",
        "3xl": "gap-2",
        "4xl": "gap-2",
        "5xl": "gap-2",
        "6xl": "gap-2",
        "7xl": "gap-2.5",
        "8xl": "gap-2.5",
        "9xl": "gap-2.5",
        "10xl": "gap-3",
        icon: "gap-1",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
    },
  },
);

export const paginationEllipsisVariants = cva(
  "inline-flex min-w-[2ch] select-none items-center justify-center px-1 font-medium text-slate-400",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-base",
        "2xl": "text-lg",
        "3xl": "text-lg",
        "4xl": "text-xl",
        "5xl": "text-xl",
        "6xl": "text-xl",
        "7xl": "text-2xl",
        "8xl": "text-2xl",
        "9xl": "text-2xl",
        "10xl": "text-2xl",
        icon: "text-sm",
      },
    },
    defaultVariants: { size: "md" },
  },
);
