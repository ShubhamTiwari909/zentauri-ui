import { cva } from "class-variance-authority";

import { buttonLikeSolidAppearances } from "../shared/button-palette";

const badgeAppearances = {
  ...buttonLikeSolidAppearances,
  outline:
    "border border-white/15 bg-transparent text-slate-200 shadow-none",
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
