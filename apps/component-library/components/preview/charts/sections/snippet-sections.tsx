import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";

import { ChartBySlug } from "../by-slug";
import { chartAppearanceSnippet } from "../snippets";
import { CHART_APPEARANCES } from "./components/data";

export function ChartCodeExamplesSection({ slug }: { slug: ChartPreviewSlug }) {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Chart frame variants
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Each row pairs live output with JSX; the Variant line states the
        appearance token on the frame.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CHART_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={appearance}
            code={chartAppearanceSnippet({ slug, appearance, showGrid: true })}
          >
            <ChartBySlug slug={slug} appearance={appearance} height={280} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key={"no-grid-lines"}
          code={chartAppearanceSnippet({
            slug,
            appearance: "default",
            showGrid: false,
          })}
        >
          <ChartBySlug
            slug={slug}
            appearance={"default"}
            height={280}
            showGrid={false}
          />
        </PreviewCodeShowcase>
        {slug === "pie" && (
          <>
            <PreviewCodeShowcase
              key={"pie-with-custom-inner-radius"}
              code={chartAppearanceSnippet({
                slug,
                appearance: "default",
                showGrid: false,
                innerRadius: "40%",
                center: true,
              })}
            >
              <ChartBySlug
                slug={slug}
                appearance={"default"}
                height={280}
                showGrid={false}
                innerRadius="40%"
                center
              />
            </PreviewCodeShowcase>
            <PreviewCodeShowcase
              key={"pie-with-custom-stroke-fill"}
              code={chartAppearanceSnippet({
                slug,
                appearance: "default",
                showGrid: false,
                stroke: "#974970",
                fill: "#631831",
                labelColor: "#ffffff",
                customShape: true,
              })}
            >
              <ChartBySlug
                slug={slug}
                appearance={"default"}
                height={280}
                showGrid={false}
                stroke="#974970"
                fill="#631831"
                labelColor="#ffffff"
                customShape={true}
              />
            </PreviewCodeShowcase>
          </>
        )}
      </div>
    </Section>
  );
}
