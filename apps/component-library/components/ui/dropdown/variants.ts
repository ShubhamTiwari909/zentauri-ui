import { cva } from "class-variance-authority";

export const dropdownContentVariants = cva(
  "z-50 min-w-[12rem] overflow-hidden rounded-xl border border-white/10 bg-slate-950 p-1 text-sm text-slate-50 shadow-[0_18px_48px_rgba(15,23,42,0.45)]",
  {
    variants: {
      size: {
        sm: "min-w-[10rem] p-1 text-xs",
        md: "min-w-[12rem] p-1 text-sm",
        lg: "min-w-[14rem] p-1.5 text-base",
      },
      appearance: {
        default: "bg-slate-950",
        glass: "border-white/15 bg-slate-950/70 backdrop-blur-xl",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  },
);

export const dropdownItemVariants = cva(
  "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-slate-100 outline-none transition hover:bg-white/10 focus:bg-white/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
);

export const dropdownSeparatorVariants = cva("my-1 h-px bg-white/10");

export const dropdownLabelVariants = cva("px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400");
