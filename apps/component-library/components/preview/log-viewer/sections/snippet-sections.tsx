import { Section } from "@/components/common/Section";
import { LogViewerPlayground } from "./components/playground";

export function LogViewerCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Log viewer playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a dataset, chrome appearance, and size to preview the log viewer
        live. Toggle the header bar with level filters, search, and the copy
        button, switch on a motion preset, and use Show output / Show code to
        copy the matching snippet.
      </p>
      <LogViewerPlayground />
    </Section>
  );
}
