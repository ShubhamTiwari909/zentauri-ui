import { cva } from "class-variance-authority";

/**
 * Tailwind class maps mirroring `buttons/variants.ts` appearance tokens.
 * Reused by primitives that should stay visually aligned with Button.
 */
export const buttonLikeSolidAppearances = {
  default: "bg-slate-50 text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
  secondary: "bg-slate-800 text-slate-50",
  destructive: "bg-rose-700 text-white",
  outline: "border border-white/10 bg-white/5 text-slate-50",
  ghost: "bg-transparent text-slate-200",
  glass: "border border-white/15 bg-white/10 text-white backdrop-blur-md",
  emerald: "bg-emerald-800 text-white",
  indigo: "bg-indigo-600 text-white",
  purple: "bg-purple-600 text-white",
  pink: "bg-pink-600 text-white",
  rose: "bg-rose-700 text-white",
  sky: "bg-sky-700 text-white",
  teal: "bg-teal-700 text-white",
  yellow: "bg-yellow-800 text-white",
  orange: "bg-orange-800 text-white",
  "gradient-blue": "bg-linear-to-r from-blue-600 to-purple-600 text-white",
  "gradient-green": "bg-linear-to-r from-green-600 to-lime-600 text-white",
  "gradient-red": "bg-linear-to-r from-red-600 to-pink-600 text-white",
  "gradient-yellow": "bg-linear-to-r from-yellow-600 to-orange-600 text-white",
  "gradient-purple": "bg-linear-to-r from-purple-600 to-pink-600 text-white",
  "gradient-teal": "bg-linear-to-r from-teal-600 to-cyan-600 text-white",
  "gradient-indigo": "bg-linear-to-r from-indigo-600 to-purple-600 text-white",
  "gradient-pink": "bg-linear-to-r from-pink-600 to-rose-600 text-white",
  "gradient-orange": "bg-linear-to-r from-orange-600 to-red-600 text-white",
} as const;

export type ButtonLikeSolidAppearance = keyof typeof buttonLikeSolidAppearances;

const badgeAppearances = {
  ...buttonLikeSolidAppearances,
  outline: "border border-white/15 bg-transparent text-slate-200 shadow-none",
  ghost: "bg-transparent text-slate-300 shadow-none",
} as const;

export const badgeVariants = cva(
  [
    "inline-flex max-w-full items-center justify-center gap-1 font-medium",
    "whitespace-nowrap ring-offset-slate-950 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2",
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
  "inline-flex shrink-0 items-center justify-center rounded-md p-0.5 text-current opacity-70 transition hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
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
