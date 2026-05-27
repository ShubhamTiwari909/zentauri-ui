import { cva } from "class-variance-authority";

import {
  zuiInputAppearances,
  zuiInputAs,
  zuiInputBase,
  zuiInputRing,
  zuiInputSizes,
} from "../../design-system/inputs";

export const inputVariants = cva(zuiInputBase, {
  variants: {
    as: zuiInputAs,
    appearance: zuiInputAppearances,
    size: zuiInputSizes,
    ring: zuiInputRing,
  },
  defaultVariants: {
    as: "input",
    appearance: "default",
    size: "md",
    ring: true,
  },
  compoundVariants: [
    // ── textarea size overrides ──────────────────────────────────────────
    {
      as: "textarea",
      size: "sm",
      class: "min-h-[5rem]",
    },
    {
      as: "textarea",
      size: "md",
      class: "min-h-[6rem]",
    },
    {
      as: "textarea",
      size: "lg",
      class: "min-h-[7.5rem]",
    },
    // ── file input: size – height & file-button padding ──────────────────
    {
      as: "file",
      size: "sm",
      class: "h-8 text-xs pl-1 file:h-8 file:px-3 file:text-xs",
    },
    {
      as: "file",
      size: "md",
      class:
        "h-9 md:h-11 text-sm pl-1 file:h-9 md:file:h-11 file:px-4 file:text-sm",
    },
    {
      as: "file",
      size: "lg",
      class:
        "h-10 md:h-12 text-base pl-1 file:h-10 md:file:h-12 file:px-5 file:text-base",
    },
    // ── file input: appearance – file-button accent colour ───────────────
    {
      as: "file",
      appearance: "default",
      class: "file:text-slate-700 dark:file:text-slate-200",
    },
    {
      as: "file",
      appearance: "warning",
      class:
        "file:bg-yellow-500/20 file:text-yellow-800 dark:file:text-yellow-200 file:border-yellow-500/40 hover:file:bg-yellow-500/30",
    },
    {
      as: "file",
      appearance: "error",
      class:
        "file:bg-rose-500/20 file:text-rose-800 dark:file:text-rose-200 file:border-rose-500/40 hover:file:bg-rose-500/30",
    },
    {
      as: "file",
      appearance: "success",
      class:
        "file:bg-emerald-500/20 file:text-emerald-800 dark:file:text-emerald-200 file:border-emerald-500/40 hover:file:bg-emerald-500/30",
    },
    {
      as: "file",
      appearance: "info",
      class:
        "file:bg-blue-500/20 file:text-blue-800 dark:file:text-blue-200 file:border-blue-500/40 hover:file:bg-blue-500/30",
    },
    {
      as: "file",
      appearance: "violet",
      class:
        "file:bg-violet-500/20 file:text-violet-800 dark:file:text-violet-200 file:border-violet-500/40 hover:file:bg-violet-500/30",
    },
    {
      as: "file",
      appearance: "amber",
      class:
        "file:bg-amber-500/20 file:text-amber-800 dark:file:text-amber-200 file:border-amber-500/40 hover:file:bg-amber-500/30",
    },
    {
      as: "file",
      appearance: "pink",
      class:
        "file:bg-pink-500/20 file:text-pink-800 dark:file:text-pink-200 file:border-pink-500/40 hover:file:bg-pink-500/30",
    },
    {
      as: "file",
      appearance: "indigo",
      class:
        "file:bg-indigo-500/20 file:text-indigo-800 dark:file:text-indigo-200 file:border-indigo-500/40 hover:file:bg-indigo-500/30",
    },
    // ── checkbox / radio: size (overrides text-field height & padding) ───
    {
      as: "checkbox",
      size: "sm",
      class: "h-4! w-4! min-h-0! rounded-[0.35rem]! px-0! py-0!",
    },
    {
      as: "checkbox",
      size: "md",
      class: "h-5! w-5! min-h-0! rounded-md! px-0! py-0!",
    },
    {
      as: "checkbox",
      size: "lg",
      class: "h-6! w-6! min-h-0! rounded-md! px-0! py-0!",
    },
    {
      as: "radio",
      size: "sm",
      class: "h-4! w-4! min-h-0! px-0! py-0!",
    },
    {
      as: "radio",
      size: "md",
      class: "h-5! w-5! min-h-0! px-0! py-0!",
    },
    {
      as: "radio",
      size: "lg",
      class: "h-6! w-6! min-h-0! px-0! py-0!",
    },
    // ── checkbox: appearance (border + tick color; fill stays transparent) ─
    {
      as: "checkbox",
      appearance: "default",
      class:
        "border-slate-400/70! checked:border-slate-700 dark:checked:border-slate-200 checked:text-slate-700 dark:checked:text-slate-200 hover:border-slate-600 dark:hover:border-slate-300 focus-visible:border-slate-600 dark:focus-visible:border-slate-300 focus-visible:ring-slate-500/70 dark:focus-visible:ring-slate-400/70",
    },
    {
      as: "checkbox",
      appearance: "warning",
      class:
        "border-yellow-500/70! checked:border-yellow-600 dark:checked:border-yellow-400 checked:text-yellow-700 dark:checked:text-yellow-300 hover:border-yellow-600 dark:hover:border-yellow-400 focus-visible:border-yellow-600 dark:focus-visible:border-yellow-400 focus-visible:ring-yellow-400/80",
    },
    {
      as: "checkbox",
      appearance: "error",
      class:
        "border-rose-500/70! checked:border-rose-600 dark:checked:border-rose-400 checked:text-rose-700 dark:checked:text-rose-300 hover:border-rose-600 dark:hover:border-rose-400 focus-visible:border-rose-600 dark:focus-visible:border-rose-400 focus-visible:ring-rose-400/80",
    },
    {
      as: "checkbox",
      appearance: "success",
      class:
        "border-emerald-500/70! checked:border-emerald-600 dark:checked:border-emerald-400 checked:text-emerald-700 dark:checked:text-emerald-300 hover:border-emerald-600 dark:hover:border-emerald-400 focus-visible:border-emerald-600 dark:focus-visible:border-emerald-400 focus-visible:ring-emerald-400/80",
    },
    {
      as: "checkbox",
      appearance: "info",
      class:
        "border-blue-500/70! checked:border-blue-600 dark:checked:border-blue-400 checked:text-blue-700 dark:checked:text-blue-300 hover:border-blue-600 dark:hover:border-blue-400 focus-visible:border-blue-600 dark:focus-visible:border-blue-400 focus-visible:ring-blue-400/80",
    },
    {
      as: "checkbox",
      appearance: "violet",
      class:
        "border-violet-500/70! checked:after:bg-violet-600 dark:checked:after:bg-violet-400 checked:border-violet-600 dark:checked:border-violet-400 checked:text-violet-700 dark:checked:text-violet-300 hover:border-violet-600 dark:hover:border-violet-400 focus-visible:border-violet-600 dark:focus-visible:border-violet-400 focus-visible:ring-violet-400/80",
    },
    {
      as: "checkbox",
      appearance: "amber",
      class:
        "border-amber-500/70! checked:border-amber-400! checked:text-amber-700 dark:checked:text-amber-300 hover:border-amber-400! focus-visible:border-amber-400! focus-visible:ring-amber-400/80!",
    },
    {
      as: "checkbox",
      appearance: "pink",
      class:
        "border-pink-500/70! checked:border-pink-600 dark:checked:border-pink-400 checked:text-pink-700 dark:checked:text-pink-300 hover:border-pink-600 dark:hover:border-pink-400 focus-visible:border-pink-600 dark:focus-visible:border-pink-400 focus-visible:ring-pink-400/80",
    },
    {
      as: "checkbox",
      appearance: "indigo",
      class:
        "border-indigo-500/70! checked:border-indigo-400! checked:text-indigo-700 dark:checked:text-indigo-300 hover:border-indigo-400! focus-visible:border-indigo-400! focus-visible:ring-indigo-400/80!",
    },
    // ── radio: appearance (transparent fill, inner dot, coloured offset ring) ─
    {
      as: "radio",
      appearance: "default",
      class:
        "border-slate-400/70! checked:border-slate-700 dark:checked:border-slate-200 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(226,232,240)]! hover:border-slate-600 dark:hover:border-slate-300 focus-visible:border-slate-600 dark:focus-visible:border-slate-300 focus-visible:ring-slate-500/70 dark:focus-visible:ring-slate-400/70 checked:ring-2! checked:ring-offset-2! checked:ring-offset-white! dark:checked:ring-offset-slate-950! checked:ring-slate-300/90!",
    },
    {
      as: "radio",
      appearance: "warning",
      class:
        "border-yellow-500/70! checked:border-yellow-600 dark:checked:border-yellow-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(250,204,21)]! hover:border-yellow-600 dark:hover:border-yellow-400 focus-visible:border-yellow-600 dark:focus-visible:border-yellow-400 focus-visible:ring-yellow-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-white! dark:checked:ring-offset-slate-950! checked:ring-yellow-400/90!",
    },
    {
      as: "radio",
      appearance: "error",
      class:
        "border-rose-500/70! checked:border-rose-600 dark:checked:border-rose-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(251,113,133)]! hover:border-rose-600 dark:hover:border-rose-400 focus-visible:border-rose-600 dark:focus-visible:border-rose-400 focus-visible:ring-rose-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-white! dark:checked:ring-offset-slate-950! checked:ring-rose-400/90!",
    },
    {
      as: "radio",
      appearance: "success",
      class:
        "border-emerald-500/70! checked:border-emerald-600 dark:checked:border-emerald-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(52,211,153)]! hover:border-emerald-600 dark:hover:border-emerald-400 focus-visible:border-emerald-600 dark:focus-visible:border-emerald-400 focus-visible:ring-emerald-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-white! dark:checked:ring-offset-slate-950! checked:ring-emerald-400/90!",
    },
    {
      as: "radio",
      appearance: "info",
      class:
        "border-blue-500/70! checked:border-blue-600 dark:checked:border-blue-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(96,165,250)]! hover:border-blue-600 dark:hover:border-blue-400 focus-visible:border-blue-600 dark:focus-visible:border-blue-400 focus-visible:ring-blue-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-white! dark:checked:ring-offset-slate-950! checked:ring-blue-400/90!",
    },
    {
      as: "radio",
      appearance: "violet",
      class:
        "border-violet-500/70! checked:border-violet-600 dark:checked:border-violet-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(167,139,250)]! hover:border-violet-600 dark:hover:border-violet-400 focus-visible:border-violet-600 dark:focus-visible:border-violet-400 focus-visible:ring-violet-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-white! dark:checked:ring-offset-slate-950! checked:ring-violet-400/90!",
    },
    {
      as: "radio",
      appearance: "amber",
      class:
        "border-amber-500/70! checked:border-amber-600 dark:checked:border-amber-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(251,191,36)]! hover:border-amber-600 dark:hover:border-amber-400 focus-visible:border-amber-600 dark:focus-visible:border-amber-400 focus-visible:ring-amber-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-white! dark:checked:ring-offset-slate-950! checked:ring-amber-400/90!",
    },
    {
      as: "radio",
      appearance: "pink",
      class:
        "border-pink-500/70! checked:border-pink-600 dark:checked:border-pink-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(244,114,182)]! hover:border-pink-600 dark:hover:border-pink-400 focus-visible:border-pink-600 dark:focus-visible:border-pink-400 focus-visible:ring-pink-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-white! dark:checked:ring-offset-slate-950! checked:ring-pink-400/90!",
    },
    {
      as: "radio",
      appearance: "indigo",
      class:
        "border-indigo-500/70! checked:border-indigo-600 dark:checked:border-indigo-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(129,140,248)]! hover:border-indigo-600 dark:hover:border-indigo-400 focus-visible:border-indigo-600 dark:focus-visible:border-indigo-400 focus-visible:ring-indigo-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-white! dark:checked:ring-offset-slate-950! checked:ring-indigo-400/90!",
    },
    {
      as: "date",
      appearance: "default",
      class:
        "bg-white dark:bg-black border border-black/10 dark:border-white/80 text-black dark:text-white",
    },
    {
      as: "date",
      appearance: "warning",
      class:
        "bg-yellow-900 dark:bg-transparent text-yellow-50 dark:text-yellow-50",
    },
    {
      as: "date",
      appearance: "error",
      class: "bg-rose-900 dark:bg-transparent text-rose-50 dark:text-rose-50",
    },
    {
      as: "date",
      appearance: "success",
      class:
        "bg-emerald-900 dark:bg-transparent text-emerald-50 dark:text-emerald-50",
    },
    {
      as: "date",
      appearance: "info",
      class: "bg-blue-900 dark:bg-transparent text-blue-50 dark:text-blue-50",
    },
    {
      as: "date",
      appearance: "violet",
      class:
        "bg-violet-900 dark:bg-transparent text-violet-50 dark:text-violet-50",
    },
    {
      as: "date",
      appearance: "amber",
      class:
        "bg-amber-900 dark:bg-transparent text-amber-50 dark:text-amber-50",
    },
    {
      as: "date",
      appearance: "pink",
      class: "bg-pink-900 dark:bg-transparent text-pink-50 dark:text-pink-50",
    },
    {
      as: "date",
      appearance: "indigo",
      class:
        "bg-indigo-900 dark:bg-transparent text-indigo-50 dark:text-indigo-50",
    },
    {
      as: "date",
      appearance: "orange",
      class:
        "bg-orange-900 dark:bg-transparent text-orange-50 dark:text-orange-50",
    },
  ],
});
