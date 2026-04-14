import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden bg-slate-800 text-slate-200 ring-2 ring-slate-950",
  {
    variants: {
      size: {
        xs: "size-6 text-[0.65rem]",
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-14 text-lg",
        "2xl": "size-16 text-xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
        squircle: "rounded-2xl",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
);

export const avatarStatusVariants = cva(
  "pointer-events-none absolute z-10 rounded-full ring-2 ring-slate-950",
  {
    variants: {
      size: {
        xs: "bottom-0 right-0 size-1.5",
        sm: "bottom-0 right-0 size-2",
        md: "bottom-0.5 right-0.5 size-2.5",
        lg: "bottom-0.5 right-0.5 size-3",
        xl: "bottom-1 right-1 size-3.5",
        "2xl": "bottom-1 right-1 size-4",
      },
      status: {
        online: "bg-emerald-500",
        offline: "bg-slate-500",
        busy: "bg-amber-500",
        away: "bg-sky-500",
        none: "hidden",
      },
    },
    defaultVariants: {
      size: "md",
      status: "none",
    },
  },
);

export const avatarGroupVariants = cva("flex items-center", {
  variants: {
    spacing: {
      tight: "-space-x-2",
      normal: "-space-x-3",
      loose: "-space-x-1",
    },
  },
  defaultVariants: { spacing: "normal" },
});
