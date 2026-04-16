import { cva } from "class-variance-authority";

export const toastViewportVariants = cva("fixed z-[60] flex max-h-screen flex-col gap-2 p-4", {
  variants: {
    position: {
      "top-left": "left-0 top-0 items-start",
      "top-center": "left-1/2 top-0 -translate-x-1/2 items-center",
      "top-right": "right-0 top-0 items-end",
      "bottom-left": "bottom-0 left-0 items-start",
      "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
      "bottom-right": "bottom-0 right-0 items-end",
    },
  },
  defaultVariants: {
    position: "bottom-right",
  },
});

export const toastRootVariants = cva(
  "pointer-events-auto w-[min(100vw-2rem,380px)] rounded-xl border border-white/10 bg-slate-950 p-4 text-slate-50 shadow-[0_18px_48px_rgba(15,23,42,0.45)]",
  {
    variants: {
      appearance: {
        default: "bg-slate-950",
        success: "border-emerald-500/40 bg-emerald-950",
        warning: "border-amber-500/40 bg-amber-950",
        error: "border-rose-500/50 bg-rose-950",
        info: "border-sky-500/40 bg-sky-950",
        ghost: "border-transparent bg-transparent text-slate-200",
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
        "gradient-blue": "border-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-green": "border-gradient-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl",
        "gradient-red": "border-gradient-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow": "border-gradient-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl",
        "gradient-purple": "border-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-teal": "border-gradient-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo": "border-gradient-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-pink": "border-gradient-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl",
        "gradient-orange": "border-gradient-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl",
      },
      size: {
        sm: "p-3 text-xs",
        md: "p-4 text-sm",
        lg: "p-5 text-base",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
    },
  },
);
