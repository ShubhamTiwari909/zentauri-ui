import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import type { buttonVariants } from "../buttons/variants";

type GradientButtonAppearance =
  | "gradient-blue"
  | "gradient-green"
  | "gradient-red"
  | "gradient-yellow"
  | "gradient-purple"
  | "gradient-teal"
  | "gradient-indigo"
  | "gradient-pink"
  | "gradient-orange";

/** Button `appearance` keys usable for indicator tones (gradients excluded). */
export type DynamicStepperIndicatorToneAppearance = Exclude<
  NonNullable<VariantProps<typeof buttonVariants>["appearance"]>,
  GradientButtonAppearance
>;

export type DynamicStepperIndicatorSemanticState =
  | "complete"
  | "current"
  | "upcoming";

const INDICATOR_TONE_CLASSES: Record<
  DynamicStepperIndicatorToneAppearance,
  Record<DynamicStepperIndicatorSemanticState, string>
> = {
  default: {
    complete:
      "border-slate-500/55 dark:border-slate-400/55 bg-slate-500/25 dark:bg-slate-500/25 text-slate-900 dark:text-slate-50 ring-2 ring-slate-500/25 dark:ring-slate-400/25",
    current:
      "border-slate-600 dark:border-slate-300 bg-slate-500/35 dark:bg-slate-500/35 text-slate-900 dark:text-white ring-2 ring-slate-600/45 dark:ring-slate-300/45",
    upcoming: "border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400",
  },
  secondary: {
    complete:
      "border-slate-400 dark:border-slate-600 bg-slate-200/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 ring-2 ring-slate-400/35 dark:ring-slate-600/35",
    current:
      "border-slate-500 dark:border-slate-500 bg-slate-300/55 dark:bg-slate-700/55 text-slate-900 dark:text-white ring-2 ring-slate-500/45 dark:ring-slate-500/45",
    upcoming: "border-black/10 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-500",
  },
  destructive: {
    complete:
      "border-rose-500/60 bg-rose-500/20 text-rose-100 ring-2 ring-rose-400/30",
    current:
      "border-rose-600 dark:border-rose-400 bg-rose-100/50 dark:bg-rose-600/35 text-slate-900 dark:text-white ring-2 ring-rose-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-rose-50 dark:bg-rose-950/25 text-slate-500 dark:text-slate-400",
  },
  outline: {
    complete:
      "border-emerald-500/55 bg-transparent text-emerald-200 ring-2 ring-emerald-500/25",
    current: "border-black/30 dark:border-white/30 bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white ring-2 ring-black/25 dark:ring-white/25",
    upcoming: "border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400",
  },
  ghost: {
    complete:
      "border-transparent bg-emerald-500/15 text-emerald-200 ring-2 ring-emerald-400/20",
    current: "border-transparent bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white ring-2 ring-black/15 dark:ring-white/15",
    upcoming: "border-transparent bg-transparent text-slate-500 dark:text-slate-500",
  },
  link: {
    complete:
      "border-cyan-500/45 bg-cyan-50 dark:bg-cyan-950/35 text-cyan-200 ring-2 ring-cyan-400/25",
    current:
      "border-cyan-600 dark:border-cyan-400 bg-cyan-900/45 text-cyan-950 dark:text-cyan-50 ring-2 ring-cyan-400/45",
    upcoming: "border-black/10 dark:border-white/10 bg-transparent text-slate-500 dark:text-slate-500",
  },
  glass: {
    complete:
      "border-black/25 dark:border-white/25 bg-black/10 dark:bg-white/10 text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md ring-2 ring-emerald-400/25",
    current:
      "border-black/35 dark:border-white/35 bg-black/15 dark:bg-white/15 text-slate-900 dark:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md ring-2 ring-black/30 dark:ring-white/30",
    upcoming: "border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 backdrop-blur-sm",
  },
  emerald: {
    complete:
      "border-emerald-500/60 bg-emerald-500/20 text-emerald-100 ring-2 ring-emerald-400/30",
    current:
      "border-emerald-600 dark:border-emerald-400 bg-emerald-500/30 text-slate-900 dark:text-white ring-2 ring-emerald-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-200/55",
  },
  indigo: {
    complete:
      "border-indigo-500/60 bg-indigo-500/20 text-indigo-100 ring-2 ring-indigo-400/30",
    current:
      "border-indigo-600 dark:border-indigo-400 bg-indigo-500/30 text-slate-900 dark:text-white ring-2 ring-indigo-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-200/55",
  },
  purple: {
    complete:
      "border-purple-500/60 bg-purple-500/20 text-purple-100 ring-2 ring-purple-400/30",
    current:
      "border-purple-600 dark:border-purple-400 bg-purple-500/30 text-slate-900 dark:text-white ring-2 ring-purple-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-purple-50 dark:bg-purple-950/30 text-purple-200/55",
  },
  pink: {
    complete:
      "border-pink-500/60 bg-pink-500/20 text-pink-100 ring-2 ring-pink-400/30",
    current:
      "border-pink-600 dark:border-pink-400 bg-pink-500/30 text-slate-900 dark:text-white ring-2 ring-pink-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-pink-50 dark:bg-pink-950/30 text-pink-200/55",
  },
  rose: {
    complete:
      "border-rose-500/60 bg-rose-500/20 text-rose-100 ring-2 ring-rose-400/30",
    current:
      "border-rose-600 dark:border-rose-400 bg-rose-500/30 text-slate-900 dark:text-white ring-2 ring-rose-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-rose-50 dark:bg-rose-950/30 text-rose-200/55",
  },
  sky: {
    complete:
      "border-sky-500/60 bg-sky-500/20 text-sky-100 ring-2 ring-sky-400/30",
    current: "border-sky-600 dark:border-sky-400 bg-sky-500/30 text-slate-900 dark:text-white ring-2 ring-sky-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-sky-50 dark:bg-sky-950/30 text-sky-200/55",
  },
  teal: {
    complete:
      "border-teal-500/60 bg-teal-500/20 text-teal-100 ring-2 ring-teal-400/30",
    current:
      "border-teal-600 dark:border-teal-400 bg-teal-500/30 text-slate-900 dark:text-white ring-2 ring-teal-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-teal-50 dark:bg-teal-950/30 text-teal-200/55",
  },
  yellow: {
    complete:
      "border-yellow-500/60 bg-yellow-500/20 text-yellow-100 ring-2 ring-yellow-400/30",
    current:
      "border-yellow-600 dark:border-yellow-400 bg-yellow-100/50 dark:bg-yellow-600/35 text-slate-900 dark:text-white ring-2 ring-yellow-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-yellow-50 dark:bg-yellow-950/35 text-yellow-200/55",
  },
  orange: {
    complete:
      "border-orange-500/60 bg-orange-500/20 text-orange-100 ring-2 ring-orange-400/30",
    current:
      "border-orange-600 dark:border-orange-400 bg-orange-100/50 dark:bg-orange-600/35 text-slate-900 dark:text-white ring-2 ring-orange-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-orange-50 dark:bg-orange-950/30 text-orange-200/55",
  },
  gray: {
    complete:
      "border-gray-500/60 bg-gray-500/20 text-gray-100 ring-2 ring-gray-400/30",
    current:
      "border-gray-600 dark:border-gray-400 bg-gray-100/50 dark:bg-gray-600/35 text-slate-900 dark:text-white ring-2 ring-gray-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-gray-50 dark:bg-gray-950/30 text-gray-300/70",
  },
  amber: {
    complete:
      "border-amber-500/60 bg-amber-500/20 text-amber-100 ring-2 ring-amber-400/30",
    current:
      "border-amber-600 dark:border-amber-400 bg-amber-100/50 dark:bg-amber-600/35 text-slate-900 dark:text-white ring-2 ring-amber-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-amber-50 dark:bg-amber-950/35 text-amber-200/55",
  },
  violet: {
    complete:
      "border-violet-500/60 bg-violet-500/20 text-violet-100 ring-2 ring-violet-400/30",
    current:
      "border-violet-600 dark:border-violet-400 bg-violet-500/30 text-slate-900 dark:text-white ring-2 ring-violet-400/50",
    upcoming: "border-black/15 dark:border-white/15 bg-violet-50 dark:bg-violet-950/30 text-violet-200/55",
  },
};

export function dynamicStepperIndicatorToneClass(
  state: DynamicStepperIndicatorSemanticState,
  tone: DynamicStepperIndicatorToneAppearance,
): string {
  return INDICATOR_TONE_CLASSES[tone][state];
}

export const dynamicStepperRootVariants = cva("flex w-full", {
  variants: {
    orientation: {
      horizontal:
        "flex-row flex-wrap items-start justify-between gap-4 md:flex-nowrap md:items-center",
      vertical: "flex-col gap-6",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const dynamicStepperMapperVariants = cva(
  "m-0 min-w-0 flex-1 list-none p-0",
  {
    variants: {
      orientation: {
        horizontal: "flex flex-row flex-wrap items-start justify-center gap-4",
        vertical: "flex flex-col gap-6",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export const dynamicStepperItemVariants = cva("relative flex gap-3", {
  variants: {
    orientation: {
      horizontal: "min-w-0 flex-col items-center text-center",
      vertical: "flex-row items-start text-left",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const dynamicStepperIndicatorVariants = cva(
  "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-9 text-sm",
        lg: "size-10 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
