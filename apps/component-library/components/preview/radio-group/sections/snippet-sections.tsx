import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { RadioGroupDemoControlled } from "./components/demo";
import { RadioGroupPlayground } from "./components/playground";
import { radioGroupControlledSnippet } from "./components/snippets";

export function RadioGroupCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        RadioGroup variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, and orientation to preview the radio group
        live. Toggle Show output / Show code and the snippet updates to match
        the selected variant.
      </p>
      <RadioGroupPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={radioGroupControlledSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Appearance: <span className="font-bold">SUCCESS</span> | Size:{" "}
            <span className="font-bold">MD</span> | Controlled:{" "}
            <span className="font-bold">TRUE</span> - The controlled state keeps
            the selected radio value in React state and updates it through
            onValueChange.
          </p>
          <RadioGroupDemoControlled appearance="success" size="md" controlled />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
