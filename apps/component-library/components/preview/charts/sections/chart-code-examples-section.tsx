import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";

import { ChartBySlug } from "../chart-by-slug";
import { chartAppearanceSnippet } from "../chart-snippets";
import {
  CHART_APPEARANCES,
  CHART_CODE_EXAMPLES_SECTION_CLASS,
} from "./components/chart-code-examples.data";

export function ChartCodeExamplesSection({ slug }: { slug: ChartPreviewSlug }) {
  return (
    <section className={CHART_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Chart frame variants
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each row pairs live output with JSX; the Variant line states the
        appearance token on the frame.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CHART_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={appearance}
            code={chartAppearanceSnippet(slug, appearance)}
          >
            <ChartBySlug slug={slug} appearance={appearance} height={280} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
            key={"no-grid-lines"}
            code={chartAppearanceSnippet(slug, "default", undefined)}
          >
            <ChartBySlug slug={slug} appearance={"default"} height={280} showGrid={false} />
          </PreviewCodeShowcase>
      </div>
    </section>
  );
}
