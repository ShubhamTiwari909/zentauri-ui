import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { ComboboxMultiDemo } from "./components/demos";
import { comboboxMultiSnippet } from "./components/snippets";
import { ComboboxPlayground } from "./components/playground";

export function ComboboxCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Combobox variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a trigger variant and size plus a content appearance and size to
        preview the combobox live. Toggle Show output / Show code and the
        snippet updates to match the selected variant.
      </p>
      <ComboboxPlayground />

      <div className="mt-12 space-y-10 rounded-xl">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Multi-select
        </p>
        <PreviewCodeShowcase code={comboboxMultiSnippet()}>
          <ComboboxMultiDemo />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
