import { cva } from "class-variance-authority"

export const tooltipVariants = cva(
  "absolute z-50 rounded-md shadow-md transition-all duration-200 pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        outline: "border bg-white text-black",
        ghost: "bg-gray-800 text-white/90",
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
      width:{
        fit: "w-full min-w-fit",
        xs: "w-full min-w-xs",
        sm: "w-full min-w-sm",
        md: "w-full min-w-md",
        lg: "w-full min-w-lg",
        xl: "w-full min-w-xl",
        "2xl": "w-full min-w-2xl",
      },
      intent: {
        default: "",
        success: "bg-green-600 text-white",
        warning: "bg-yellow-500 text-black",
        danger: "bg-red-600 text-white",
      },
      animation: {
        fade: "opacity-0 data-[open=true]:opacity-100",
        scale:
          "scale-95 opacity-0 data-[open=true]:scale-100 data-[open=true]:opacity-100",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      intent: "default",
      animation: "fade",
      width: "xs",
    },
  }
)