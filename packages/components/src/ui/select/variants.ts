import { cva } from "class-variance-authority";

export const selectTriggerVariants = cva(
  "flex items-center justify-between rounded-md border transition-all focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-gray-300 bg-white text-gray-900",
        outline: "border-2 border-gray-500",
        ghost: "border-transparent",
        sky: "border-sky-600 text-sky-600",
        rose: "border-rose-600 text-rose-600",
        purple: "border-purple-600 text-purple-600",
        pink: "border-pink-600 text-pink-600",
        orange: "border-orange-600 text-orange-600",
        yellow: "border-yellow-600 text-yellow-600",
        teal: "border-teal-600 text-teal-600",
        indigo: "border-indigo-500 text-indigo-500",
        emerald: "border-emerald-600 text-emerald-600",
        glass: "border-white/15 bg-white/10 text-white backdrop-blur-md",
        "gradient-blue":
          "bg-linear-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl text-white",
        "gradient-green":
          "bg-linear-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl text-white",
        "gradient-red":
          "bg-linear-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl text-white",
        "gradient-yellow":
          "bg-linear-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl text-white",
        "gradient-purple":
          "bg-linear-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl text-white",
        "gradient-teal":
          "bg-linear-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl text-white",
        "gradient-indigo":
          "bg-linear-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl text-white",
        "gradient-pink":
          "bg-linear-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl text-white",
        "gradient-orange":
          "bg-linear-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl text-white",
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

export const selectItemVariants = cva("cursor-pointer px-3 py-2 rounded-md", {
  variants: {
    appearance: {
      default:
        "bg-white text-gray-900 data-[selected=true]:bg-gray-200 data-[selected=true]:text-gray-900",
      glass:
        "bg-white/10 text-gray-100 data-[selected=true]:bg-white/10 data-[selected=true]:text-gray-100",
      outline:
        "border-2 border-gray-500 text-gray-900 data-[selected=true]:border-2 data-[selected=true]:border-gray-500 data-[selected=true]:bg-gray-200 data-[selected=true]:text-gray-900",
      ghost:
        "border-transparent text-gray-900 data-[selected=true]:border-transparent data-[selected=true]:bg-transparent data-[selected=true]:text-gray-900",
      sky: "border-sky-600 text-sky-800 data-[selected=true]:border-sky-600 data-[selected=true]:bg-sky-200 data-[selected=true]:text-sky-800",
      rose: "border-rose-600 text-rose-800 data-[selected=true]:border-rose-600 data-[selected=true]:bg-rose-200 data-[selected=true]:text-rose-800",
      purple:
        "border-purple-600 text-purple-800 data-[selected=true]:border-purple-600 data-[selected=true]:bg-purple-200 data-[selected=true]:text-purple-800",
      pink: "border-pink-600 text-pink-800 data-[selected=true]:border-pink-600 data-[selected=true]:bg-pink-200 data-[selected=true]:text-pink-800",
      orange:
        "border-orange-600 text-orange-800 data-[selected=true]:border-orange-600 data-[selected=true]:bg-orange-200 data-[selected=true]:text-orange-800",
      yellow:
        "border-yellow-600 text-yellow-800 data-[selected=true]:border-yellow-600 data-[selected=true]:bg-yellow-200 data-[selected=true]:text-yellow-800",
      teal: "border-teal-600 text-teal-800 data-[selected=true]:border-teal-600 data-[selected=true]:bg-teal-200 data-[selected=true]:text-teal-800",
      indigo:
        "border-indigo-600 text-indigo-800 data-[selected=true]:border-indigo-600 data-[selected=true]:bg-indigo-200 data-[selected=true]:text-indigo-800",
      emerald:
        "border-emerald-600 text-emerald-800 data-[selected=true]:border-emerald-600 data-[selected=true]:bg-emerald-200 data-[selected=true]:text-emerald-800",
      "gradient-blue":
        "bg-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl text-blue-50 data-[selected=true]:bg-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl data-[selected=true]:text-blue-100",
      "gradient-green":
        "bg-gradient-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl text-green-50 data-[selected=true]:bg-gradient-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl data-[selected=true]:text-green-100",
      "gradient-red":
        "bg-gradient-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl text-red-50 data-[selected=true]:bg-gradient-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl data-[selected=true]:text-red-100",
      "gradient-yellow":
        "bg-gradient-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl text-yellow-50 data-[selected=true]:bg-gradient-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl data-[selected=true]:text-yellow-100",
      "gradient-purple":
        "bg-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl text-purple-50 data-[selected=true]:bg-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl data-[selected=true]:text-purple-100",
      "gradient-teal":
        "bg-gradient-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl text-teal-50 data-[selected=true]:bg-gradient-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl data-[selected=true]:text-teal-100",
      "gradient-indigo":
        "bg-gradient-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl text-indigo-50 data-[selected=true]:bg-gradient-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl data-[selected=true]:text-indigo-100",
      "gradient-pink":
        "bg-gradient-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl text-pink-50 data-[selected=true]:bg-gradient-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl data-[selected=true]:text-pink-100",
      "gradient-orange":
        "bg-gradient-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl text-orange-50 data-[selected=true]:bg-gradient-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl data-[selected=true]:text-orange-100",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const selectContentVariants = cva(
  "absolute z-10 mt-2 w-full rounded-md border bg-white shadow-md",
  {
    variants: {
      appearance: {
        default: "bg-white shadow-md",
        glass: "bg-white/10 backdrop-blur-md",
        outline: "border-2 border-gray-500",
        ghost: "border-transparent",
        sky: "border-sky-600",
        rose: "border-rose-600",
        purple: "border-purple-600",
        pink: "border-pink-600",
        orange: "border-orange-600",
        yellow: "border-yellow-600",
        teal: "border-teal-600",
        indigo: "border-indigo-600",
        emerald: "border-emerald-600",
        "gradient-blue":
          "bg-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-green":
          "bg-gradient-to-r from-green-600 to-lime-600 bg-gradient-to-r from-green-950/70 to-lime-950/70 backdrop-blur-xl",
        "gradient-red":
          "bg-gradient-to-r from-red-600 to-pink-600 bg-gradient-to-r from-red-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-yellow":
          "bg-gradient-to-r from-yellow-600 to-orange-600 bg-gradient-to-r from-yellow-950/70 to-orange-950/70 backdrop-blur-xl",
        "gradient-purple":
          "bg-gradient-to-r from-purple-600 to-pink-600 bg-gradient-to-r from-purple-950/70 to-pink-950/70 backdrop-blur-xl",
        "gradient-teal":
          "bg-gradient-to-r from-teal-600 to-cyan-600 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 backdrop-blur-xl",
        "gradient-indigo":
          "bg-gradient-to-r from-indigo-600 to-purple-600 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 backdrop-blur-xl",
        "gradient-pink":
          "bg-gradient-to-r from-pink-600 to-rose-600 bg-gradient-to-r from-pink-950/70 to-rose-950/70 backdrop-blur-xl",
        "gradient-orange":
          "bg-gradient-to-r from-orange-600 to-red-600 bg-gradient-to-r from-orange-950/70 to-red-950/70 backdrop-blur-xl",
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
