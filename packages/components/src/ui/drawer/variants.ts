import { cva } from "class-variance-authority";

export const drawerOverlayVariants = cva("fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm");

export const drawerContentVariants = cva(
  "fixed z-50 flex max-h-[min(92vh,900px)] flex-col border border-white/10 bg-slate-950 p-6 text-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.55)] focus:outline-none",
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
