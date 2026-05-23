import { cva } from "class-variance-authority";

export const tabsListVariants = cva("flex flex-wrap items-center gap-1", {
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
    variant: "pills",
  },
});

export const tabsTriggerVariants = cva(
  "px-3 py-1.5 rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      appearance: {
        default: "bg-transparent text-slate-900 dark:text-slate-50",
        sky: "bg-sky-300 text-sky-900 dark:bg-sky-900 dark:text-sky-200 data-[state=active]:bg-sky-900 dark:data-[state=active]:bg-sky-700 data-[state=active]:text-sky-50 dark:data-[state=active]:text-sky-100",
        rose: "bg-rose-300 text-rose-900 dark:bg-rose-900 dark:text-rose-200 data-[state=active]:bg-rose-900 dark:data-[state=active]:bg-rose-700 data-[state=active]:text-rose-50 dark:data-[state=active]:text-rose-100",
        purple:
          "bg-purple-300 text-purple-900 dark:bg-purple-900 dark:text-purple-200 data-[state=active]:bg-purple-900 dark:data-[state=active]:bg-purple-700 data-[state=active]:text-purple-50 dark:data-[state=active]:text-purple-100",
        pink: "bg-pink-300 text-pink-900 dark:bg-pink-900 dark:text-pink-200 data-[state=active]:bg-pink-900 dark:data-[state=active]:bg-pink-700 data-[state=active]:text-pink-50 dark:data-[state=active]:text-pink-100",
        orange:
          "bg-orange-300 text-orange-900 dark:bg-orange-900 dark:text-orange-200 data-[state=active]:bg-orange-900 dark:data-[state=active]:bg-orange-700 data-[state=active]:text-orange-50 dark:data-[state=active]:text-orange-100",
        yellow:
          "bg-yellow-300 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-200 data-[state=active]:bg-yellow-900 dark:data-[state=active]:bg-yellow-700 data-[state=active]:text-yellow-50 dark:data-[state=active]:text-yellow-100",
        teal: "bg-teal-300 text-teal-900 dark:bg-teal-900 dark:text-teal-200 data-[state=active]:bg-teal-900 dark:data-[state=active]:bg-teal-700 data-[state=active]:text-teal-50 dark:data-[state=active]:text-teal-100",
        indigo:
          "bg-indigo-300 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-200 data-[state=active]:bg-indigo-900 dark:data-[state=active]:bg-indigo-700 data-[state=active]:text-indigo-50 dark:data-[state=active]:text-indigo-100",
        emerald:
          "bg-emerald-300 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200 data-[state=active]:bg-emerald-900 dark:data-[state=active]:bg-emerald-700 data-[state=active]:text-emerald-50 dark:data-[state=active]:text-emerald-100",
        gray: "bg-gray-300 text-gray-900 dark:bg-gray-900 dark:text-gray-200 data-[state=active]:bg-gray-900 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-50 dark:data-[state=active]:text-gray-100",
        "gradient-blue":
          "bg-linear-to-r from-blue-800 dark:from-blue-800 to-purple-800 dark:to-purple-800 text-blue-100 dark:text-blue-50 data-[state=active]:from-blue-600 dark:data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 dark:data-[state=active]:to-purple-600 data-[state=active]:text-blue-100 dark:data-[state=active]:text-blue-100",
        "gradient-green":
          "bg-linear-to-r from-green-800 dark:from-green-800 to-lime-800 dark:to-lime-800 text-green-100 dark:text-green-50 data-[state=active]:from-green-600 dark:data-[state=active]:from-green-600 data-[state=active]:to-lime-600 dark:data-[state=active]:to-lime-600 data-[state=active]:text-green-100 dark:data-[state=active]:text-green-100",
        "gradient-red":
          "bg-linear-to-r from-red-800 dark:from-red-800 to-pink-800 dark:to-pink-800 text-red-100 dark:text-red-50 data-[state=active]:from-red-600 dark:data-[state=active]:from-red-600 data-[state=active]:to-pink-600 dark:data-[state=active]:to-pink-600 data-[state=active]:text-red-100 dark:data-[state=active]:text-red-100",
        "gradient-yellow":
          "bg-linear-to-r from-yellow-800 dark:from-yellow-800 to-orange-800 dark:to-orange-800 text-yellow-100 dark:text-yellow-50 data-[state=active]:from-yellow-600 dark:data-[state=active]:from-yellow-600 data-[state=active]:to-orange-600 dark:data-[state=active]:to-orange-600 data-[state=active]:text-yellow-100 dark:data-[state=active]:text-yellow-100",
        "gradient-purple":
          "bg-linear-to-r from-purple-800 dark:from-purple-800 to-pink-800 dark:to-pink-800 text-purple-100 dark:text-purple-50 data-[state=active]:from-purple-600 dark:data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 dark:data-[state=active]:to-pink-600 data-[state=active]:text-purple-100 dark:data-[state=active]:text-purple-100",
        "gradient-teal":
          "bg-linear-to-r from-teal-800 dark:from-teal-800 to-cyan-800 dark:to-cyan-800 text-teal-100 dark:text-teal-50 data-[state=active]:from-teal-600 dark:data-[state=active]:from-teal-600 data-[state=active]:to-cyan-600 dark:data-[state=active]:to-cyan-600 data-[state=active]:text-teal-100 dark:data-[state=active]:text-teal-100",
        "gradient-indigo":
          "bg-linear-to-r from-indigo-800 dark:from-indigo-800 to-purple-800 dark:to-purple-800 text-indigo-100 dark:text-indigo-50 data-[state=active]:from-indigo-600 dark:data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 dark:data-[state=active]:to-purple-600 data-[state=active]:text-indigo-100 dark:data-[state=active]:text-indigo-100",
        "gradient-pink":
          "bg-linear-to-r from-pink-800 dark:from-pink-800 to-rose-800 dark:to-rose-800 text-pink-100 dark:text-pink-50 data-[state=active]:from-pink-600 dark:data-[state=active]:from-pink-600 data-[state=active]:to-rose-600 dark:data-[state=active]:to-rose-600 data-[state=active]:text-pink-100 dark:data-[state=active]:text-pink-100",
        "gradient-orange":
          "bg-linear-to-r from-orange-800 dark:from-orange-800 to-red-800 dark:to-red-800 text-orange-100 dark:text-orange-50 data-[state=active]:from-orange-600 dark:data-[state=active]:from-orange-600 data-[state=active]:to-red-600 dark:data-[state=active]:to-red-600 data-[state=active]:text-orange-100 dark:data-[state=active]:text-orange-100",
      },
      variant: {
        default: "data-[state=active]:bg-background",
        underline:
          "border-b-2 border-transparent data-[state=active]:border-current rounded-none",
        pills: "",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-1.5",
        lg: "px-4 py-2",
      },
    },
    defaultVariants: {
      appearance: "default",
      variant: "pills",
      size: "md",
    },
  },
);
