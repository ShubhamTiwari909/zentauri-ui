import { cva } from "class-variance-authority";

export const breadcrumbNavVariants = cva(
  "text-sm",
  {
    variants: {
      appearance: {
        default: "text-slate-300",
        muted: "text-slate-400",
        sky: "text-sky-600",
        rose: "text-rose-600",
        purple: "text-purple-600",
        pink: "text-pink-600",
        orange: "text-orange-600",
        yellow: "text-yellow-600",
        teal: "text-teal-600",
        indigo: "text-indigo-600",
        emerald: "text-emerald-600",
        gray: "text-gray-600",
        amber: "text-amber-600",
        violet: "text-violet-600",
      },
    },
    defaultVariants: {
      appearance: "default",
    },
  }
);

export const breadcrumbListVariants = cva("flex flex-wrap items-center gap-1.5");

export const breadcrumbItemVariants = cva("inline-flex items-center gap-1.5");

export const breadcrumbLinkVariants = cva(
  "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
);

export const breadcrumbPageVariants = cva("font-medium text-slate-100");

export const breadcrumbSeparatorVariants = cva(
  "select-none text-slate-600",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
