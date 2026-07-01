import { Section } from "@/components/common/Section";

import { CodeBlockPlayground } from "../components/playground";

export function CodeBlockCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Code Block variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, and toggle line numbers to preview the code
        block live. Toggle Show output / Show code and the snippet updates to
        match the selected variant.
      </p>
      <CodeBlockPlayground />
    </Section>
  );
}
