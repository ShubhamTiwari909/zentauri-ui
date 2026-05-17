import { cva } from "class-variance-authority";

export const drawerOverlayVariants = cva(
  "fixed inset-0 z-50 bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-sm",
);

export const drawerTriggerVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-md border",
  {
    variants: {
      appearance: {
        default: "bg-slate-50 dark:bg-slate-950",
        glass: "border-black/15 dark:border-white/15 bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-xl",
        sky: "border-sky-800 dark:border-sky-600 bg-sky-50 dark:bg-sky-950/70 backdrop-blur-xl",
        rose: "border-rose-800 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/70 backdrop-blur-xl",
        purple: "border-purple-800 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/70 backdrop-blur-xl",
        pink: "border-pink-800 dark:border-pink-600 bg-pink-50 dark:bg-pink-950/70 backdrop-blur-xl",
        orange: "border-orange-800 dark:border-orange-600 bg-orange-50 dark:bg-orange-950/70 backdrop-blur-xl",
        yellow: "border-yellow-800 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/70 backdrop-blur-xl",
        teal: "border-teal-800 dark:border-teal-600 bg-teal-50 dark:bg-teal-950/70 backdrop-blur-xl",
        indigo: "border-indigo-800 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 backdrop-blur-xl",
        emerald: "border-emerald-800 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 backdrop-blur-xl",
        gray: "border-gray-800 dark:border-gray-600 bg-gray-50 dark:bg-gray-950/70 backdrop-blur-xl",
        amber: "border-amber-800 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/70 backdrop-blur-xl",
        violet: "border-violet-800 dark:border-violet-600 bg-violet-50 dark:bg-violet-950/70 backdrop-blur-xl",
        "gradient-blue":
          "border-blue-800 dark:border-blue-600 bg-linear-to-r from-blue-50 dark:from-blue-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl",
        "gradient-green":
          "border-green-800 dark:border-green-600 bg-linear-to-r from-green-50 dark:from-green-950/70 to-lime-50 dark:to-lime-950/70 backdrop-blur-xl",
        "gradient-red":
          "border-red-800 dark:border-red-600 bg-linear-to-r from-red-50 dark:from-red-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow":
          "border-yellow-800 dark:border-yellow-600 bg-linear-to-r from-yellow-50 dark:from-yellow-950/70 to-orange-50 dark:to-orange-950/70 backdrop-blur-xl",
        "gradient-purple":
          "border-purple-800 dark:border-purple-600 bg-linear-to-r from-purple-50 dark:from-purple-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl",
        "gradient-teal":
          "border-teal-800 dark:border-teal-600 bg-linear-to-r from-teal-50 dark:from-teal-950/70 to-cyan-50 dark:to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo":
          "border-indigo-800 dark:border-indigo-600 bg-linear-to-r from-indigo-50 dark:from-indigo-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl",
        "gradient-pink":
          "border-pink-800 dark:border-pink-600 bg-linear-to-r from-pink-50 dark:from-pink-950/70 to-rose-50 dark:to-rose-950/70 backdrop-blur-xl",
        "gradient-orange":
          "border-orange-800 dark:border-orange-600 bg-linear-to-r from-orange-50 dark:from-orange-950/70 to-red-50 dark:to-red-950/70 backdrop-blur-xl",
      },
    },
    defaultVariants: {
      appearance: "default",
    },
  },
);

export const drawerContentVariants = cva(
  "fixed z-50 flex max-h-[min(92vh,900px)] flex-col border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-950 p-6 text-slate-900 dark:text-slate-50 shadow-[0_12px_40px_rgba(15,23,42,0.14)] dark:shadow-[0_24px_80px_rgba(15,23,42,0.55)] focus:outline-none",
  {
    variants: {
      side: {
        left: "left-0 top-0 h-full w-[min(100%,420px)]",
        right: "right-0 top-0 h-full w-[min(100%,420px)]",
        top: "left-0 top-0 w-full max-h-[min(92vh,520px)]",
        bottom: "bottom-0 left-0 w-full max-h-[min(92vh,520px)]",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: "",
      },
      appearance: {
        default: "bg-slate-50 dark:bg-slate-950",
        glass: "border-black/15 dark:border-white/15 bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-xl",
        sky: "border-sky-800 dark:border-sky-600 bg-sky-50 dark:bg-sky-950/70 backdrop-blur-xl",
        rose: "border-rose-800 dark:border-rose-600 bg-rose-50 dark:bg-rose-950/70 backdrop-blur-xl",
        purple: "border-purple-800 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/70 backdrop-blur-xl",
        pink: "border-pink-800 dark:border-pink-600 bg-pink-50 dark:bg-pink-950/70 backdrop-blur-xl",
        orange: "border-orange-800 dark:border-orange-600 bg-orange-50 dark:bg-orange-950/70 backdrop-blur-xl",
        yellow: "border-yellow-800 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/70 backdrop-blur-xl",
        teal: "border-teal-800 dark:border-teal-600 bg-teal-50 dark:bg-teal-950/70 backdrop-blur-xl",
        indigo: "border-indigo-800 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 backdrop-blur-xl",
        emerald: "border-emerald-800 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 backdrop-blur-xl",
        gray: "border-gray-800 dark:border-gray-600 bg-gray-50 dark:bg-gray-950/70 backdrop-blur-xl",
        amber: "border-amber-800 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/70 backdrop-blur-xl",
        violet: "border-violet-800 dark:border-violet-600 bg-violet-50 dark:bg-violet-950/70 backdrop-blur-xl",
        "gradient-blue":
          "border-blue-800 dark:border-blue-600 bg-linear-to-r from-blue-50 dark:from-blue-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl",
        "gradient-green":
          "border-green-800 dark:border-green-600 bg-linear-to-r from-green-50 dark:from-green-950/70 to-lime-50 dark:to-lime-950/70 backdrop-blur-xl",
        "gradient-red":
          "border-red-800 dark:border-red-600 bg-linear-to-r from-red-50 dark:from-red-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow":
          "border-yellow-800 dark:border-yellow-600 bg-linear-to-r from-yellow-50 dark:from-yellow-950/70 to-orange-50 dark:to-orange-950/70 backdrop-blur-xl",
        "gradient-purple":
          "border-purple-800 dark:border-purple-600 bg-linear-to-r from-purple-50 dark:from-purple-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl",
        "gradient-teal":
          "border-teal-800 dark:border-teal-600 bg-linear-to-r from-teal-50 dark:from-teal-950/70 to-cyan-50 dark:to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo":
          "border-indigo-800 dark:border-indigo-600 bg-linear-to-r from-indigo-50 dark:from-indigo-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl",
        "gradient-pink":
          "border-pink-800 dark:border-pink-600 bg-linear-to-r from-pink-50 dark:from-pink-950/70 to-rose-50 dark:to-rose-950/70 backdrop-blur-xl",
        "gradient-orange":
          "border-orange-800 dark:border-orange-600 bg-linear-to-r from-orange-50 dark:from-orange-950/70 to-red-50 dark:to-red-950/70 backdrop-blur-xl",
      },
    },
    compoundVariants: [
      { side: "left", size: "sm", class: "w-[min(100%,320px)]" },
      { side: "left", size: "md", class: "w-[min(100%,420px)]" },
      { side: "left", size: "lg", class: "w-[min(100%,520px)]" },
      { side: "left", size: "xl", class: "w-[min(100%,640px)]" },
      { side: "left", size: "full", class: "w-full max-w-none" },
      { side: "right", size: "sm", class: "w-[min(100%,320px)]" },
      { side: "right", size: "md", class: "w-[min(100%,420px)]" },
      { side: "right", size: "lg", class: "w-[min(100%,520px)]" },
      { side: "right", size: "xl", class: "w-[min(100%,640px)]" },
      { side: "right", size: "full", class: "w-full max-w-none" },
    ],
    defaultVariants: {
      side: "right",
      size: "md",
      appearance: "default",
    },
  },
);
