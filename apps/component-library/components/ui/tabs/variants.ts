import { cva } from "class-variance-authority";

export const tabsListVariants = cva(
  "inline-flex h-10 items-center justify-start gap-1 rounded-xl border border-white/10 bg-white/5 p-1 text-slate-300",
  {
    variants: {
      size: {
        sm: "h-8 gap-0.5 p-0.5 text-xs",
        md: "h-10 gap-1 p-1 text-sm",
        lg: "h-12 gap-1 p-1.5 text-base",
      },
      appearance: {
        default: "border-white/10 bg-white/5",
        pill: "rounded-full border-white/10 bg-white/5",
        underline: "h-auto gap-0 rounded-none border-0 border-b border-white/10 bg-transparent p-0",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  },
);

export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 outline-none transition focus-visible:ring-2 focus-visible:ring-slate-300 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm",
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
      appearance: {
        default: "",
        pill: "rounded-full data-[state=active]:rounded-full",
        underline:
          "rounded-none px-2 py-2 text-slate-400 data-[state=active]:bg-transparent data-[state=active]:text-cyan-300 data-[state=active]:shadow-none data-[state=active]:ring-0 border-b-2 border-transparent data-[state=active]:border-cyan-400",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  },
);

export const tabsContentVariants = cva(
  "mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
  {
    variants: {
      size: {
        sm: "mt-3 p-3 text-xs",
        md: "mt-4 p-4 text-sm",
        lg: "mt-5 p-5 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);
