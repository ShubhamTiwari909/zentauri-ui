import { cva } from "class-variance-authority";

/** Semantic text colors aligned with slate/cyan/violet accents used across the kit (dark-first). */
export const typographyToneVariants = cva("", {
  variants: {
    tone: {
      default: "text-slate-50 border-white/15",
      muted: "text-slate-400 border-white/15",
      primary: "text-cyan-300 border-cyan-300/40",
      secondary: "text-slate-300 border-white/15",
      accent: "text-violet-300 border-violet-300/40",
      destructive: "text-rose-400 border-rose-300/40",
      info: "text-sky-300 border-sky-300/40",
      success: "text-emerald-300 border-emerald-300/40",
      warning: "text-amber-300 border-amber-300/40",
      error: "text-red-300 border-red-300/40",
      "gradient-pink-violet": "bg-linear-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent w-fit",
      "gradient-cyan-violet": "bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent w-fit",
      "gradient-cyan-blue": "bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent w-fit",
      "gradient-cyan-green": "bg-linear-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent w-fit",
      "gradient-cyan-orange": "bg-linear-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent w-fit",
      "gradient-cyan-red": "bg-linear-to-r from-cyan-400 to-red-400 bg-clip-text text-transparent w-fit",
      "gradient-cyan-purple": "bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent w-fit",
      "gradient-cyan-pink": "bg-linear-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent w-fit",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

export const headingLevelVariants = cva("scroll-m-20", {
  variants: {
    level: {
      1: "text-4xl font-bold tracking-tight md:text-5xl",
      2: "text-3xl font-semibold tracking-tight",
      3: "text-2xl font-semibold tracking-tight",
      4: "text-xl font-semibold tracking-tight",
      5: "text-lg font-medium",
      6: "text-base font-medium",
    },
  },
});

export const textSizeVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm leading-relaxed",
      base: "text-base leading-relaxed",
      lg: "text-lg leading-relaxed",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

/** Marker style for unordered lists; ignored when `ordered` is true (decimal numbering). */
export const unorderedListMarkerVariants = cva("space-y-2 pl-5", {
  variants: {
    marker: {
      disc: "list-disc",
      circle: "[list-style-type:circle]",
      none: "list-none pl-0",
    },
  },
  defaultVariants: {
    marker: "disc",
  },
});

export const orderedListVariants = cva("list-decimal space-y-2 pl-5");
