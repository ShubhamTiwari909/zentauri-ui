import { cva } from "class-variance-authority";

export const tableVariants = cva(
  "w-full table-auto border-collapse caption-bottom text-sm text-slate-200 md:table-fixed",
  {
  variants: {
    appearance: {
      default: "",
      striped: "",
      bordered: "border border-white/10",
      ghost: "",
      sky:'border border-sky-600',
      rose:'border border-rose-600',
      purple:'border border-purple-600',
      pink:'border border-pink-600',
      orange:'border border-orange-600',
      yellow:'border border-yellow-600',
      teal:'border border-teal-600',
      indigo:'border border-indigo-600',
      emerald:'border border-emerald-600',
      gray:'border border-gray-600',
      amber:'border border-amber-600',
      violet:'border border-violet-600',
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
  "border-b border-white/5 transition-colors data-[state=selected]:bg-white/[0.06]",
  {
    variants: {
      appearance: {
        default: "",
        striped: "odd:bg-white/[0.03]",
        bordered: "",
        ghost: "border-transparent hover:bg-white/[0.03]",
        sky:'border-sky-600 hover:bg-sky-600',
        rose:'border-rose-600 hover:bg-rose-900',
        purple:'border-purple-600 hover:bg-purple-900',
        pink:'border-pink-600 hover:bg-pink-900',
        orange:'border-orange-600 hover:bg-orange-900',
        yellow:'border-yellow-600 hover:bg-yellow-900',
        teal:'border-teal-600 hover:bg-teal-900',
        indigo:'border-indigo-600 hover:bg-indigo-900',
        emerald:'border-emerald-600 hover:bg-emerald-900',
        gray:'border-gray-600 hover:bg-gray-900',
        amber:'border-amber-600 hover:bg-amber-900',
        violet:'border-violet-600 hover:bg-violet-900',
      },
    },
    defaultVariants: { appearance: "default" },
  },
);

export const tableCellVariants = cva("min-w-0 border p-3 align-middle break-words", {
  variants: {
    appearance: {
      default: "border-white/10",
      striped: "border-white/10",
      bordered: "border-white/10",
      ghost: "border-white/10",
      sky: "border-sky-600",
      rose: "border-rose-600",
      purple: "border-purple-600",
      pink: "border-pink-600",
      orange: "border-orange-600",
      yellow: "border-yellow-600",
      teal: "border-teal-600",
      indigo: "border-indigo-600",
      emerald: "border-emerald-600",
      gray: "border-gray-600",
      amber: "border-amber-600",
      violet: "border-violet-600",
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
});
