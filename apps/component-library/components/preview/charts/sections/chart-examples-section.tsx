import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";

import { ChartBySlug } from "../chart-by-slug";
import {
  chartAppearanceSnippet,
  chartMutedSpaciousSnippet,
  chartOutlineCompactLegendSnippet,
} from "../chart-snippets";

export function ChartExamplesSection({ slug }: { slug: ChartPreviewSlug }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Compare framing, density, legend, and stacking with the code tab.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={chartOutlineCompactLegendSnippet(slug)}>
          <ChartBySlug
            slug={slug}
            appearance="outline"
            density="compact"
            height={300}
            showLegend
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase code={chartMutedSpaciousSnippet(slug)}>
          <ChartBySlug
            slug={slug}
            appearance="muted"
            density="spacious"
            height={300}
            showGrid={false}
            stacked={slug === "bar" || slug === "area"}
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase code={chartAppearanceSnippet(slug, "muted", "5,5", false)}>
          <ChartBySlug
            slug={slug}
            appearance="muted"
            density="spacious"
            height={300}
            showGrid={false}
            stacked={slug === "bar" || slug === "area"}
            strokeDasharray="5,5"
          />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
