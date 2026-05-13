import { cva } from "class-variance-authority";

export const chartVariants = cva(
  [
    "relative w-full min-w-0 overflow-hidden rounded-xl",
    "h-[var(--chart-height)] min-h-64 sm:min-h-72 md:min-h-80",
    "[&_.recharts-default-tooltip]:rounded-lg [&_.recharts-default-tooltip]:border [&_.recharts-default-tooltip]:border-slate-200",
    "[&_.recharts-default-tooltip]:bg-white/95 [&_.recharts-default-tooltip]:shadow-lg",
    "[&_.recharts-default-tooltip]:text-slate-900",
  ],
  {
    variants: {
      appearance: {
        default:
          "bg-white text-slate-600 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        muted:
          "bg-slate-50 text-slate-500 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        outline:
          "border border-slate-200 bg-white text-slate-600 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        glass:
          "border border-white/15 bg-white/10 text-slate-100 backdrop-blur-md [&_.recharts-cartesian-axis-tick-value]:fill-white",
        sky: "bg-sky-50 text-sky-500 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        emerald:
          "bg-emerald-50 text-emerald-500 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        violet:
          "bg-violet-50 text-violet-500 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        amber:
          "bg-amber-50 text-amber-500 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        rose: "bg-rose-50 text-rose-500 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        slate:
          "bg-slate-50 text-slate-500 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        gray: "bg-gray-50 text-gray-500 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        indigo:
          "bg-indigo-50 text-indigo-500 [&_.recharts-cartesian-axis-tick-value]:fill-slate-900",
        "gradient-cyan-violet":
          "bg-gradient-to-r from-cyan-500 to-violet-500 text-white [&_.recharts-cartesian-axis-tick-value]:fill-white",
        "gradient-emerald-violet":
          "bg-gradient-to-r from-emerald-500 to-violet-500 text-white [&_.recharts-cartesian-axis-tick-value]:fill-white",
        "gradient-amber-rose":
          "bg-gradient-to-r from-amber-500 to-rose-500 text-white [&_.recharts-cartesian-axis-tick-value]:fill-white",
        "gradient-slate-gray":
          "bg-gradient-to-r from-slate-500 to-gray-500 text-white [&_.recharts-cartesian-axis-tick-value]:fill-white",
        "gradient-indigo-purple":
          "bg-gradient-to-r from-indigo-500 to-purple-500 text-white [&_.recharts-cartesian-axis-tick-value]:fill-white",
        "gradient-cyan-blue":
          "bg-gradient-to-r from-cyan-500 to-blue-500 text-white [&_.recharts-cartesian-axis-tick-value]:fill-white",
        "gradient-emerald-blue":
          "bg-gradient-to-r from-emerald-500 to-blue-500 text-white [&_.recharts-cartesian-axis-tick-value]:fill-white",
        "gradient-amber-blue":
          "bg-gradient-to-r from-amber-500 to-blue-500 text-white [&_.recharts-cartesian-axis-tick-value]:fill-white",
      },
      density: {
        compact: "p-2 sm:p-3",
        comfortable: "p-3 sm:p-4",
        spacious: "p-4 sm:p-5 md:p-6",
      },
    },
    defaultVariants: {
      appearance: "default",
      density: "comfortable",
    },
  },
);

export const chartPalette = {
  cyan: { stroke: "#0891b2", fill: "#67e8f9", textColor: "#0891b2" },
  emerald: { stroke: "#059669", fill: "#6ee7b7", textColor: "#059669" },
  violet: { stroke: "#7c3aed", fill: "#c4b5fd", textColor: "#7c3aed" },
  amber: { stroke: "#d97706", fill: "#fcd34d", textColor: "#d97706" },
  rose: { stroke: "#e11d48", fill: "#fda4af", textColor: "#e11d48" },
  slate: { stroke: "#475569", fill: "#cbd5e1", textColor: "#475569" },
  gray: { stroke: "#6b7280", fill: "#d1d5db", textColor: "#6b7280" },
  white: { stroke: "#ffffff", fill: "#ffffff", textColor: "#ffffff" },
  indigo: { stroke: "#6366f1", fill: "#c7d2fe", textColor: "#6366f1" },
  "gradient-cyan-violet": { stroke: "#0891b2", fill: "#67e8f9", textColor: "#0891b2" },
  "gradient-emerald-violet": { stroke: "#059669", fill: "#6ee7b7", textColor: "#059669" },
  "gradient-amber-rose": { stroke: "#d97706", fill: "#fcd34d", textColor: "#d97706" },
  "gradient-slate-gray": { stroke: "#475569", fill: "#cbd5e1", textColor: "#475569" },
  "gradient-indigo-purple": { stroke: "#6366f1", fill: "#c7d2fe", textColor: "#6366f1" },
  "gradient-cyan-blue": { stroke: "#0891b2", fill: "#67e8f9", textColor: "#0891b2" },
  "gradient-emerald-blue": { stroke: "#059669", fill: "#6ee7b7", textColor: "#059669" },
  "gradient-amber-blue": { stroke: "#d97706", fill: "#fcd34d", textColor: "#d97706" },
} as const;

export const chartColorValues = Object.keys(chartPalette) as Array<
  keyof typeof chartPalette
>;
