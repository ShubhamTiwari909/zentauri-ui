import { cva } from "class-variance-authority";

export const progressVariants = cva("w-full text-slate-50", {
  variants: {
    appearance: {
      default: "[--progress-fill:theme(colors.slate.50)]",
      secondary: "[--progress-fill:theme(colors.slate.300)]",
      destructive: "[--progress-fill:theme(colors.rose.400)]",
      emerald: "[--progress-fill:theme(colors.emerald.400)]",
      indigo: "[--progress-fill:theme(colors.indigo.400)]",
      purple: "[--progress-fill:theme(colors.purple.400)]",
      pink: "[--progress-fill:theme(colors.pink.400)]",
      rose: "[--progress-fill:theme(colors.rose.400)]",
      sky: "[--progress-fill:theme(colors.sky.400)]",
      teal: "[--progress-fill:theme(colors.teal.400)]",
      yellow: "[--progress-fill:theme(colors.yellow.400)]",
      orange: "[--progress-fill:theme(colors.orange.400)]",
      outline: "[--progress-fill:theme(colors.cyan.300)]",
      ghost: "[--progress-fill:theme(colors.slate.200)]",
      glass: "[--progress-fill:theme(colors.white)]",
      "gradient-blue":
        "[--progress-fill:linear-gradient(90deg,theme(colors.blue.500),theme(colors.purple.500))]",
      "gradient-green":
        "[--progress-fill:linear-gradient(90deg,theme(colors.green.500),theme(colors.lime.500))]",
      "gradient-red":
        "[--progress-fill:linear-gradient(90deg,theme(colors.red.500),theme(colors.pink.500))]",
      "gradient-yellow":
        "[--progress-fill:linear-gradient(90deg,theme(colors.yellow.500),theme(colors.orange.500))]",
      "gradient-purple":
        "[--progress-fill:linear-gradient(90deg,theme(colors.purple.500),theme(colors.pink.500))]",
      "gradient-teal":
        "[--progress-fill:linear-gradient(90deg,theme(colors.teal.500),theme(colors.cyan.500))]",
      "gradient-indigo":
        "[--progress-fill:linear-gradient(90deg,theme(colors.indigo.500),theme(colors.purple.500))]",
      "gradient-pink":
        "[--progress-fill:linear-gradient(90deg,theme(colors.pink.500),theme(colors.rose.500))]",
    },
    size: {
      xs: "text-[0.65rem]",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
    shape: {
      flat: "rounded-none",
      rounded: "rounded-md",
      pill: "rounded-full",
    },
    striped: {
      true: "",
      false: "",
    },
    animated: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
    shape: "rounded",
    striped: false,
    animated: false,
  },
});

export const progressTrackVariants = cva("relative w-full overflow-hidden bg-white/10", {
  variants: {
    size: {
      xs: "h-1",
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
      xl: "h-4",
    },
    shape: {
      flat: "rounded-none",
      rounded: "rounded-md",
      pill: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "rounded",
  },
});

export const progressBarVariants = cva(
  "h-full w-full origin-left rounded-[inherit]",
  {
    variants: {
      striped: {
        true: "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_10px,transparent_10px,transparent_20px)]",
        false: "bg-[var(--progress-fill)]",
      },
    },
    defaultVariants: { striped: false },
  },
);
