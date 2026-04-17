import { cva } from "class-variance-authority";

export const sliderRootVariants = cva("w-full select-none touch-none", {
  variants: {
    size: {
      sm: "py-2",
      md: "py-2.5",
      lg: "py-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const sliderTrackVariants = cva(
  "relative h-2 w-full shrink-0 overflow-hidden rounded-full bg-white/10",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2",
        lg: "h-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const sliderRangeVariants = cva(
  "absolute h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400",
  {
    variants: {
      appearance: {
        default: "from-violet-500 to-indigo-400",
        sky: "from-sky-500 to-indigo-400",
        rose: "from-rose-500 to-indigo-400",
        purple: "from-purple-500 to-indigo-400",
        pink: "from-pink-500 to-indigo-400",
        orange: "from-orange-500 to-indigo-400",
        yellow: "from-yellow-500 to-indigo-400",
        teal: "from-teal-500 to-indigo-400",
        indigo: "from-indigo-500 to-indigo-400",
        emerald: "from-emerald-500 to-teal-400",
        amber: "from-amber-500 to-orange-400",
        gray: "from-gray-500 to-indigo-400",
        violet: "from-violet-500 to-indigo-400",
        "gradient-blue": "from-blue-500 to-indigo-400",
        "gradient-green": "from-green-500 to-indigo-400",
        "gradient-red": "from-red-500 to-indigo-400",
        "gradient-yellow": "from-yellow-500 to-indigo-400",
        "gradient-purple": "from-purple-500 to-indigo-400",
        "gradient-teal": "from-teal-500 to-indigo-400",
        "gradient-indigo": "from-indigo-500 to-indigo-400",
        "gradient-pink": "from-pink-500 to-indigo-400",
        "gradient-orange": "from-orange-500 to-indigo-400",
      },
    },
    defaultVariants: {
      appearance: "default",
    },
  },
);

export const sliderThumbVariants = cva(
  "block size-4 rounded-full border border-white/20 bg-white shadow-md ring-offset-2 ring-offset-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
