import { cva } from "class-variance-authority";

/**
 * Tailwind class maps mirroring `buttons/variants.ts` appearance tokens.
 * Reused by primitives that should stay visually aligned with Button.
 */
export const buttonLikeSolidAppearances = {
  default:
    "bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.08)] dark:shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
  secondary: "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50",
  destructive: "bg-rose-500 dark:bg-rose-700 text-slate-900 dark:text-white",
  outline:
    "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-900 dark:text-slate-50",
  ghost: "bg-transparent text-slate-700 dark:text-slate-200",
  glass:
    "border border-black/15 dark:border-white/15 bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white backdrop-blur-md",
  emerald: "bg-emerald-500 dark:bg-emerald-800 text-slate-100 dark:text-white",
  indigo: "bg-indigo-800 dark:bg-indigo-600 text-slate-100 dark:text-white",
  purple: "bg-purple-800 dark:bg-purple-600 text-slate-100 dark:text-white",
  pink: "bg-pink-800 dark:bg-pink-600 text-slate-100 dark:text-white",
  rose: "bg-rose-500 dark:bg-rose-700 text-slate-100 dark:text-white",
  sky: "bg-sky-500 dark:bg-sky-700 text-slate-100 dark:text-white",
  teal: "bg-teal-500 dark:bg-teal-700 text-slate-100 dark:text-white",
  yellow: "bg-yellow-500 dark:bg-yellow-800 text-slate-100 dark:text-white",
  orange: "bg-orange-500 dark:bg-orange-800 text-slate-100 dark:text-white",
  "gradient-blue":
    "bg-linear-to-r from-blue-800 dark:from-blue-600 to-purple-800 dark:to-purple-600 text-slate-100 dark:text-white",
  "gradient-green":
    "bg-linear-to-r from-green-800 dark:from-green-600 to-lime-800 dark:to-lime-600 text-slate-100 dark:text-white",
  "gradient-red":
    "bg-linear-to-r from-red-800 dark:from-red-600 to-pink-800 dark:to-pink-600 text-slate-100 dark:text-white",
  "gradient-yellow":
    "bg-linear-to-r from-yellow-800 dark:from-yellow-600 to-orange-800 dark:to-orange-600 text-slate-100 dark:text-white",
  "gradient-purple":
    "bg-linear-to-r from-purple-800 dark:from-purple-600 to-pink-800 dark:to-pink-600 text-slate-100 dark:text-white",
  "gradient-teal":
    "bg-linear-to-r from-teal-800 dark:from-teal-600 to-cyan-800 dark:to-cyan-600 text-slate-100 dark:text-white",
  "gradient-indigo":
    "bg-linear-to-r from-indigo-800 dark:from-indigo-600 to-purple-800 dark:to-purple-600 text-slate-100 dark:text-white",
  "gradient-pink":
    "bg-linear-to-r from-pink-800 dark:from-pink-600 to-rose-800 dark:to-rose-600 text-slate-100 dark:text-white",
  "gradient-orange":
    "bg-linear-to-r from-orange-800 dark:from-orange-600 to-red-800 dark:to-red-600 text-slate-100 dark:text-white",
} as const;

export type ButtonLikeSolidAppearance = keyof typeof buttonLikeSolidAppearances;

const badgeAppearances = {
  ...buttonLikeSolidAppearances,
  outline:
    "border border-black/15 dark:border-white/15 bg-transparent text-slate-700 dark:text-slate-200 shadow-none",
  ghost: "bg-transparent text-slate-600 dark:text-slate-300 shadow-none",
} as const;

export const badgeVariants = cva(
  [
    "inline-flex max-w-full items-center justify-center gap-1 font-medium",
    "whitespace-nowrap ring-offset-slate-50 dark:ring-offset-slate-950 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2",
    "select-none",
  ],
  {
    variants: {
      appearance: badgeAppearances,
      size: {
        sm: "h-6 min-h-6 px-2 text-[0.65rem] leading-none",
        md: "h-7 min-h-7 px-2.5 text-xs leading-none",
        lg: "h-8 min-h-8 px-3 text-sm leading-none",
      },
      shape: {
        pill: "rounded-full",
        square: "rounded-md",
        dot: "h-2.5 min-h-2.5 w-2.5 min-w-2.5 rounded-full p-0 px-0 text-[0]",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
      shape: "pill",
    },
  },
);

export const badgeCloseButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md p-0.5 text-current transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: { size: "md" },
  },
);
