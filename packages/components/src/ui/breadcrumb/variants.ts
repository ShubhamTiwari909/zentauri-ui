import { cva } from "class-variance-authority";

export const breadcrumbNavVariants = cva("text-sm", {
  variants: {
    appearance: {
      default: "text-slate-600 dark:text-slate-300",
      muted: "text-slate-500 dark:text-slate-400",
      sky: "text-sky-800 dark:text-sky-600",
      rose: "text-rose-800 dark:text-rose-600",
      purple: "text-purple-800 dark:text-purple-600",
      pink: "text-pink-800 dark:text-pink-600",
      orange: "text-orange-800 dark:text-orange-600",
      yellow: "text-yellow-800 dark:text-yellow-600",
      teal: "text-teal-800 dark:text-teal-600",
      indigo: "text-indigo-800 dark:text-indigo-600",
      emerald: "text-emerald-800 dark:text-emerald-600",
      gray: "text-gray-800 dark:text-gray-600",
      amber: "text-amber-800 dark:text-amber-600",
      violet: "text-violet-800 dark:text-violet-600",
    },
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const breadcrumbListVariants = cva(
  "flex flex-wrap items-center gap-1.5",
);

export const breadcrumbItemVariants = cva("inline-flex items-center gap-1.5");

export const breadcrumbLinkVariants = cva(
  "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950",
);

export const breadcrumbPageVariants = cva(
  "font-medium text-slate-800 dark:text-slate-100",
);

export const breadcrumbSeparatorVariants = cva(
  "select-none text-slate-400 dark:text-slate-600",
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
