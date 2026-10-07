import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  GridAutoDemo,
  GridAreasDemo,
  GridDashboardDemo,
  GridNestedDemo,
} from "../components/grid-code-examples-demo";
import {
  gridAutoSnippet,
  gridAreasSnippet,
  gridDashboardSnippet,
  gridNestedSnippet,
} from "../components/grid-code-examples.snippets";

export function GridCodeExamplesSection() {
  return (
    <Section className="space-y-6 text-slate-900 dark:text-slate-50">
      <h2 className="text-2xl font-semibold">Grid recipes</h2>
      <h3>Auto-fitting semantic collection</h3>
      <PreviewCodeShowcase code={gridAutoSnippet}>
        <GridAutoDemo />
      </PreviewCodeShowcase>
      <h3>Responsive dashboard spans</h3>
      <PreviewCodeShowcase code={gridDashboardSnippet}>
        <GridDashboardDemo />
      </PreviewCodeShowcase>
      <h3>Named-area section</h3>
      <PreviewCodeShowcase code={gridAreasSnippet}>
        <GridAreasDemo />
      </PreviewCodeShowcase>
      <h3>Nested layouts, axis gaps, and native controls</h3>
      <PreviewCodeShowcase code={gridNestedSnippet}>
        <GridNestedDemo />
      </PreviewCodeShowcase>
    </Section>
  );
}
