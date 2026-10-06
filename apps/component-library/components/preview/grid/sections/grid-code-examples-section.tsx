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
    <Section className="space-y-6">
      <h2 className="text-2xl font-semibold">Grid recipes</h2>
      <p>Auto-fitting semantic collection</p>
      <PreviewCodeShowcase code={gridAutoSnippet}>
        <GridAutoDemo />
      </PreviewCodeShowcase>
      <p>Responsive dashboard spans</p>
      <PreviewCodeShowcase code={gridDashboardSnippet}>
        <GridDashboardDemo />
      </PreviewCodeShowcase>
      <p>Named-area section</p>
      <PreviewCodeShowcase code={gridAreasSnippet}>
        <GridAreasDemo />
      </PreviewCodeShowcase>
      <p>Nested layouts, axis gaps, and native controls</p>
      <PreviewCodeShowcase code={gridNestedSnippet}>
        <GridNestedDemo />
      </PreviewCodeShowcase>
    </Section>
  );
}
