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

export const cardTitleVariants = cva("font-semibold tracking-tight text-slate-50", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: { size: "md" },
});

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
