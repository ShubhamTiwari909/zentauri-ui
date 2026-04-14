import { cva } from "class-variance-authority";

export const modalOverlayVariants = cva(
  "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm data-[state=open]:animate-in",
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
      },
    },
    defaultVariants: {
      size: "md",
      position: "center",
      appearance: "default",
    },
  },
);
