import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  ToolbarActionsDemo,
  ToolbarFormattingDemo,
  ToolbarVerticalDemo,
  ToolbarCompositionDemo,
} from "../components/toolbar-code-examples-demo";
import {
  toolbarActionsDemoSnippet,
  toolbarFormattingDemoSnippet,
  toolbarVerticalDemoSnippet,
  toolbarCompositionDemoSnippet,
} from "../components/toolbar-code-examples.snippets";
export function ToolbarCodeExamplesSection() {
  return (
    <Section className="space-y-6 text-slate-900 dark:text-slate-50">
      <h2 className="text-2xl font-semibold">Toolbar recipes</h2>
      <p role="heading" aria-level={3}>
        Document actions and feedback
      </p>
      <PreviewCodeShowcase code={toolbarActionsDemoSnippet}>
        <ToolbarActionsDemo />
      </PreviewCodeShowcase>
      <p role="heading" aria-level={3}>
        Controlled formatting toggles
      </p>
      <PreviewCodeShowcase code={toolbarFormattingDemoSnippet}>
        <ToolbarFormattingDemo />
      </PreviewCodeShowcase>
      <p role="heading" aria-level={3}>
        Vertical canvas tools
      </p>
      <PreviewCodeShowcase code={toolbarVerticalDemoSnippet}>
        <ToolbarVerticalDemo />
      </PreviewCodeShowcase>
      <p role="heading" aria-level={3}>
        Existing buttons, links, and disabled actions
      </p>
      <PreviewCodeShowcase code={toolbarCompositionDemoSnippet}>
        <ToolbarCompositionDemo />
      </PreviewCodeShowcase>
    </Section>
  );
}
