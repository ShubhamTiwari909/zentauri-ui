import { cva } from "class-variance-authority";

export const skeletonVariants = cva(
  "relative overflow-hidden bg-white/10 text-transparent",
  {
    variants: {
      appearance: {
        default: "bg-white/10",
        subtle: "bg-white/[0.07]",
        muted: "bg-slate-800/80",
      },
      size: {
        sm: "min-h-3",
        md: "min-h-4",
        lg: "min-h-6",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
      rounded: "md",
    },
  },
);

export const skeletonTextLineVariants = cva("block w-full", {
  variants: {
    size: {
      sm: "h-2.5",
      md: "h-3",
      lg: "h-4",
    },
  },
  defaultVariants: { size: "md" },
});
