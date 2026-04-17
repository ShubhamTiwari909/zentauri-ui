import { cva } from "class-variance-authority";

export const tabsListVariants = cva("flex items-center gap-1", {
  variants: {
    variant: {
      default: "bg-transparent",
      underline: "border-b-2 border-transparent",
      pills: "rounded-md",
    },
    size: {
      sm: "text-sm p-1",
      md: "text-base p-1.5",
      lg: "text-lg p-2",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

export const tabsTriggerVariants = cva(
  "px-3 py-1.5 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-ring",
  {
    variants: {
      appearance: {
        default: "bg-transparent",
        sky: "bg-sky-500/75",
        rose: "bg-rose-500/75",
        purple: "bg-purple-500/75",
        pink: "bg-pink-500/75",
        orange: "bg-orange-500/75",
        yellow: "bg-yellow-500/75",
        teal: "bg-teal-500/75",
        indigo: "bg-indigo-500/75",
        emerald: "bg-emerald-500/75",
        gray: "bg-gray-500/75",
        "gradient-blue": "bg-gradient-to-r from-blue-600 to-purple-600",
        "gradient-green": "bg-gradient-to-r from-green-600 to-lime-600",
        "gradient-red": "bg-gradient-to-r from-red-600 to-pink-600",
        "gradient-yellow": "bg-gradient-to-r from-yellow-600 to-orange-600",
        "gradient-purple": "bg-gradient-to-r from-purple-600 to-pink-600",
        "gradient-teal": "bg-gradient-to-r from-teal-600 to-cyan-600",
        "gradient-indigo": "bg-gradient-to-r from-indigo-600 to-purple-600",
        "gradient-pink": "bg-gradient-to-r from-pink-600 to-rose-600",
        "gradient-orange": "bg-gradient-to-r from-orange-600 to-red-600",
      },
      variant: {
        default: "data-[state=active]:bg-background",
        underline:
          "border-b-2 border-transparent data-[state=active]:border-primary rounded-none",
        pills: "data-[state=active]:bg-primary data-[state=active]:text-white",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-1.5",
        lg: "px-4 py-2",
      },
    },
    defaultVariants: {
      appearance: "default",
      variant: "default",
      size: "md",
    },
  },
);
