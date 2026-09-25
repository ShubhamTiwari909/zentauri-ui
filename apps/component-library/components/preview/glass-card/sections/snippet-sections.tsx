"use client";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  examples,
  materials,
} from "../components/glass-card-code-examples.data";
import { glassCardSnippet } from "../components/glass-card-code-examples.snippets";
import { GlassCardDemo } from "../components/glass-card-demo";

export function GlassCardExamples() {
  return (
    <Section variant="plain">
      <h2 className="text-3xl font-semibold text-white">
        One primitive. Three materials.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
        Glass is soft and translucent. Crystal has sharper reflections and
        stronger edges. Frosted diffuses the background with a quieter
        highlight.
      </p>
      <div className="mt-8 grid gap-6 rounded-3xl bg-slate-100 bg-[radial-gradient(ellipse_at_center,#22d3ee30,transparent)] p-6 dark:bg-slate-950 lg:grid-cols-3">
        {materials.map((variant) => (
          <div key={variant}>
            <p className="mb-4 text-sm capitalize text-slate-700 dark:text-slate-200">
              {variant}
            </p>
            <GlassCardDemo variant={variant} appearance="glass" />
          </div>
        ))}
      </div>
      <div className="mt-12 space-y-10">
        {examples.map(({ label, props }) => (
          <div key={label}>
            <p className="mb-4 text-lg font-semibold text-white">{label}</p>
            <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-950">
              <PreviewCodeShowcase code={glassCardSnippet(props)}>
                <div className="rounded-2xl bg-[radial-gradient(ellipse_at_top_left,#22d3ee30,transparent)] p-6 sm:p-10">
                  <GlassCardDemo {...props} />
                </div>
              </PreviewCodeShowcase>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
