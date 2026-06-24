import { Section } from "@/components/common/Section";

import { CodeDiffPlayground } from "./components/playground";

export function CodeDiffCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Code Diff playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Toggle between unified and split views, enable or disable line numbers
        and gutter markers, and pick a size to preview the diff live.
      </p>
      <CodeDiffPlayground />
    </Section>
  );
}
