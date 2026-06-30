import { Section } from "@/components/common/Section";
import { JsonViewerPlayground } from "./components/playground";

export function JsonViewerCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        JSON viewer playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a payload, chrome appearance, and size to preview the JSON viewer
        live. Toggle the toolbar to expose expand-all / collapse-all / copy
        controls, switch on a motion preset, and use Show output / Show code to
        copy the matching snippet.
      </p>
      <JsonViewerPlayground />
    </Section>
  );
}
