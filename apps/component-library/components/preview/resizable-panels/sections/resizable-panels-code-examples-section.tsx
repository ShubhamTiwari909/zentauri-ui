import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  PanelsBasicDemo,
  PanelsNestedDemo,
} from "../components/resizable-panels-code-examples-demo";
import {
  panelsBasicSnippet,
  panelsNestedSnippet,
} from "../components/resizable-panels-code-examples.snippets";
export function ResizablePanelsCodeExamplesSection() {
  return (
    <Section className="space-y-6 text-slate-900 dark:text-slate-50">
      <h2 className="text-2xl font-semibold">Panel recipes</h2>
      <p role="heading" aria-level={3}>
        Uncontrolled split with collapse and restore
      </p>
      <PreviewCodeShowcase code={panelsBasicSnippet}>
        <PanelsBasicDemo />
      </PreviewCodeShowcase>
      <p role="heading" aria-level={3}>
        Nested horizontal and vertical layouts
      </p>
      <PreviewCodeShowcase code={panelsNestedSnippet}>
        <PanelsNestedDemo />
      </PreviewCodeShowcase>
    </Section>
  );
}
