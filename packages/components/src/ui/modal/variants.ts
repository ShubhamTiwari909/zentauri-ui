import { cva } from "class-variance-authority";

export const modalOverlayVariants = cva(
  "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm data-[state=open]:animate-in",
);

export const modalTriggerVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-md border",
  {
    variants: {
      appearance: {
        default: "bg-slate-950",
        glass: "border-white/15 bg-slate-950/70 backdrop-blur-xl",
        sky: "border-sky-600 bg-sky-950/70 backdrop-blur-xl",
        rose: "border-rose-600 bg-rose-950/70 backdrop-blur-xl",
        purple: "border-purple-600 bg-purple-950/70 backdrop-blur-xl",
        pink: "border-pink-600 bg-pink-950/70 backdrop-blur-xl",
        orange: "border-orange-600 bg-orange-950/70 backdrop-blur-xl",
        yellow: "border-yellow-600 bg-yellow-950/70 backdrop-blur-xl",
        teal: "border-teal-600 bg-teal-950/70 backdrop-blur-xl",
        indigo: "border-indigo-600 bg-indigo-950/70 backdrop-blur-xl",
        emerald: "border-emerald-600 bg-emerald-950/70 backdrop-blur-xl",
        gray: "border-gray-600 bg-gray-950/70 backdrop-blur-xl",
        amber: "border-amber-600 bg-amber-950/70 backdrop-blur-xl",
        violet: "border-violet-600 bg-violet-950/70 backdrop-blur-xl",
        "gradient-blue":
          "border-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-green":
          "border-gradient-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl",
        "gradient-red":
          "border-gradient-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow":
          "border-gradient-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl",
        "gradient-purple":
          "border-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-teal":
          "border-gradient-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo":
          "border-gradient-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-pink":
          "border-gradient-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl",
        "gradient-orange":
          "border-gradient-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl",
      },
    },
    defaultVariants: {
      appearance: "default",
    },
  },
);

export const modalContentVariants = cva(
  "fixed left-1/2 z-50 w-[calc(100%-2rem)] max-h-[min(90vh,720px)] translate-x-[-50%] overflow-y-auto border border-white/10 bg-slate-950 p-6 text-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.55)] focus:outline-none",
  {
    variants: {
      size: {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[calc(100%-2rem)]",
      },
      position: {
        center: "top-1/2 translate-y-[-50%]",
        top: "top-10 translate-y-0",
        bottom: "bottom-10 translate-y-0",
      },
      appearance: {
        default: "bg-slate-950",
        glass: "border-white/15 bg-slate-950/70 backdrop-blur-xl",
        sky: "border-sky-600 bg-sky-950/70 backdrop-blur-xl",
        rose: "border-rose-600 bg-rose-950/70 backdrop-blur-xl",
        purple: "border-purple-600 bg-purple-950/70 backdrop-blur-xl",
        pink: "border-pink-600 bg-pink-950/70 backdrop-blur-xl",
        orange: "border-orange-600 bg-orange-950/70 backdrop-blur-xl",
        yellow: "border-yellow-600 bg-yellow-950/70 backdrop-blur-xl",
        teal: "border-teal-600 bg-teal-950/70 backdrop-blur-xl",
        indigo: "border-indigo-600 bg-indigo-950/70 backdrop-blur-xl",
        emerald: "border-emerald-600 bg-emerald-950/70 backdrop-blur-xl",
        gray: "border-gray-600 bg-gray-950/70 backdrop-blur-xl",
        amber: "border-amber-600 bg-amber-950/70 backdrop-blur-xl",
        violet: "border-violet-600 bg-violet-950/70 backdrop-blur-xl",
        "gradient-blue":
          "border-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-green":
          "border-gradient-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl",
        "gradient-red":
          "border-gradient-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow":
          "border-gradient-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl",
        "gradient-purple":
          "border-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-teal":
          "border-gradient-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo":
          "border-gradient-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-pink":
          "border-gradient-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl",
        "gradient-orange":
          "border-gradient-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl",
      },
    },
    defaultVariants: {
      size: "md",
      position: "center",
      appearance: "default",
    },
  },
);
