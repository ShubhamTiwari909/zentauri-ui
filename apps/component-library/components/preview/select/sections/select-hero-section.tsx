"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Form
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Select controls with listbox semantics.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Single or multi-value modes, width matched to the trigger, and motion
            presets for the floating list surface.
          </p>
        </div>
      </div>

      <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Select defaultValue="next">
          <SelectTrigger appearance="default" size="md">
            <SelectValue placeholder="Pick a framework" />
          </SelectTrigger>
          <SelectContent animation="scale" appearance="glass">
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="vite">Vite</SelectItem>
            <SelectItem value="remix">Remix</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
