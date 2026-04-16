import { cva } from "class-variance-authority"

export const tooltipVariants = cva(
  "absolute z-50 rounded-md shadow-md transition-all duration-200 pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        outline: "border bg-white text-black",
        ghost: "bg-gray-800 text-white/90",
        glass: "border border-white/15 bg-white/10 text-white backdrop-blur-md",
        emerald: "bg-emerald-600 text-white",
        indigo: "bg-indigo-600 text-white",
        purple: "bg-purple-600 text-white",
        pink: "bg-pink-600 text-white",
        rose: "bg-rose-600 text-white",
        sky: "bg-sky-600 text-white",
        teal: "bg-teal-600 text-white",
        yellow: "bg-yellow-600 text-white",
        orange: "bg-orange-600 text-white",
        green: "bg-green-600 text-white",
        "gradient-blue": "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
        "gradient-green": "bg-gradient-to-r from-green-600 to-lime-600 text-white",
        "gradient-red": "bg-gradient-to-r from-red-600 to-pink-600 text-white",
        "gradient-yellow": "bg-gradient-to-r from-yellow-600 to-orange-600 text-white",
        "gradient-purple": "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
        "gradient-teal": "bg-gradient-to-r from-teal-600 to-cyan-600 text-white",
        "gradient-indigo": "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
        "gradient-pink": "bg-gradient-to-r from-pink-600 to-rose-600 text-white",
        "gradient-orange": "bg-gradient-to-r from-orange-600 to-red-600 text-white",
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
      width:{
        fit: "w-full md:min-w-fit",
        xs: "w-full md:min-w-xs",
        sm: "w-full md:min-w-sm",
        md: "w-full md:min-w-md",
        lg: "w-full md:min-w-lg",
        xl: "w-full md:min-w-xl",
        "2xl": "w-full md:min-w-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      width: "xs",
    },
  }
)