"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui";

export function SelectHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Form
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Select with compound parts and variants.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Multi-select by default, optional single mode, CVA-driven trigger styles, and list surface
            tokens on <span className="text-slate-200">SelectContent</span>. Values are always string
            arrays for a consistent controlled API.
          </p>
        </div>
      </div>

      <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Select defaultValue={["next"]} multiple={false}>
          <SelectTrigger variant="emerald" size="md">
            <SelectValue placeholder="Pick a framework" />
          </SelectTrigger>
          <SelectContent appearance="emerald" size="md" spacing="sm">
            <SelectItem value="next" appearance="emerald">Next.js</SelectItem>
            <SelectItem value="vite" appearance="emerald">Vite</SelectItem>
            <SelectItem value="remix" appearance="emerald">Remix</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
