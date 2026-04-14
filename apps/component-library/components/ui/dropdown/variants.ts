import { cva } from "class-variance-authority";

export const triggerVariants = cva(
  "inline-flex items-center justify-between rounded-md font-medium transition focus:outline-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white",
        outline: "border border-gray-300",
        ghost: "bg-transparent",
        white: "bg-white text-gray-900",
        black: "bg-black text-white",
        sky: "border border-sky-600 text-sky-600",
        rose: "border border-rose-600 text-rose-600",
        purple: "border border-purple-600 text-purple-600",
        pink: "border border-pink-600 text-pink-600",
        orange: "border border-orange-600 text-orange-600",
        yellow: "border border-yellow-600 text-yellow-600",
        teal: "border border-teal-600 text-teal-600",
        indigo: "border border-indigo-600 text-indigo-600",
        emerald: "border border-emerald-600 text-emerald-600",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2 text-base",
        lg: "px-4 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const contentVariants = cva(
  "absolute min-w-[200px] rounded-md shadow-md z-50 border",
  {
    variants: {
      placement: {
        top: "bottom-full mb-2",
        bottom: "top-full mt-2",
        left: "right-full mr-2",
        right: "left-full ml-2",
      },
    },
    defaultVariants: {
      placement: "bottom",
    },
  }
);

export const itemVariants = cva(
  "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-gray-100 hover:text-gray-900 text-gray-100",
        destructive: "hover:bg-red-100 text-rose-600",
        outline: "hover:bg-gray-100 hover:text-gray-900 bg-white text-gray-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);