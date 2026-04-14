import { cva } from "class-variance-authority";

export const tableVariants = cva("w-full caption-bottom text-sm text-slate-200", {
  variants: {
    appearance: {
      default: "",
      striped: "",
      bordered: "border border-white/10",
      ghost: "",
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
  compoundVariants: [
    {
      stickyHeader: true,
      class:
        "[&_thead>tr]:sticky [&_thead>tr]:top-0 [&_thead>tr]:z-10 [&_thead>tr]:bg-slate-950/95 [&_thead>tr]:backdrop-blur",
    },
  ],
  defaultVariants: {
    appearance: "default",
    size: "md",
    stickyHeader: false,
  },
});

export const tableRowVariants = cva(
  "border-b border-white/5 transition-colors hover:bg-white/[0.04] data-[state=selected]:bg-white/[0.06]",
  {
    variants: {
      appearance: {
        default: "",
        striped: "odd:bg-white/[0.03]",
        bordered: "",
        ghost: "border-transparent hover:bg-white/[0.03]",
      },
    },
    defaultVariants: { appearance: "default" },
  },
);

export const tableCellVariants = cva("p-3 align-middle", {
  variants: {
    size: {
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    },
  },
  defaultVariants: { size: "md" },
});
