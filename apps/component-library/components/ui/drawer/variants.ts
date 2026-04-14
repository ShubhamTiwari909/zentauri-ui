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
