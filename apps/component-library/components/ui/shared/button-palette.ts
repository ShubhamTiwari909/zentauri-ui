/**
 * Tailwind class maps mirroring `buttons/variants.ts` appearance tokens.
 * Reused by primitives that should stay visually aligned with Button.
 */
export const buttonLikeSolidAppearances = {
  default:
    "bg-slate-50 text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
  secondary: "bg-slate-800 text-slate-50",
  destructive: "bg-rose-600 text-white",
  outline: "border border-white/10 bg-white/5 text-slate-50",
  ghost: "bg-transparent text-slate-200",
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
  "gradient-blue":
    "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
  "gradient-green":
    "bg-gradient-to-r from-green-600 to-lime-600 text-white",
  "gradient-red":
    "bg-gradient-to-r from-red-600 to-pink-600 text-white",
  "gradient-yellow":
    "bg-gradient-to-r from-yellow-600 to-orange-600 text-white",
  "gradient-purple":
    "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
  "gradient-teal":
    "bg-gradient-to-r from-teal-600 to-cyan-600 text-white",
  "gradient-indigo":
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
  "gradient-pink":
    "bg-gradient-to-r from-pink-600 to-rose-600 text-white",
} as const;

export type ButtonLikeSolidAppearance = keyof typeof buttonLikeSolidAppearances;
