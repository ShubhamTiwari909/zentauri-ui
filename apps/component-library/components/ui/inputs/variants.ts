import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "w-full min-w-0 rounded-xl border bg-white/5 text-slate-50 shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
    "ring-offset-slate-950 transition-colors",
    "placeholder:text-slate-500",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default read-only:bg-white/[0.03]",
    "file:h-8"
  ],
  {
    variants: {
      as: {
        input: "",
        textarea: "h-auto! resize-y py-2 align-top",
        file: [
          // Reset native padding so we control it fully
          "p-0! cursor-pointer",
          // File-selector button base styles
          "file:cursor-pointer file:border-0 file:border-r file:border-white/10",
          "file:bg-white/10 file:text-slate-200 file:font-medium",
          "file:transition-colors file:duration-200",
          "hover:file:bg-white/15",
          // Content area padding
          "[&:not(:disabled)]:file:hover:text-white",
          "disabled:file:cursor-not-allowed",
        ],
        checkbox: [
          "shrink-0 cursor-pointer appearance-none relative",
          "min-h-0! shadow-none outline-none",
          "border-2 border-white/30 [&:not(:checked)]:bg-transparent",
          "transition-[color,box-shadow,border-color,background-color]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "read-only:cursor-default",
          "checked:after:absolute checked:after:content-[''] checked:after:size-3 checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rounded-full checked:after:bg-current"
        ],
        radio: [
          "shrink-0 cursor-pointer appearance-none rounded-full",
          "min-h-0! shadow-none outline-none",
          "border-2 border-white/30 bg-transparent! read-only:bg-transparent!",
          "ring-2 ring-white/20 ring-offset-2 ring-offset-slate-950",
          "transition-[color,box-shadow,background-color,border-color,box-shadow]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "read-only:cursor-default",
        ],
      },
      appearance: {
        default: "border-white/10 focus-visible:border-white/20",
        warning: "border-yellow-500/80 text-yellow-50 placeholder:text-yellow-300/70 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/80",
        error:
          "border-rose-500/80 text-rose-50 placeholder:text-rose-300/70 focus-visible:border-rose-400 focus-visible:ring-rose-400/80",
        success:
          "border-emerald-500/70 text-emerald-50 placeholder:text-emerald-300/70 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/80",
        info: "border-blue-500/80 text-blue-50 placeholder:text-blue-300/70 focus-visible:border-blue-400 focus-visible:ring-blue-400/80",
        violet: "border-violet-500/80 text-violet-50 placeholder:text-violet-300/70 focus-visible:border-violet-400 focus-visible:ring-violet-400/80",
        amber: "border-amber-500/80 text-amber-50 placeholder:text-amber-300/70 focus-visible:border-amber-400 focus-visible:ring-amber-400/80",
        pink: "border-pink-500/80 text-pink-50 placeholder:text-pink-300/70 focus-visible:border-pink-400 focus-visible:ring-pink-400/80",
        indigo: "border-indigo-500/80 text-indigo-50 placeholder:text-indigo-300/70 focus-visible:border-indigo-400 focus-visible:ring-indigo-400/80",

      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 md:h-11 px-4 text-sm",
        lg: "h-10 md:h-12 px-5 text-base",
      },
      ring: {
        true: "focus-visible:ring-2 focus-visible:ring-offset-2",
        false: "",
      },
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
        class: "h-9 md:h-11 text-sm pl-1 file:h-9 md:file:h-11 file:px-4 file:text-sm",
      },
      {
        as: "file",
        size: "lg",
        class: "h-10 md:h-12 text-base pl-1 file:h-10 md:file:h-12 file:px-5 file:text-base",
      },
      // ── file input: appearance – file-button accent colour ───────────────
      {
        as: "file",
        appearance: "default",
        class: "file:text-slate-200",
      },
      {
        as: "file",
        appearance: "warning",
        class: "file:bg-yellow-500/20 file:text-yellow-200 file:border-yellow-500/40 hover:file:bg-yellow-500/30",
      },
      {
        as: "file",
        appearance: "error",
        class: "file:bg-rose-500/20 file:text-rose-200 file:border-rose-500/40 hover:file:bg-rose-500/30",
      },
      {
        as: "file",
        appearance: "success",
        class: "file:bg-emerald-500/20 file:text-emerald-200 file:border-emerald-500/40 hover:file:bg-emerald-500/30",
      },
      {
        as: "file",
        appearance: "info",
        class: "file:bg-blue-500/20 file:text-blue-200 file:border-blue-500/40 hover:file:bg-blue-500/30",
      },
      {
        as: "file",
        appearance: "violet",
        class: "file:bg-violet-500/20 file:text-violet-200 file:border-violet-500/40 hover:file:bg-violet-500/30",
      },
      {
        as: "file",
        appearance: "amber",
        class: "file:bg-amber-500/20 file:text-amber-200 file:border-amber-500/40 hover:file:bg-amber-500/30",
      },
      {
        as: "file",
        appearance: "pink",
        class: "file:bg-pink-500/20 file:text-pink-200 file:border-pink-500/40 hover:file:bg-pink-500/30",
      },
      {
        as: "file",
        appearance: "indigo",
        class: "file:bg-indigo-500/20 file:text-indigo-200 file:border-indigo-500/40 hover:file:bg-indigo-500/30",
      },
      // ── checkbox / radio: size (overrides text-field height & padding) ───
      {
        as: "checkbox",
        size: "sm",
        class:
          "h-4! w-4! min-h-0! rounded-[0.35rem]! px-0! py-0!",
      },
      {
        as: "checkbox",
        size: "md",
        class:
          "h-5! w-5! min-h-0! rounded-md! px-0! py-0!",
      },
      {
        as: "checkbox",
        size: "lg",
        class:
          "h-6! w-6! min-h-0! rounded-md! px-0! py-0!",
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
          "border-slate-400/70! checked:border-slate-200 checked:text-slate-200 hover:border-slate-300 focus-visible:border-slate-300 focus-visible:ring-slate-400/70",
      },
      {
        as: "checkbox",
        appearance: "warning",
        class:
          "border-yellow-500/70! checked:border-yellow-400 checked:text-yellow-300 hover:border-yellow-400 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/80",
      },
      {
        as: "checkbox",
        appearance: "error",
        class:
          "border-rose-500/70! checked:border-rose-400 checked:text-rose-300 hover:border-rose-400 focus-visible:border-rose-400 focus-visible:ring-rose-400/80",
      },
      {
        as: "checkbox",
        appearance: "success",
        class:
          "border-emerald-500/70! checked:border-emerald-400 checked:text-emerald-300 hover:border-emerald-400 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/80",
      },
      {
        as: "checkbox",
        appearance: "info",
        class:
          "border-blue-500/70! checked:border-blue-400 checked:text-blue-300 hover:border-blue-400 focus-visible:border-blue-400 focus-visible:ring-blue-400/80",
      },
      {
        as: "checkbox",
        appearance: "violet",
        class:
          "border-violet-500/70! checked:after:bg-violet-400 checked:border-violet-400 checked:text-violet-300 hover:border-violet-400 focus-visible:border-violet-400 focus-visible:ring-violet-400/80",
      },
      {
        as: "checkbox",
        appearance: "amber",
        class:
          "border-amber-500/70! checked:border-amber-400! checked:text-amber-300 hover:border-amber-400! focus-visible:border-amber-400! focus-visible:ring-amber-400/80!",
      },
      {
        as: "checkbox",
        appearance: "pink",
        class:
          "border-pink-500/70! checked:border-pink-400 checked:text-pink-300 hover:border-pink-400 focus-visible:border-pink-400 focus-visible:ring-pink-400/80",
      },
      {
        as: "checkbox",
        appearance: "indigo",
        class:
          "border-indigo-500/70! checked:border-indigo-400! checked:text-indigo-300 hover:border-indigo-400! focus-visible:border-indigo-400! focus-visible:ring-indigo-400/80!",
      },
      // ── radio: appearance (transparent fill, inner dot, coloured offset ring) ─
      {
        as: "radio",
        appearance: "default",
        class:
          "border-slate-400/70! checked:border-slate-200 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(226,232,240)]! hover:border-slate-300 focus-visible:border-slate-300 focus-visible:ring-slate-400/70 checked:ring-2! checked:ring-offset-2! checked:ring-offset-slate-950! checked:ring-slate-300/90!",
      },
      {
        as: "radio",
        appearance: "warning",
        class:
          "border-yellow-500/70! checked:border-yellow-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(250,204,21)]! hover:border-yellow-400 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-slate-950! checked:ring-yellow-400/90!",
      },
      {
        as: "radio",
        appearance: "error",
        class:
          "border-rose-500/70! checked:border-rose-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(251,113,133)]! hover:border-rose-400 focus-visible:border-rose-400 focus-visible:ring-rose-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-slate-950! checked:ring-rose-400/90!",
      },
      {
        as: "radio",
        appearance: "success",
        class:
          "border-emerald-500/70! checked:border-emerald-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(52,211,153)]! hover:border-emerald-400 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-slate-950! checked:ring-emerald-400/90!",
      },
      {
        as: "radio",
        appearance: "info",
        class:
          "border-blue-500/70! checked:border-blue-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(96,165,250)]! hover:border-blue-400 focus-visible:border-blue-400 focus-visible:ring-blue-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-slate-950! checked:ring-blue-400/90!",
      },
      {
        as: "radio",
        appearance: "violet",
        class:
          "border-violet-500/70! checked:border-violet-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(167,139,250)]! hover:border-violet-400 focus-visible:border-violet-400 focus-visible:ring-violet-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-slate-950! checked:ring-violet-400/90!",
      },
      {
        as: "radio",
        appearance: "amber",
        class:
          "border-amber-500/70! checked:border-amber-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(251,191,36)]! hover:border-amber-400 focus-visible:border-amber-400 focus-visible:ring-amber-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-slate-950! checked:ring-amber-400/90!",
      },
      {
        as: "radio",
        appearance: "pink",
        class:
          "border-pink-500/70! checked:border-pink-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(244,114,182)]! hover:border-pink-400 focus-visible:border-pink-400 focus-visible:ring-pink-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-slate-950! checked:ring-pink-400/90!",
      },
      {
        as: "radio",
        appearance: "indigo",
        class:
          "border-indigo-500/70! checked:border-indigo-400 checked:bg-transparent! checked:shadow-[inset_0_0_0_0.28rem_rgb(129,140,248)]! hover:border-indigo-400 focus-visible:border-indigo-400 focus-visible:ring-indigo-400/80 checked:ring-2! checked:ring-offset-2! checked:ring-offset-slate-950! checked:ring-indigo-400/90!",
      },
    ],
  },
);
