import { cva } from "class-variance-authority";

export const accordionVariants = cva("w-full", {
  variants: {
    appearance: {
      default: "divide-y divide-black/10 dark:divide-white/10 rounded-xl border border-black/10 dark:border-white/10",
      outline: "divide-y divide-black/10 dark:divide-white/10 rounded-xl border border-black/15 dark:border-white/15",
      ghost: "divide-y divide-black/5 dark:divide-white/5",
      card: "space-y-2",
      separated: "space-y-3",
      sky: "divide-y divide-sky-800 dark:divide-sky-600 rounded-xl border border-sky-800 dark:border-sky-600",
      rose: "divide-y divide-rose-800 dark:divide-rose-600 rounded-xl border border-rose-800 dark:border-rose-600",
      purple: "divide-y divide-purple-800 dark:divide-purple-600 rounded-xl border border-purple-800 dark:border-purple-600",
      pink: "divide-y divide-pink-800 dark:divide-pink-600 rounded-xl border border-pink-800 dark:border-pink-600",
      orange: "divide-y divide-orange-800 dark:divide-orange-600 rounded-xl border border-orange-800 dark:border-orange-600",
      yellow: "divide-y divide-yellow-800 dark:divide-yellow-600 rounded-xl border border-yellow-800 dark:border-yellow-600",
      teal: "divide-y divide-teal-800 dark:divide-teal-600 rounded-xl border border-teal-800 dark:border-teal-600",
      indigo: "divide-y divide-indigo-800 dark:divide-indigo-600 rounded-xl border border-indigo-800 dark:border-indigo-600",
      emerald:
        "divide-y divide-emerald-800 dark:divide-emerald-600 rounded-xl border border-emerald-800 dark:border-emerald-600",
      "gradient-blue":
        "divide-y divide-blue-800 dark:divide-blue-600 rounded-xl border border-blue-800 dark:border-blue-600",
      "gradient-green":
        "divide-y divide-green-800 dark:divide-green-600 rounded-xl border border-green-800 dark:border-green-600",
      "gradient-red":
        "divide-y divide-red-800 dark:divide-red-600 rounded-xl border border-red-800 dark:border-red-600",
      "gradient-yellow":
        "divide-y divide-yellow-800 dark:divide-yellow-600 rounded-xl border border-yellow-800 dark:border-yellow-600",
      "gradient-purple":
        "divide-y divide-purple-800 dark:divide-purple-600 rounded-xl border border-purple-800 dark:border-purple-600",
      "gradient-teal":
        "divide-y divide-teal-800 dark:divide-teal-600 rounded-xl border border-teal-800 dark:border-teal-600",
      "gradient-indigo":
        "divide-y divide-indigo-800 dark:divide-indigo-600 rounded-xl border border-indigo-800 dark:border-indigo-600",
      "gradient-pink":
        "divide-y divide-pink-800 dark:divide-pink-600 rounded-xl border border-pink-800 dark:border-pink-600",
      "gradient-orange":
        "divide-y divide-orange-800 dark:divide-orange-600 rounded-xl border border-orange-800 dark:border-orange-600",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-sm",
      lg: "px-5 py-4 text-base",
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const accordionItemVariants = cva("text-slate-900 dark:text-slate-200", {
  variants: {
    appearance: {
      default: "",
      outline: "",
      ghost: "",
      card: "rounded-xl border border-black/10 bg-black/5 p-2",
      separated: "rounded-xl border border-black/10 dark:border-white/10 bg-slate-50/40 dark:bg-slate-950/40 p-2",
      sky: "rounded-xl border border-sky-800 dark:border-sky-600 bg-sky-100/50 dark:bg-sky-600/[0.03] p-2",
      rose: "rounded-xl border border-rose-800 dark:border-rose-600 bg-rose-100/50 dark:bg-rose-600/[0.03] p-2",
      purple: "rounded-xl border border-purple-800 dark:border-purple-600 bg-purple-100/50 dark:bg-purple-600/[0.03] p-2",
      pink: "rounded-xl border border-pink-800 dark:border-pink-600 bg-pink-100/50 dark:bg-pink-600/[0.03] p-2",
      orange: "rounded-xl border border-orange-800 dark:border-orange-600 bg-orange-100/50 dark:bg-orange-600/[0.03] p-2",
      yellow: "rounded-xl border border-yellow-800 dark:border-yellow-600 bg-yellow-100/50 dark:bg-yellow-600/[0.03] p-2",
      teal: "rounded-xl border border-teal-800 dark:border-teal-600 bg-teal-100/50 dark:bg-teal-600/[0.03] p-2",
      indigo: "rounded-xl border border-indigo-800 dark:border-indigo-600 bg-indigo-100/50 dark:bg-indigo-600/[0.03] p-2",
      emerald: "rounded-xl border border-emerald-800 dark:border-emerald-600 bg-emerald-100/50 dark:bg-emerald-600/[0.03] p-2",
      "gradient-blue":
        "rounded-xl bg-linear-to-r from-blue-300 dark:from-blue-600 to-purple-300 dark:to-purple-600 p-2",
      "gradient-green":
        "rounded-xl bg-linear-to-r from-green-300 dark:from-green-600 to-lime-300 dark:to-lime-600 p-2",
      "gradient-red":
      "rounded-xl bg-linear-to-r from-red-300 dark:from-red-600 to-pink-300 dark:to-pink-600 p-2",
      "gradient-yellow":
        "rounded-xl bg-linear-to-r from-yellow-300 dark:from-yellow-600 to-orange-300 dark:to-orange-600 p-2",
      "gradient-purple":
        "rounded-xl bg-linear-to-r from-purple-300 dark:from-purple-600 to-pink-300 dark:to-pink-600 p-2",
      "gradient-teal":
        "rounded-xl bg-linear-to-r from-teal-300 dark:from-teal-600 to-cyan-300 dark:to-cyan-600 p-2",
      "gradient-indigo":
        "rounded-xl bg-linear-to-r from-indigo-300 dark:from-indigo-600 to-purple-300 dark:to-purple-600 p-2",
      "gradient-pink":
        "rounded-xl bg-linear-to-r from-pink-300 dark:from-pink-600 to-rose-300 dark:to-rose-600 p-2",
      "gradient-orange":
        "rounded-xl bg-linear-to-r from-orange-300 dark:from-orange-600 to-red-300 dark:to-red-600 p-2",
    },
  },
  defaultVariants: { appearance: "default" },
});

export const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between gap-3 py-3 text-left font-medium text-slate-800 dark:text-slate-200 outline-none transition hover:text-slate-900 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-black/30 dark:focus-visible:ring-white/30",
  {
    variants: {
      size: {
        sm: "py-2 text-sm",
        md: "py-3 text-sm",
        lg: "py-4 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const accordionContentVariants = cva("pb-3 text-sm", {
  variants: {
    size: {
      sm: "pb-2 text-xs",
      md: "pb-3 text-sm",
      lg: "pb-4 text-base",
    },
  },
  defaultVariants: { size: "md" },
});
