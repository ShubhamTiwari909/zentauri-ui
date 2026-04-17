import { cva } from "class-variance-authority";

export const accordionVariants = cva("w-full", {
  variants: {
    appearance: {
      default: "divide-y divide-white/10 rounded-xl border border-white/10",
      outline: "divide-y divide-white/10 rounded-xl border border-white/15",
      ghost: "divide-y divide-white/5",
      card: "space-y-2",
      separated: "space-y-3",
      sky: "divide-y divide-sky-600 rounded-xl border border-sky-600",
      rose: "divide-y divide-rose-600 rounded-xl border border-rose-600",
      purple: "divide-y divide-purple-600 rounded-xl border border-purple-600",
      pink: "divide-y divide-pink-600 rounded-xl border border-pink-600",
      orange: "divide-y divide-orange-600 rounded-xl border border-orange-600",
      yellow: "divide-y divide-yellow-600 rounded-xl border border-yellow-600",
      teal: "divide-y divide-teal-600 rounded-xl border border-teal-600",
      indigo: "divide-y divide-indigo-600 rounded-xl border border-indigo-600",
      emerald:
        "divide-y divide-emerald-600 rounded-xl border border-emerald-600",
      "gradient-blue":
        "divide-y divide-gradient-to-r from-blue-600 to-purple-600 rounded-xl border border-gradient-to-r from-blue-600 to-purple-600",
      "gradient-green":
        "divide-y divide-gradient-to-r from-green-600 to-lime-600 rounded-xl border border-gradient-to-r from-green-600 to-lime-600",
      "gradient-red":
        "divide-y divide-gradient-to-r from-red-600 to-pink-600 rounded-xl border border-gradient-to-r from-red-600 to-pink-600",
      "gradient-yellow":
        "divide-y divide-gradient-to-r from-yellow-600 to-orange-600 rounded-xl border border-gradient-to-r from-yellow-600 to-orange-600",
      "gradient-purple":
        "divide-y divide-gradient-to-r from-purple-600 to-pink-600 rounded-xl border border-gradient-to-r from-purple-600 to-pink-600",
      "gradient-teal":
        "divide-y divide-gradient-to-r from-teal-600 to-cyan-600 rounded-xl border border-gradient-to-r from-teal-600 to-cyan-600",
      "gradient-indigo":
        "divide-y divide-gradient-to-r from-indigo-600 to-purple-600 rounded-xl border border-gradient-to-r from-indigo-600 to-purple-600",
      "gradient-pink":
        "divide-y divide-gradient-to-r from-pink-600 to-rose-600 rounded-xl border border-gradient-to-r from-pink-600 to-rose-600",
      "gradient-orange":
        "divide-y divide-gradient-to-r from-orange-600 to-red-600 rounded-xl border border-gradient-to-r from-orange-600 to-red-600",
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

export const accordionItemVariants = cva("", {
  variants: {
    appearance: {
      default: "",
      outline: "",
      ghost: "",
      card: "rounded-xl border border-white/10 bg-white/[0.03] p-2",
      separated: "rounded-xl border border-white/10 bg-slate-950/40 p-2",
      sky: "rounded-xl border border-sky-600 bg-sky-600/[0.03] p-2",
      rose: "rounded-xl border border-rose-600 bg-rose-600/[0.03] p-2",
      purple: "rounded-xl border border-purple-600 bg-purple-600/[0.03] p-2",
      pink: "rounded-xl border border-pink-600 bg-pink-600/[0.03] p-2",
      orange: "rounded-xl border border-orange-600 bg-orange-600/[0.03] p-2",
      yellow: "rounded-xl border border-yellow-600 bg-yellow-600/[0.03] p-2",
      teal: "rounded-xl border border-teal-600 bg-teal-600/[0.03] p-2",
      indigo: "rounded-xl border border-indigo-600 bg-indigo-600/[0.03] p-2",
      emerald: "rounded-xl border border-emerald-600 bg-emerald-600/[0.03] p-2",
      "gradient-blue":
        "rounded-xl bg-linear-to-r from-blue-600 to-purple-600/[0.03] p-2 text-white",
      "gradient-green":
        "rounded-xl bg-linear-to-r from-green-600 to-lime-600/[0.03] p-2 text-white",
      "gradient-red":
        "rounded-xl bg-linear-to-r from-red-600 to-pink-600/[0.03] p-2 text-white",
      "gradient-yellow":
        "rounded-xl bg-linear-to-r from-yellow-600 to-orange-600/[0.03] p-2 text-white",
      "gradient-purple":
        "rounded-xl bg-linear-to-r from-purple-600 to-pink-600/[0.03] p-2 text-white",
      "gradient-teal":
        "rounded-xl bg-linear-to-r from-teal-600 to-cyan-600/[0.03] p-2 text-white",
      "gradient-indigo":
        "rounded-xl bg-linear-to-r from-indigo-600 to-purple-600/[0.03] p-2 text-white",
      "gradient-pink":
        "rounded-xl bg-linear-to-r from-pink-600 to-rose-600/[0.03] p-2 text-white",
      "gradient-orange":
        "rounded-xl bg-linear-to-r from-orange-600 to-red-600/[0.03] p-2 text-white",
    },
  },
  defaultVariants: { appearance: "default" },
});

export const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between gap-3 py-3 text-left font-medium text-slate-50 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/30",
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
