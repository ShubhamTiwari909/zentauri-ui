"use client";

import { MotionReveal } from "./motion-reveal";
import { SectionShell } from "./section-shell";

const ROWS = [
  {
    aspect: "Distribution",
    zentauri: "npm package + optional CLI to vendor/copy sources",
    shadcn: "Copy-paste / CLI into your repo",
    chakra: "npm package, runtime theming",
    radix: "Unstyled primitives (compose yourself)",
  },
  {
    aspect: "Styling",
    zentauri: "Tailwind v4-first, CVA variants",
    shadcn: "Tailwind + CSS variables",
    chakra: "Emotion / styled-system",
    radix: "Bring your own styles",
  },
  {
    aspect: "Motion",
    zentauri: "First-class animated entry points (e.g. modals, tabs)",
    shadcn: "Typically add your own motion",
    chakra: "Built-in transition props",
    radix: "Unstyled; add Framer or CSS",
  },
  {
    aspect: "Hooks catalog",
    zentauri: "Shipped alongside UI in one package",
    shadcn: "Focused on components; hooks vary by recipe",
    chakra: "Some logic hooks",
    radix: "Primitive-focused",
  },
] as const;

export function HomeComparisonTable() {
  return (
    <MotionReveal>
      <SectionShell
        eyebrow="Landscape"
        title="How Zentauri fits in"
        lead="Every stack makes tradeoffs—here is a compact, honest snapshot. Try the previews and judge for your team."
      >
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-3 font-semibold text-slate-300">Aspect</th>
                <th className="p-3 font-semibold text-cyan-100">Zentauri UI</th>
                <th className="p-3 font-semibold text-slate-300">ShadCN</th>
                <th className="p-3 font-semibold text-slate-300">Chakra UI</th>
                <th className="p-3 font-semibold text-slate-300">Radix</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.aspect}
                  className="border-b border-white/5 last:border-0 hover:bg-white/2"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap p-3 font-medium text-white"
                  >
                    {row.aspect}
                  </th>
                  <td className="p-3 text-slate-300">{row.zentauri}</td>
                  <td className="p-3 text-slate-400">{row.shadcn}</td>
                  <td className="p-3 text-slate-400">{row.chakra}</td>
                  <td className="p-3 text-slate-400">{row.radix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionShell>
    </MotionReveal>
  );
}
