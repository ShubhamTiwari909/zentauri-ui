import { cva } from "class-variance-authority";

export const tableVariants = cva(
  "w-full table-auto border-collapse caption-bottom text-sm text-slate-700 dark:text-slate-200 md:table-fixed",
  {
    variants: {
      appearance: {
        default: "",
        striped: "",
        bordered: "border border-black/10 dark:border-white/10",
        ghost: "",
        sky: "border border-sky-800 dark:border-sky-600",
        rose: "border border-rose-800 dark:border-rose-600",
        purple: "border border-purple-800 dark:border-purple-600",
        pink: "border border-pink-800 dark:border-pink-600",
        orange: "border border-orange-800 dark:border-orange-600",
        yellow: "border border-yellow-800 dark:border-yellow-600",
        teal: "border border-teal-800 dark:border-teal-600",
        indigo: "border border-indigo-800 dark:border-indigo-600",
        emerald: "border border-emerald-800 dark:border-emerald-600",
        gray: "border border-gray-800 dark:border-gray-600",
        amber: "border border-amber-800 dark:border-amber-600",
        violet: "border border-violet-800 dark:border-violet-600",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      stickyHeader: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
      stickyHeader: false,
    },
  },
);

export const tableRowVariants = cva(
  "border-b border-black/5 dark:border-white/5 transition-colors data-[state=selected]:bg-black/[0.06] dark:bg-white/[0.06]",
  {
    variants: {
      appearance: {
        default: "",
        striped: "odd:bg-black/[0.03] dark:bg-white/[0.03]",
        bordered: "",
        ghost: "border-transparent hover:bg-black/[0.03] dark:bg-white/[0.03]",
        sky: "border-sky-800 dark:border-sky-600 hover:bg-sky-800 dark:hover:bg-sky-600 hover:text-sky-100",
        rose: "border-rose-800 dark:border-rose-600 hover:bg-rose-500 dark:hover:bg-rose-900 hover:text-rose-100",
        purple:
          "border-purple-800 dark:border-purple-600 hover:bg-purple-500 dark:hover:bg-purple-900 hover:text-purple-100",
        pink: "border-pink-800 dark:border-pink-600 hover:bg-pink-500 dark:hover:bg-pink-900 hover:text-pink-100",
        orange:
          "border-orange-800 dark:border-orange-600 hover:bg-orange-500 dark:hover:bg-orange-900 hover:text-orange-100",
        yellow:
          "border-yellow-800 dark:border-yellow-600 hover:bg-yellow-500 dark:hover:bg-yellow-900 hover:text-yellow-100",
        teal: "border-teal-800 dark:border-teal-600 hover:bg-teal-500 dark:hover:bg-teal-900 hover:text-teal-100",
        indigo:
          "border-indigo-800 dark:border-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-900 hover:text-indigo-100",
        emerald:
          "border-emerald-800 dark:border-emerald-600 hover:bg-emerald-500 dark:hover:bg-emerald-900 hover:text-emerald-100",
        gray: "border-gray-800 dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-900 hover:text-gray-100",
        amber:
          "border-amber-800 dark:border-amber-600 hover:bg-amber-500 dark:hover:bg-amber-900 hover:text-amber-100",
        violet:
          "border-violet-800 dark:border-violet-600 hover:bg-violet-500 dark:hover:bg-violet-900 hover:text-violet-100",
      },
    },
    defaultVariants: { appearance: "default" },
  },
);

export const tableCellVariants = cva(
  "min-w-0 border p-3 align-middle break-words",
  {
    variants: {
      appearance: {
        default: "border-black/10 dark:border-white/10",
        striped: "border-black/10 dark:border-white/10",
        bordered: "border-black/10 dark:border-white/10",
        ghost: "border-black/10 dark:border-white/10",
        sky: "border-sky-800 dark:border-sky-600",
        rose: "border-rose-800 dark:border-rose-600",
        purple: "border-purple-800 dark:border-purple-600",
        pink: "border-pink-800 dark:border-pink-600",
        orange: "border-orange-800 dark:border-orange-600",
        yellow: "border-yellow-800 dark:border-yellow-600",
        teal: "border-teal-800 dark:border-teal-600",
        indigo: "border-indigo-800 dark:border-indigo-600",
        emerald: "border-emerald-800 dark:border-emerald-600",
        gray: "border-gray-800 dark:border-gray-600",
        amber: "border-amber-800 dark:border-amber-600",
        violet: "border-violet-800 dark:border-violet-600",
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
      },
      textAlign: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: { appearance: "default", size: "md" },
  },
);
