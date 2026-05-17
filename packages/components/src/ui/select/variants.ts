import { cva } from "class-variance-authority";

export const selectTriggerVariants = cva(
  "flex items-center justify-between rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-gray-700 dark:border-gray-300 bg-black dark:bg-white text-gray-500 dark:text-gray-900",
        outline: "border-2 border-gray-500",
        ghost: "border-transparent",
        sky: "border-sky-800 dark:border-sky-600 text-sky-800 dark:text-sky-600",
        rose: "border-rose-800 dark:border-rose-600 text-rose-800 dark:text-rose-600",
        purple: "border-purple-800 dark:border-purple-600 text-purple-800 dark:text-purple-600",
        pink: "border-pink-800 dark:border-pink-600 text-pink-800 dark:text-pink-600",
        orange: "border-orange-800 dark:border-orange-600 text-orange-800 dark:text-orange-600",
        yellow: "border-yellow-800 dark:border-yellow-600 text-yellow-800 dark:text-yellow-600",
        teal: "border-teal-800 dark:border-teal-600 text-teal-800 dark:text-teal-600",
        indigo: "border-indigo-500 text-indigo-500",
        emerald: "border-emerald-800 dark:border-emerald-600 text-emerald-800 dark:text-emerald-600",
        glass: "border-black/15 dark:border-white/15 bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white backdrop-blur-md",
        "gradient-blue":
          "bg-linear-to-r from-blue-800 dark:from-blue-600 to-purple-800 dark:to-purple-600 backdrop-blur-xl text-slate-900 dark:text-white",
        "gradient-green":
          "bg-linear-to-r from-green-800 dark:from-green-600 to-lime-800 dark:to-lime-600 backdrop-blur-xl text-slate-900 dark:text-white",
        "gradient-red":
          "bg-linear-to-r from-red-800 dark:from-red-600 to-pink-800 dark:to-pink-600 backdrop-blur-xl text-slate-900 dark:text-white",
        "gradient-yellow":
          "bg-linear-to-r from-yellow-800 dark:from-yellow-600 to-orange-800 dark:to-orange-600 backdrop-blur-xl text-slate-900 dark:text-white",
        "gradient-purple":
          "bg-linear-to-r from-purple-800 dark:from-purple-600 to-pink-800 dark:to-pink-600 backdrop-blur-xl text-slate-900 dark:text-white",
        "gradient-teal":
          "bg-linear-to-r from-teal-800 dark:from-teal-600 to-cyan-800 dark:to-cyan-600 backdrop-blur-xl text-slate-900 dark:text-white",
        "gradient-indigo":
          "bg-linear-to-r from-indigo-800 dark:from-indigo-600 to-purple-800 dark:to-purple-600 backdrop-blur-xl text-slate-900 dark:text-white",
        "gradient-pink":
          "bg-linear-to-r from-pink-800 dark:from-pink-600 to-rose-800 dark:to-rose-600 backdrop-blur-xl text-slate-900 dark:text-white",
        "gradient-orange":
          "bg-linear-to-r from-orange-800 dark:from-orange-600 to-red-800 dark:to-red-600 backdrop-blur-xl text-slate-900 dark:text-white",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2",
        lg: "px-4 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const selectItemVariants = cva(
  "cursor-pointer px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 dark:focus-visible:ring-gray-400 focus-visible:ring-inset",
  {
    variants: {
      appearance: {
        default:
          "bg-black dark:bg-white text-gray-500 dark:text-gray-900 data-[selected=true]:bg-gray-200 data-[selected=true]:text-gray-500 dark:data-[selected=true]:text-gray-900",
        glass:
          "bg-black/10 dark:bg-white/10 text-gray-100 data-[selected=true]:bg-black/10 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-gray-100",
        outline:
          "border-2 border-gray-500 text-gray-500 dark:text-gray-900 data-[selected=true]:border-2 data-[selected=true]:border-gray-500 data-[selected=true]:bg-gray-200 data-[selected=true]:text-gray-500 dark:data-[selected=true]:text-gray-900",
        ghost:
          "border-transparent text-gray-500 dark:text-gray-900 data-[selected=true]:border-transparent data-[selected=true]:bg-transparent data-[selected=true]:text-gray-500 dark:data-[selected=true]:text-gray-900",
        sky: "border-sky-800 dark:border-sky-600 text-sky-500 dark:text-sky-800 data-[selected=true]:border-sky-800 dark:data-[selected=true]:border-sky-600 data-[selected=true]:bg-sky-200 data-[selected=true]:text-sky-500 dark:data-[selected=true]:text-sky-800",
        rose: "border-rose-800 dark:border-rose-600 text-rose-500 dark:text-rose-800 data-[selected=true]:border-rose-800 dark:data-[selected=true]:border-rose-600 data-[selected=true]:bg-rose-200 data-[selected=true]:text-rose-500 dark:data-[selected=true]:text-rose-800",
        purple:
          "border-purple-800 dark:border-purple-600 text-purple-500 dark:text-purple-800 data-[selected=true]:border-purple-800 dark:data-[selected=true]:border-purple-600 data-[selected=true]:bg-purple-200 data-[selected=true]:text-purple-500 dark:data-[selected=true]:text-purple-800",
        pink: "border-pink-800 dark:border-pink-600 text-pink-500 dark:text-pink-800 data-[selected=true]:border-pink-800 dark:data-[selected=true]:border-pink-600 data-[selected=true]:bg-pink-200 data-[selected=true]:text-pink-500 dark:data-[selected=true]:text-pink-800",
        orange:
          "border-orange-800 dark:border-orange-600 text-orange-500 dark:text-orange-800 data-[selected=true]:border-orange-800 dark:data-[selected=true]:border-orange-600 data-[selected=true]:bg-orange-200 data-[selected=true]:text-orange-500 dark:data-[selected=true]:text-orange-800",
        yellow:
          "border-yellow-800 dark:border-yellow-600 text-yellow-500 dark:text-yellow-800 data-[selected=true]:border-yellow-800 dark:data-[selected=true]:border-yellow-600 data-[selected=true]:bg-yellow-200 data-[selected=true]:text-yellow-500 dark:data-[selected=true]:text-yellow-800",
        teal: "border-teal-800 dark:border-teal-600 text-teal-500 dark:text-teal-800 data-[selected=true]:border-teal-800 dark:data-[selected=true]:border-teal-600 data-[selected=true]:bg-teal-200 data-[selected=true]:text-teal-500 dark:data-[selected=true]:text-teal-800",
        indigo:
          "border-indigo-800 dark:border-indigo-600 text-indigo-500 dark:text-indigo-800 data-[selected=true]:border-indigo-800 dark:data-[selected=true]:border-indigo-600 data-[selected=true]:bg-indigo-200 data-[selected=true]:text-indigo-500 dark:data-[selected=true]:text-indigo-800",
        emerald:
          "border-emerald-800 dark:border-emerald-600 text-emerald-500 dark:text-emerald-800 data-[selected=true]:border-emerald-800 dark:data-[selected=true]:border-emerald-600 data-[selected=true]:bg-emerald-200 data-[selected=true]:text-emerald-500 dark:data-[selected=true]:text-emerald-800",
        "gradient-blue":
          "bg-linear-to-r from-blue-50 dark:from-blue-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl text-blue-950 dark:text-blue-50 data-[selected=true]:bg-linear-to-r data-[selected=true]:from-blue-800 dark:data-[selected=true]:from-blue-600 data-[selected=true]:to-purple-800 dark:data-[selected=true]:to-purple-600 data-[selected=true]:text-blue-100",
        "gradient-green":
          "bg-linear-to-r from-green-50 dark:from-green-950/70 to-lime-50 dark:to-lime-950/70 backdrop-blur-xl text-green-950 dark:text-green-50 data-[selected=true]:bg-linear-to-r data-[selected=true]:from-green-800 dark:data-[selected=true]:from-green-600 data-[selected=true]:to-lime-800 dark:data-[selected=true]:to-lime-600 data-[selected=true]:text-green-100",
        "gradient-red":
          "bg-linear-to-r from-red-50 dark:from-red-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl text-red-950 dark:text-red-50 data-[selected=true]:bg-linear-to-r data-[selected=true]:from-red-800 dark:data-[selected=true]:from-red-600 data-[selected=true]:to-pink-800 dark:data-[selected=true]:to-pink-600 data-[selected=true]:text-red-100",
        "gradient-yellow":
          "bg-linear-to-r from-yellow-50 dark:from-yellow-950/70 to-orange-50 dark:to-orange-950/70 backdrop-blur-xl text-yellow-950 dark:text-yellow-50 data-[selected=true]:bg-linear-to-r data-[selected=true]:from-yellow-800 dark:data-[selected=true]:from-yellow-600 data-[selected=true]:to-orange-800 dark:data-[selected=true]:to-orange-600 data-[selected=true]:text-yellow-100",
        "gradient-purple":
          "bg-linear-to-r from-purple-50 dark:from-purple-950/70 to-pink-50 dark:to-pink-950/70 backdrop-blur-xl text-purple-950 dark:text-purple-50 data-[selected=true]:bg-linear-to-r data-[selected=true]:from-purple-800 dark:data-[selected=true]:from-purple-600 data-[selected=true]:to-pink-800 dark:data-[selected=true]:to-pink-600 data-[selected=true]:text-purple-100",
        "gradient-teal":
          "bg-linear-to-r from-teal-50 dark:from-teal-950/70 to-cyan-50 dark:to-cyan-950/70 backdrop-blur-xl text-teal-950 dark:text-teal-50 data-[selected=true]:bg-linear-to-r data-[selected=true]:from-teal-800 dark:data-[selected=true]:from-teal-600 data-[selected=true]:to-cyan-800 dark:data-[selected=true]:to-cyan-600 data-[selected=true]:text-teal-100",
        "gradient-indigo":
          "bg-linear-to-r from-indigo-50 dark:from-indigo-950/70 to-purple-50 dark:to-purple-950/70 backdrop-blur-xl text-indigo-950 dark:text-indigo-50 data-[selected=true]:bg-linear-to-r data-[selected=true]:from-indigo-800 dark:data-[selected=true]:from-indigo-600 data-[selected=true]:to-purple-800 dark:data-[selected=true]:to-purple-600 data-[selected=true]:text-indigo-100",
        "gradient-pink":
          "bg-linear-to-r from-pink-50 dark:from-pink-950/70 to-rose-50 dark:to-rose-950/70 backdrop-blur-xl text-pink-950 dark:text-pink-50 data-[selected=true]:bg-linear-to-r data-[selected=true]:from-pink-800 dark:data-[selected=true]:from-pink-600 data-[selected=true]:to-rose-800 dark:data-[selected=true]:to-rose-600 data-[selected=true]:text-pink-100",
        "gradient-orange":
          "bg-linear-to-r from-orange-50 dark:from-orange-950/70 to-red-50 dark:to-red-950/70 backdrop-blur-xl text-orange-950 dark:text-orange-50 data-[selected=true]:bg-linear-to-r data-[selected=true]:from-orange-800 dark:data-[selected=true]:from-orange-600 data-[selected=true]:to-red-800 dark:data-[selected=true]:to-red-600 data-[selected=true]:text-orange-100",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      appearance: "default",
    },
  },
);

export const selectContentVariants = cva(
  "absolute z-10 mt-2 w-full rounded-md border bg-black dark:bg-white shadow-md",
  {
    variants: {
      appearance: {
        default: "bg-black dark:bg-white shadow-md",
        glass: "bg-black/10 dark:bg-white/10 backdrop-blur-md",
        outline: "border-2 border-gray-500",
        ghost: "border-transparent",
        sky: "border-sky-800 dark:border-sky-600",
        rose: "border-rose-800 dark:border-rose-600",
        purple: "border-purple-800 dark:border-purple-600",
        pink: "border-pink-800 dark:border-pink-600",
        orange: "border-orange-800 dark:border-orange-600",
        yellow: "border-yellow-800 dark:border-yellow-600",
        teal: "border-teal-800 dark:border-teal-600",
        indigo: "border-indigo-800 dark:border-indigo-600",
        emerald: "border-emerald-800 dark:border-emerald-600",
        "gradient-blue":
          "bg-linear-to-r from-blue-800 dark:from-blue-600 to-purple-800 dark:to-purple-600 backdrop-blur-xl",
        "gradient-green":
          "bg-linear-to-r from-green-800 dark:from-green-600 to-lime-800 dark:to-lime-600 backdrop-blur-xl",
        "gradient-red":
          "bg-linear-to-r from-red-800 dark:from-red-600 to-pink-800 dark:to-pink-600 backdrop-blur-xl",
        "gradient-yellow":
          "bg-linear-to-r from-yellow-800 dark:from-yellow-600 to-orange-800 dark:to-orange-600 backdrop-blur-xl",
        "gradient-purple":
          "bg-linear-to-r from-purple-800 dark:from-purple-600 to-pink-800 dark:to-pink-600 backdrop-blur-xl",
        "gradient-teal":
          "bg-linear-to-r from-teal-800 dark:from-teal-600 to-cyan-800 dark:to-cyan-600 backdrop-blur-xl",
        "gradient-indigo":
          "bg-linear-to-r from-indigo-800 dark:from-indigo-600 to-purple-800 dark:to-purple-600 backdrop-blur-xl",
        "gradient-pink":
          "bg-linear-to-r from-pink-800 dark:from-pink-600 to-rose-800 dark:to-rose-600 backdrop-blur-xl",
        "gradient-orange":
          "bg-linear-to-r from-orange-800 dark:from-orange-600 to-red-800 dark:to-red-600 backdrop-blur-xl",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2",
        lg: "px-4 py-3 text-lg",
      },
      spacing: {
        none: "space-y-0",
        default: "space-y-1",
        sm: "space-y-2",
        md: "space-y-3",
        lg: "space-y-4",
        xl: "space-y-5",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
      spacing: "default",
    },
  },
);
