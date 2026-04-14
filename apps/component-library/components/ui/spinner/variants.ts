import { cva } from "class-variance-authority";

import { buttonLikeSolidAppearances } from "../shared/button-palette";

const spinnerAppearances = {
  ...buttonLikeSolidAppearances,
  outline: "border-white/30 text-slate-200",
  ghost: "text-slate-300",
} as const;

export const spinnerVariants = cva("inline-flex items-center justify-center", {
  variants: {
    appearance: spinnerAppearances,
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-10",
    },
    variant: {
      ring: "",
      dots: "",
      pulse: "",
      bars: "",
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    variant: "ring",
  },
});
