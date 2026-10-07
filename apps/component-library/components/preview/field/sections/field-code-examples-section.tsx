import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  FieldBasicDemo,
  FieldFormDemo,
  FieldGridDemo,
  FieldChoicesDemo,
  FieldSelectDemo,
} from "../components/field-code-examples-demo";
import {
  fieldBasicDemoSnippet,
  fieldFormDemoSnippet,
  fieldGridDemoSnippet,
  fieldChoicesDemoSnippet,
  fieldSelectDemoSnippet,
} from "../components/field-code-examples.snippets";
export function FieldCodeExamplesSection() {
  return (
    <Section className="space-y-6 text-slate-900 dark:text-slate-50">
      <h2 className="text-2xl font-semibold">Form and field recipes</h2>
      <p role="heading" aria-level={3}>
        A connected label and description
      </p>
      <PreviewCodeShowcase code={fieldBasicDemoSnippet}>
        <FieldBasicDemo />
      </PreviewCodeShowcase>
      <p role="heading" aria-level={3}>
        Validation with focus and a submission result
      </p>
      <PreviewCodeShowcase code={fieldFormDemoSnippet}>
        <FieldFormDemo />
      </PreviewCodeShowcase>
      <p role="heading" aria-level={3}>
        Responsive fields with Grid
      </p>
      <PreviewCodeShowcase code={fieldGridDemoSnippet}>
        <FieldGridDemo />
      </PreviewCodeShowcase>
      <p role="heading" aria-level={3}>
        Grouped checkbox choices
      </p>
      <PreviewCodeShowcase code={fieldChoicesDemoSnippet}>
        <FieldChoicesDemo />
      </PreviewCodeShowcase>
      <p role="heading" aria-level={3}>
        A custom Select with a shared trigger ID
      </p>
      <PreviewCodeShowcase code={fieldSelectDemoSnippet}>
        <FieldSelectDemo />
      </PreviewCodeShowcase>
    </Section>
  );
}
