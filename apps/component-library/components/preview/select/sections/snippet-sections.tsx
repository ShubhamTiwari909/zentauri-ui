import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { SelectMultiDemo } from "./components/demos";
import { selectMultiSnippet } from "./components/snippets";
import { SelectPlayground } from "./components/playground";

export function SelectCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Select variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a trigger variant and size, plus the content appearance, size, and
        spacing to preview the select live. Toggle Show output / Show code and
        the snippet updates to match the selected variant.
      </p>
      <SelectPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Multi-select (controlled value + onChange)
        </p>
        <PreviewCodeShowcase code={selectMultiSnippet()}>
          <SelectMultiDemo />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
