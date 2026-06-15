import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { CheckboxDemo } from "./components/demo";
import { CheckboxPlayground } from "./components/playground";
import { checkboxControlledSnippet } from "./components/snippets";

export function CheckboxCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Checkbox variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, and indeterminate state to preview the
        checkbox live. Toggle Show output / Show code and the snippet updates to
        match the selected variant.
      </p>
      <CheckboxPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Controlled state
          </p>
          <PreviewCodeShowcase code={checkboxControlledSnippet()}>
            <CheckboxDemo appearance="success" size="md" controlled />
          </PreviewCodeShowcase>
        </div>
      </div>
    </Section>
  );
}
