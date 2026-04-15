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
        gray: "border border-gray-600 text-gray-600",
        amber: "border border-amber-600 text-amber-600",
        violet: "border border-violet-600 text-violet-600",
        "gradient-blue": "border border-gradient-to-r from-blue-600 to-purple-600 text-gradient-to-r from-blue-600 to-purple-600",
        "gradient-green": "border border-gradient-to-r from-green-600 to-lime-600 text-gradient-to-r from-green-600 to-lime-600",
        "gradient-red": "border border-gradient-to-r from-red-600 to-pink-600 text-gradient-to-r from-red-600 to-pink-600",
        "gradient-yellow": "border border-gradient-to-r from-yellow-600 to-orange-600 text-gradient-to-r from-yellow-600 to-orange-600",
        "gradient-purple": "border border-gradient-to-r from-purple-600 to-pink-600 text-gradient-to-r from-purple-600 to-pink-600",
        "gradient-teal": "border border-gradient-to-r from-teal-600 to-cyan-600 text-gradient-to-r from-teal-600 to-cyan-600",
        "gradient-indigo": "border border-gradient-to-r from-indigo-600 to-purple-600 text-gradient-to-r from-indigo-600 to-purple-600",
        "gradient-pink": "border border-gradient-to-r from-pink-600 to-rose-600 text-gradient-to-r from-pink-600 to-rose-600",
        "gradient-orange": "border border-gradient-to-r from-orange-600 to-red-600 text-gradient-to-r from-orange-600 to-red-600",
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
      spacing:{
        none: "space-y-0",
        default: "space-y-1",
        sm: "space-y-2",
        md: "space-y-3",
        lg: "space-y-4",
        xl: "space-y-5",
      }
    },
    defaultVariants: {
      placement: "bottom",
      spacing: "default",
    },
  }
);

export const itemVariants = cva(
  "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-gray-100 hover:text-gray-900 text-gray-100",
        outline: "hover:bg-gray-100 hover:text-gray-900 bg-white text-gray-900",
        ghost: "hover:bg-gray-100 hover:text-gray-900 bg-transparent text-gray-900",
        white: "hover:bg-gray-100 hover:text-gray-900 bg-white text-gray-900",
        black: "hover:bg-gray-100 hover:text-gray-900 bg-black text-white",
        sky: "hover:bg-sky-100 hover:text-sky-600 bg-sky-200 text-sky-800",
        rose: "hover:bg-rose-100 hover:text-rose-600 bg-rose-200 text-rose-800",
        purple: "hover:bg-purple-100 hover:text-purple-600 bg-purple-200 text-purple-800",
        pink: "hover:bg-pink-100 hover:text-pink-600 bg-pink-200 text-pink-800",
        orange: "hover:bg-orange-100 hover:text-orange-600 bg-orange-200 text-orange-800",
        yellow: "hover:bg-yellow-100 hover:text-yellow-600 bg-yellow-200 text-yellow-800",
        teal: "hover:bg-teal-100 hover:text-teal-600 bg-teal-200 text-teal-800",
        indigo: "hover:bg-indigo-100 hover:text-indigo-600 bg-indigo-200 text-indigo-800",
        emerald: "hover:bg-emerald-100 hover:text-emerald-600 bg-emerald-200 text-emerald-800",
        gray: "hover:bg-gray-100 hover:text-gray-900 bg-gray-200 text-gray-800",
        amber: "hover:bg-amber-100 hover:text-amber-600 bg-amber-200 text-amber-800",
        violet: "hover:bg-violet-100 hover:text-violet-600 bg-violet-200 text-violet-800",
        "gradient-blue": "hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:text-blue-900 bg-gradient-to-r from-blue-200 to-purple-200 text-blue-800",
        "gradient-green": "hover:bg-gradient-to-r from-green-600 to-lime-600 hover:text-green-900 bg-gradient-to-r from-green-200 to-lime-200 text-green-800",
        "gradient-red": "hover:bg-gradient-to-r from-red-600 to-pink-600 hover:text-red-900 bg-gradient-to-r from-red-200 to-pink-200 text-red-800",
        "gradient-yellow": "hover:bg-gradient-to-r from-yellow-600 to-orange-600 hover:text-yellow-900 bg-gradient-to-r from-yellow-200 to-orange-200 text-yellow-800",
        "gradient-purple": "hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-purple-900 bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800",
        "gradient-teal": "hover:bg-gradient-to-r from-teal-600 to-cyan-600 hover:text-teal-900 bg-gradient-to-r from-teal-200 to-cyan-200 text-teal-800",
        "gradient-indigo": "hover:bg-gradient-to-r from-indigo-600 to-purple-600 hover:text-indigo-900 bg-gradient-to-r from-indigo-200 to-purple-200 text-indigo-800",
        "gradient-pink": "hover:bg-gradient-to-r from-pink-600 to-rose-600 hover:text-pink-900 bg-gradient-to-r from-pink-200 to-rose-200 text-pink-800",
        "gradient-orange": "hover:bg-gradient-to-r from-orange-600 to-red-600 hover:text-orange-900 bg-gradient-to-r from-orange-200 to-red-200 text-orange-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);