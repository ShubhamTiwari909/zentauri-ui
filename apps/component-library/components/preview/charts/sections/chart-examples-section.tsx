import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";

import { ChartBySlug } from "../chart-by-slug";
import {
  chartMutedSpaciousDashedSnippet,
  chartMutedSpaciousSnippet,
  chartOutlineCompactLegendSnippet,
} from "../chart-snippets";

export function ChartExamplesSection({ slug }: { slug: ChartPreviewSlug }) {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
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
        <PreviewCodeShowcase code={chartMutedSpaciousDashedSnippet(slug)}>
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
    </Section>
  );
}
