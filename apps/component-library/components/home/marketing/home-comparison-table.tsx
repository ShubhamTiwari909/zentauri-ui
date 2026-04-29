"use client";

import { Table, TableBody, TableHead, TableRow, TableHeader, TableCell } from "@zentauri-ui/zentauri-components/ui/table";
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
          <Table appearance="emerald" className="min-w-3xl">
            <TableHeader>
              <TableRow>
                <TableHead className="p-5">Aspect</TableHead>
                <TableHead className="p-5">Zentauri UI</TableHead>
                <TableHead className="p-5">ShadCN</TableHead>
                <TableHead className="p-5">Chakra UI</TableHead>
                <TableHead className="p-5">Radix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow
                  key={row.aspect}
                  className="border-b border-white/5 last:border-0 hover:bg-white/2"
                >
                  <TableCell
                    scope="row"
                    className="whitespace-nowrap p-5 font-medium text-white"
                  >
                    {row.aspect}
                  </TableCell>
                  <TableCell className="p-3 text-slate-200">{row.zentauri}</TableCell>
                  <TableCell className="p-3 text-slate-200">{row.shadcn}</TableCell>
                  <TableCell className="p-3 text-slate-200">{row.chakra}</TableCell>
                  <TableCell className="p-3 text-slate-200">{row.radix}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </SectionShell>
    </MotionReveal>
  );
}
