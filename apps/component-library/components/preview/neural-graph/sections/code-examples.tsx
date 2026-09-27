"use client";

import { useState } from "react";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { NeuralGraphProps } from "@zentauri-ui/zentauri-components/ui/neural-graph";
import { neuralGraphAppearances } from "../components/neural-graph-code-examples.data";
import { NeuralGraphDemo } from "../components/neural-graph-demo";
import { neuralGraphSnippet } from "../components/neural-graph-code-examples.snippets";

type Appearance = NonNullable<NeuralGraphProps["appearance"]>;

export function NeuralGraphCodeExamplesSection() {
  const [appearance, setAppearance] = useState<Appearance>("default");
  const [animate, setAnimate] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  return <Section>
    <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Interactive playground</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">Drag to orbit, Shift-drag to pan, scroll to zoom, and select a node to trace its connections.</p>
    <div className="my-5 flex flex-wrap gap-4 text-sm text-slate-700 dark:text-slate-200">
      <label className="flex items-center gap-2">Appearance
        <select aria-label="Graph appearance" value={appearance} onChange={(event) => setAppearance(event.target.value as Appearance)} className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
          {neuralGraphAppearances.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={animate} onChange={(event) => setAnimate(event.target.checked)} /> Data flow</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={showLabels} onChange={(event) => setShowLabels(event.target.checked)} /> Labels</label>
    </div>
    <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Compound component API</p>
    <PreviewCodeShowcase code={neuralGraphSnippet(appearance, animate, showLabels)}>
      <NeuralGraphDemo appearance={appearance} animate={animate} showLabels={showLabels} />
    </PreviewCodeShowcase>
    <h3 className="mt-12 text-lg font-semibold text-slate-900 dark:text-white">All appearances</h3>
    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Select a card to load that palette into the playground.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {neuralGraphAppearances.map((value) => <div key={value} role="button" tabIndex={0} aria-pressed={value === appearance}
        onClick={() => setAppearance(value)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setAppearance(value); } }}
        className={`cursor-pointer overflow-hidden rounded-xl border p-2 focus-visible:outline-2 focus-visible:outline-sky-500 ${value === appearance ? "border-sky-500 ring-2 ring-sky-500" : "border-slate-200 dark:border-slate-700"}`}>
        <NeuralGraphDemo appearance={value} size="sm" className="h-44" animate={false} interactive={false} showControls={false} showStatus={false} showLabels={false} />
        <span className="block p-2 text-xs font-medium text-slate-700 dark:text-slate-200">{value}</span>
      </div>)}
    </div>
  </Section>;
}
