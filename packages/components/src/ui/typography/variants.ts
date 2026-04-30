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
