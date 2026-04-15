import { cva } from "class-variance-authority";

const APPEARANCES = {
  default: "text-slate-200",
  muted: "text-slate-500",
  primary: "text-cyan-300",
  destructive: "text-rose-400",
  ghost: "text-slate-600",
  sky: "text-sky-400",
  rose: "text-rose-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
  orange: "text-orange-400",
  yellow: "text-yellow-400",
  teal: "text-teal-400",
  indigo: "text-indigo-400",
  emerald: "text-emerald-400",
  gray: "text-gray-400",
  amber: "text-amber-400",
  violet: "text-violet-400",
  "gradient-blue": "text-blue-400",
  "gradient-green": "text-green-400",
  "gradient-red": "text-red-400",
  "gradient-yellow": "text-yellow-400",
  "gradient-purple": "text-purple-400",
  "gradient-teal": "text-teal-400",
  "gradient-indigo": "text-indigo-400",
  "gradient-pink": "text-pink-400",
  "gradient-orange": "text-orange-400",
};

export const dividerToneVariants = cva("", {
  variants: {
    appearance: APPEARANCES,
  },
  defaultVariants: { appearance: "default" },
});

export const dividerVariants = cva("flex w-full items-center gap-3", {
  variants: {
    appearance: APPEARANCES,
    orientation: {
      horizontal: "w-full flex-row",
      vertical: "h-full min-h-[2rem] w-auto flex-col self-stretch",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", size: "sm", class: "min-h-px" },
    { orientation: "horizontal", size: "md", class: "min-h-[2px]" },
    { orientation: "horizontal", size: "lg", class: "min-h-[3px]" },
    { orientation: "vertical", size: "sm", class: "min-w-px" },
    { orientation: "vertical", size: "md", class: "min-w-[2px]" },
    { orientation: "vertical", size: "lg", class: "min-w-[3px]" },
  ],
  defaultVariants: {
    appearance: "default",
    orientation: "horizontal",
    size: "md",
  },
});

export const dividerLineVariants = cva(
  "shrink grow rounded-full bg-current opacity-80",
  {
    variants: {
      orientation: {
        horizontal: "h-px",
        vertical: "w-px flex-1",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      { orientation: "horizontal", size: "sm", class: "h-px" },
      { orientation: "horizontal", size: "md", class: "h-0.5" },
      { orientation: "horizontal", size: "lg", class: "h-1" },
      { orientation: "vertical", size: "sm", class: "w-px" },
      { orientation: "vertical", size: "md", class: "w-0.5" },
      { orientation: "vertical", size: "lg", class: "w-1" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
    },
  },
);

export const dividerLabelVariants = cva(
  "shrink-0 text-xs font-medium uppercase tracking-wide text-current",
);
